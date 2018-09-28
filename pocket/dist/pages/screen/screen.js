'use strict';

var app = getApp();
Page({
  data: {
    brightness: '',
    status: false
  },
  onLoad: function onLoad(options) {
    var _this = this;

    this.setData({
      status: wx.getStorageSync('keepScreenOn')
    });
    wx.getScreenBrightness({
      success: function success(data) {
        _this.setData({
          brightness: Number(data.value).toFixed(2)
        });
      }
    });
  },

  // 是否保持常亮状态
  switch: function _switch(e) {
    wx.setKeepScreenOn({
      keepScreenOn: e.detail.value,
      success: function success() {
        wx.setStorage({
          key: 'keepScreenOn',
          data: e.detail.value
        });
        wx.showToast({
          title: '设置成功',
          icon: 'success'
        });
      }
    });
  },

  // 设置屏幕亮度
  setScreenBrightness: function setScreenBrightness(e) {
    var value = Number(e.detail.value).toFixed(2);
    this.setData({
      brightness: value
    });
    wx.setScreenBrightness({
      value: value,
      success: function success() {
        // wx.showToast({
        //   title: '设置成功',
        //   icon: 'success'
        // })
      }
    });
  }
});
//# sourceMappingURL=screen.js.map
