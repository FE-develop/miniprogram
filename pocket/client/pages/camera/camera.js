const app = getApp();

Page({
  data: {
    authStatus: false, // 授权状态
    mode: 'normal', //	有效值为 normal, scanCode
    devicePosition: 'back', //	前置或后置，值为front, back
    flash: 'auto', // 闪光灯，值为auto, on, off
  },
  onLoad(options) {},
  onShow() {

  },
  getAuthStatus() {
    wx.getSetting({
      success: (res) => {
        this.setData({
          authStatus: res.authSetting['scope.camera']
        })
      }
    })
  },
  // 摄像头在非正常终止时触发，如退出后台等情况
  stopHandle() {

  },
  // 用户不允许使用摄像头时触发
  errorHandle() {
    wx.showModal();
  },
  // 在成功识别到一维码时触发，仅在 mode="scanCode" 时生效
  scancodeHandle() {

  }
})