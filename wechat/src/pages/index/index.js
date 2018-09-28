// 获取应用实例
const app = getApp();

Page({
	data: {
		navigationEnable: false,
		navigationTitle: '自定义导航',
		navigationBgStyle: 'background-color: #233F68;',
		navigationTextStyle: 'white',
	},
	onLoad(options) {

	},
	goback() {
		wx.showToast('go back')
	}
});
