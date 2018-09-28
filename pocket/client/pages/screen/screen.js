const app = getApp();

Page({
  data: {
    brightness: '',
    status: false,
  },
  onLoad(options) {
    this.setData({
      status: wx.getStorageSync('keepScreenOn')
    })
    wx.getScreenBrightness({
      success: (data) => {
        this.setData({
          brightness: Number(data.value).toFixed(2),
        })
      }
    })
  },
  // 是否保持常亮状态
  switch (e) {
    wx.setKeepScreenOn({
      keepScreenOn: e.detail.value,
      success: () => {
        wx.setStorage({
          key: 'keepScreenOn',
          data: e.detail.value
        })
        wx.showToast({
          title: '设置成功',
          icon: 'success'
        })
      }
    })
  },
  // 设置屏幕亮度
  setScreenBrightness(e) {
    const value = Number(e.detail.value).toFixed(2);
    this.setData({
      brightness: value,
    })
    wx.setScreenBrightness({
      value: value,
      success: () => {
        // wx.showToast({
        //   title: '设置成功',
        //   icon: 'success'
        // })
      }
    });
  }
})