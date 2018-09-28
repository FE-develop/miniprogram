'use strict';

Page({
  data: {
    list: [{
      id: 'info',
      name: '设备信息'
    }, {
      id: 'camera',
      name: '我的相机'
    }, {
      id: 'about',
      name: '关于'
    }]
  },
  viewInfo: function viewInfo(e) {
    var item = e.currentTarget.dataset.item;

    var url = '/pages/index/index';
    if (item.id === 'info') {
      url = '/pages/info/info?type=' + item.id + '&title=' + item.name;
    } else if (item.id === 'about') {
      url = '/pages/about/about';
    } else if (item.id === 'camera') {
      url = '/pages/camera/camera';
    }
    wx.navigateTo({
      url: url
    });
  }
});
//# sourceMappingURL=index.js.map
