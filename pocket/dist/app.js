'use strict';

// app.js
var util = require('./lib/util');
wx.util = util;
App({
  onLaunch: function onLaunch() {},
  onShow: function onShow(options) {
    var _this = this;

    wx.onNetworkStatusChange(function (data) {
      var isConnected = data.isConnected,
          networkType = data.networkType;

      if (_this.globalData.networkNotice) {
        if (isConnected) {
          wx.showToast({
            title: networkType + '\u7F51\u7EDC',
            icon: 'success'
          });
        } else {
          wx.showToast({
            title: '\u7F51\u7EDC\u5DF2\u7ECF\u65AD\u5F00',
            icon: 'error'
          });
        }
      }
    });
  },

  globalData: {
    networkNotice: false
  }
});
//# sourceMappingURL=app.js.map
