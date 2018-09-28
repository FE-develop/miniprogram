// app.js
const util = require('./lib/util');

wx.util = util;

App({
  onLaunch: function () {},
  onShow(options) {
    wx.onNetworkStatusChange((data) => {
      const {
        isConnected,
        networkType
      } = data;
      if (this.globalData.networkNotice) {
        if (isConnected) {
          wx.showToast({
            title: `${networkType}网络`,
            icon: 'success'
          })
        } else {
          wx.showToast({
            title: `网络已经断开`,
            icon: 'error'
          })
        }
      }
    })
  },
  globalData: {
    networkNotice: false
  }
})