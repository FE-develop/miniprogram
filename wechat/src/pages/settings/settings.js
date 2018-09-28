const app = getApp();

Page({
  data: {
    authStatus: false,
    userInfo: null
  },
  onLoad(options) {
    console.log('settings onLoad');
  },
  onShow() {
    app.checkUserInfo().then(res => {
      // console.log(res);
			if (res) this.setData({ userInfo: res })
		}, (err) => {
      this.setData({ userInfo: null });
			console.log(err);
		})
  },
  onHide() {
    this.hideAuthLayer();
  },
  onUnload(){
    this.hideAuthLayer();
  },
  // 缓存清除
  clearStorage() {
    try {
      var res = wx.getStorageInfoSync()
      res.keys && res.keys.forEach(key => {
        if (key !== 'userInfo') {
          wx.removeStorageSync(key)
        }
      });
      wx.showToast({
        title: '缓存清除成功',
        icon: 'success'
      });
    } catch (e) {
      wx.showToast({
        title: '缓存清除异常',
        icon: 'none'
      });
    }
  },
  // 页面跳转
  toTest() {
    wx.navigateTo({
      url: '/pages/test/test'
    })
  },
  // 隐藏授权弹窗
  hideAuthLayer() {
    this.setData({
      authStatus: false
    })
  },
  // 触发授权
  toHandleAuth() {
    if (!this.data.userInfo) {
      this.setData({
        authStatus: true
      })
    }
  },
  // 获取微信地址
  toHandleGetAddress() {
    wx.chooseAddress({
      success: (data) => {

      },
      fail: () => {

      }
    })
  },
  // 授权成功回调
  onGotUserInfo(event) {
    const { detail } = event;
		if (detail && detail.userInfo) {
			wx.setStorage({
        key: 'userInfo',
        data: detail.userInfo
      })
      this.setData({
        authStatus: false,
        userInfo: detail.userInfo
      })
		} else {
			// 用户拒绝授权
		}
	}
})