const app = getApp()

Page({
	data: {
		motto: ''
	},
	onLoad: function () {
		wx.util.showCustomToast(this, '微信小程序开发', 1200);
	},
	//事件处理函数
	bindViewTap: function () {
		wx.navigateTo({
			url: '/pages/logs/logs'
		})
	},
	// wx.showToast(object)
	showToast() {
		wx.showToast({
			title: '操作成功',
			icon: 'success'
		})
	},
	// 显示自定义toast
	showCustomeToast() {
		wx.util.showCustomToast(this, '微信小程序开发者, 自定义开发Toast组件');
	},
	// 获取用户信息
	getUserInfo: function (e) {
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	},
	// 请求api获取motto数据
	getMotto() {
		return null;
	},
	// 下拉刷新
	onPullDownRefresh() {
		setTimeout(() => {
			wx.stopPullDownRefresh();
		}, 2000);
	}
})
