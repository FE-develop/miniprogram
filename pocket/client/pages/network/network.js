const app = getApp();

Page({
  data: {
    noticeStatus: false, // 网络切换通知状态
    wifiStatus: true, // 开启/关闭wifi
  },
  onLoad(options) {
    this.setData({
      noticeStatus: app.globalData.networkNotice || false
    })
  },
  onShow() {
    // 获取网络状态
    const nets = {
      'wifi': 'wifi网络',
      '2g': '2g网络',
      '3g': '3g网络',
      '4g': '4g网络',
      '5g': '5g网络',
      'none': '无网络',
      'unknown': 'Android下不常见的网络类型',
    }
    wx.getNetworkType({
      success: (data) => {
        const {
          networkType
        } = data;
        this.setData({
          networkType: nets[networkType]
        })
      },
      fail: () => {
        this.setData({
          networkType: '获取失败'
        })
      }
    });
  },
  // 网络状态切换提示
  noticeChange(e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value);
    app.globalData.networkNotice = e.detail.value;
    this.setData({
      noticeStatus: e.detail.value
    })
    wx.showToast({
      title: e.detail.value ? '提醒已开启' : '提醒已关闭',
      icon: 'success'
    })
  },
  // 开启/关闭wifi
  switchWifi(e) {
    console.log(e.detail.value);
    if (e.detail.value) {
      wx.startWifi({
        success: () => {
          // wx.showToast({
          //   title: 'WiFi已开启',
          //   icon: 'success'
          // })
          wx.getWifiList();
        }
      })
    } else {
      wx.stopWifi({
        success: () => {
          // wx.showToast({
          //   title: 'WiFi已关闭',
          //   icon: 'success'
          // })
        }
      });
    }
  },

  // wifi获取
  getWifi() {
    // wx.getConnectedWifi(Object object)
  }
})