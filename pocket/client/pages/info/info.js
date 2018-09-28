const app = getApp();

Page({
  data: {
    pagetype: '',
    pagename: '',
    groupData: [], // 列表数据
  },
  onLoad(options) {
    const {
      type,
      title
    } = options;
    this.setData({
      pagetype: type || '',
      pagename: title || ''
    })
    wx.setNavigationBarTitle({
      title: title || ''
    })

    // 获取设备信息
    if (type === 'info') {
      this.getBaseInfo().then(res => {
        const {
          phoneInfo,
          deviceInfo,
          wechatInfo,
          plateform
        } = res;

        Promise.all([this.getNetwork(), this.getScreenInfo()]).then(res => {
          const [network, screen] = res;
          console.log(res);
          phoneInfo.list.unshift({
            desc: '网络状态',
            value: network,
            navigate: true,
            url: '/pages/network/network'
          })
          deviceInfo.list.unshift({
            desc: '屏幕亮度',
            value: Number(screen.value).toFixed(2),
            navigate: true,
            url: '/pages/screen/screen'
          });
          this.setData({
            groupData: [phoneInfo, deviceInfo, wechatInfo, plateform]
          });
        })
      })
    }
  },
  onShow() {},
  getNetwork() {
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
    return new Promise((resolve, reject) => {
      wx.getNetworkType({
        success: (data) => {
          const {
            networkType
          } = data;
          resolve(nets[networkType]);
        },
        fail: () => {
          resolve('获取失败');
        }
      });
    })
  },
  // 获取系统信息
  getBaseInfo() {
    return new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success: (res) => {
          const {
            brand, // string 手机品牌	>= 1.5.0
            model, //	string	手机型号
            pixelRatio, //	number	设备像素比
            screenWidth, //	number	屏幕宽度	>= 1.1.0
            screenHeight, //	number	屏幕高度	>= 1.1.0
            windowWidth, //	number	可使用窗口宽度
            windowHeight, //	number	可使用窗口高度
            statusBarHeight, //	number	状态栏的高度	>= 1.9.0
            language, //	string	微信设置的语言
            version, //	string	微信版本号
            system, //	string	操作系统版本
            platform, //	string	客户端平台
            fontSizeSetting, //	number	用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位 px。	>= 1.5.0
            SDKVersion, //	string	客户端基础库版本	>= 1.1.0
            benchmarkLevel, //	number	(仅Android小游戏) 性能等级，-2 或 0：该设备无法运行小游戏，-1：性能未知，>=1 设备性能值，该值越高，设备性能越好 (目前设备最高不到50)
          } = res;

          const phoneInfo = {
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
          const deviceInfo = {
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

          const wechatInfo = {
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
              value: `${fontSizeSetting}px`,
              info: '以“我-设置-通用-字体大小”中的设置为准，单位 px。'
            }]
          }
          const plateform = {
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
          }
          resolve({
            phoneInfo,
            deviceInfo,
            wechatInfo,
            plateform
          });
        },
        fail: (err) => {
          reject(err);
        }
      })
    })
  },
  // 获取屏幕亮度
  getScreenInfo() {
    return new Promise((resolve, reject) => {
      wx.getScreenBrightness({
        success: (data) => {
          resolve(data);
        },
        fail: () => {
          resolve({
            value: '获取失败'
          });
        }
      });
    })

  }
})