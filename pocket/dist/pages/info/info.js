'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var app = getApp();
Page({
  data: {
    pagetype: '',
    pagename: '',
    groupData: [] // 列表数据
  },
  onLoad: function onLoad(options) {
    var _this = this;

    var type = options.type,
        title = options.title;

    this.setData({
      pagetype: type || '',
      pagename: title || ''
    });
    wx.setNavigationBarTitle({
      title: title || ''
    });
    // 获取设备信息
    if (type === 'info') {
      this.getBaseInfo().then(function (res) {
        var phoneInfo = res.phoneInfo,
            deviceInfo = res.deviceInfo,
            wechatInfo = res.wechatInfo,
            plateform = res.plateform;

        Promise.all([_this.getNetwork(), _this.getScreenInfo()]).then(function (res) {
          var _res = _slicedToArray(res, 2),
              network = _res[0],
              screen = _res[1];

          console.log(res);
          phoneInfo.list.unshift({
            desc: '网络状态',
            value: network,
            navigate: true,
            url: '/pages/network/network'
          });
          deviceInfo.list.unshift({
            desc: '屏幕亮度',
            value: Number(screen.value).toFixed(2),
            navigate: true,
            url: '/pages/screen/screen'
          });
          _this.setData({
            groupData: [phoneInfo, deviceInfo, wechatInfo, plateform]
          });
        });
      });
    }
  },
  onShow: function onShow() {},
  getNetwork: function getNetwork() {
    // 获取网络状态
    var nets = {
      'wifi': 'wifi网络',
      '2g': '2g网络',
      '3g': '3g网络',
      '4g': '4g网络',
      '5g': '5g网络',
      'none': '无网络',
      'unknown': 'Android下不常见的网络类型'
    };
    return new Promise(function (resolve, reject) {
      wx.getNetworkType({
        success: function success(data) {
          var networkType = data.networkType;

          resolve(nets[networkType]);
        },
        fail: function fail() {
          resolve('获取失败');
        }
      });
    });
  },

  // 获取系统信息
  getBaseInfo: function getBaseInfo() {
    return new Promise(function (resolve, reject) {
      wx.getSystemInfo({
        success: function success(res) {
          var brand = res.brand,
              model = res.model,
              pixelRatio = res.pixelRatio,
              screenWidth = res.screenWidth,
              screenHeight = res.screenHeight,
              windowWidth = res.windowWidth,
              windowHeight = res.windowHeight,
              statusBarHeight = res.statusBarHeight,
              language = res.language,
              version = res.version,
              system = res.system,
              platform = res.platform,
              fontSizeSetting = res.fontSizeSetting,
              SDKVersion = res.SDKVersion,
              benchmarkLevel = res.benchmarkLevel;

          var phoneInfo = {
            title: '手机基础信息',
            list: [{
              desc: '手机品牌',
              value: brand,
              info: ''
            }, {
              desc: '手机型号',
              value: model,
              info: ''
            }, {
              desc: '操作系统版本',
              value: system,
              info: ''
            }]
          };
          var deviceInfo = {
            title: '设备屏幕信息',
            list: [{
              desc: '设备像素比',
              value: pixelRatio,
              info: ''
            }, {
              desc: '屏幕宽度',
              value: screenWidth,
              info: ''
            }, {
              desc: '屏幕高度',
              value: screenHeight,
              info: ''
            }, {
              desc: '可使用窗口宽度',
              value: windowWidth,
              info: ''
            }, {
              desc: '可使用窗口高度',
              value: windowHeight,
              info: ''
            }, {
              desc: '状态栏的高度',
              value: statusBarHeight,
              info: ''
            }]
          };
          var wechatInfo = {
            title: '微信客户端信息',
            list: [{
              desc: '微信设置的语言',
              value: language,
              info: ''
            }, {
              desc: '微信版本号',
              value: version,
              info: ''
            }, {
              desc: '用户字体大小设置',
              value: fontSizeSetting + 'px',
              info: '以“我-设置-通用-字体大小”中的设置为准，单位 px。'
            }]
          };
          var plateform = {
            title: '',
            list: [{
              desc: '客户端平台',
              value: platform,
              info: ''
            }, {
              desc: '客户端基础库版本',
              value: SDKVersion,
              info: ''
            }, {
              desc: '性能等级(仅Android小游戏)',
              value: benchmarkLevel,
              info: '-2 或 0：该设备无法运行小游戏; -1：性能未知; >=1 设备性能值，该值越高，设备性能越好 (目前设备最高不到50)',
              disabled: system.toUpperCase().indexOf('IOS') !== -1
            }]
          };
          resolve({
            phoneInfo: phoneInfo,
            deviceInfo: deviceInfo,
            wechatInfo: wechatInfo,
            plateform: plateform
          });
        },
        fail: function fail(err) {
          reject(err);
        }
      });
    });
  },

  // 获取屏幕亮度
  getScreenInfo: function getScreenInfo() {
    return new Promise(function (resolve, reject) {
      wx.getScreenBrightness({
        success: function success(data) {
          resolve(data);
        },
        fail: function fail() {
          resolve({
            value: '获取失败'
          });
        }
      });
    });
  }
});
//# sourceMappingURL=info.js.map
