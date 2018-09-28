/**
 * 使用方法
	<!-- Component组件 -->
	<auth-layer isShow="{{authStatus}}" bindgotUserInfo="onGotUserInfo"></auth-layer>

	// 获取用户信息回调
	onGotUserInfo(event) {
		const { detail } = event;
		if (detail && detail.userInfo) {
			wx.setStorage({ userInfo: detail.userInfo })
		} else {
			// 用户拒绝授权
		}
	}
 */
Component({
	properties: {
		isShow: {
			type: Boolean,
			value: false,
		},
		type: {
			type: String,
			value: 'getUserInfo'
		},
		title: {
			type: String,
			value: '小程序开发者·您好',
		},
	},
	methods: {
		// 允许授权成功回调
		onGotUserInfo(event) {
			const myEventDetail = event.detail; // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项
      this.triggerEvent('gotUserInfo', myEventDetail, myEventOption)
		},
	}
});
