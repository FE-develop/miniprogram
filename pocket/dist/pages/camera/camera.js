'use strict';

var app = getApp();
Page({
  data: {
    authStatus: false, // 授权状态
    mode: 'normal', //	有效值为 normal, scanCode
    devicePosition: 'back', //	前置或后置，值为front, back
    flash: 'auto' // 闪光灯，值为auto, on, off
  },
  onLoad: function onLoad(options) {},
  onShow: function onShow() {},
  getAuthStatus: function getAuthStatus() {
    var _this = this;

    wx.getSetting({
      success: function success(res) {
        _this.setData({
          authStatus: res.authSetting['scope.camera']
        });
      }
    });
  },

  // 摄像头在非正常终止时触发，如退出后台等情况
  stopHandle: function stopHandle() {},

  // 用户不允许使用摄像头时触发
  errorHandle: function errorHandle() {},

  // 在成功识别到一维码时触发，仅在 mode="scanCode" 时生效
  scancodeHandle: function scancodeHandle() {}
});
//# sourceMappingURL=camera.js.map
