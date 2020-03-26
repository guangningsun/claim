<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<block slot="content">用品申领平台</block>
		</cu-custom>
		<view class="cu-list grid col-1 no-border" style="margin-top: 70upx; padding-top: 40upx;">
			<view class="cu-item" @tap="onClickScan">
				<view class="flex justify-center">
					<image src="../../static/scan.png" style="width: 80upx; height: 80upx;"></image>
				</view>
				<text class="margin-top-sm">扫码领用</text>
			</view>

			<!-- <view class="cu-item" @tap="onClickHistory">
				<view class="flex justify-center">
					<image
						src="../../static/order.png"
						style="width: 80upx; height: 80upx;"
					></image>
				</view>
				<text class="margin-top-sm">我的领用</text>
			</view> -->
		</view>
		
		
		<!-- 
		<button type="primary" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="getPhoneNumber">手机号一键登录</button>
		<button type="default" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">微信登录</button>
		 -->
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	onShow() {
		// uni.login({
		// 	provider: 'weixin',
		// 	success: function(loginRes) {
		// 		console.log('+++code：' + loginRes.code);

		// 		uni.setStorage({
		// 			key: 'key_wx_code',
		// 			data: loginRes.code
		// 		});
		// 	}
		// });

		//1.调用登录接口
		// wx.login({
		// 	success: res => {
		// 		wx.getUserInfo({
		// 			success: function(res) {
		// 				that.globalData.userInfo = res.userInfo;
		// 				// typeof cb == 'function' && cb(that.globalData.userInfo, true);
		// 				console.log(res.userInfo);
		// 			},
		// 			fail: function() {
		// 				//2.第一次登陆不强制授权，直接返回
		// 				// if (loginType == 0) {
		// 				// 	typeof cb == 'function' && cb(that.globalData.userInfo, false);
		// 				// } else {
		// 				//3.授权友好提示
		// 				wx.showModal({
		// 					title: '提示',
		// 					content: '您还未授权登陆，部分功能将不能使用，是否重新授权？',
		// 					showCancel: true,
		// 					cancelText: '否',
		// 					confirmText: '是',
		// 					success: function(res) {
		// 						//4.确认授权调用wx.openSetting
		// 						if (res.confirm) {
		// 							if (wx.openSetting) {
		// 								//当前微信的版本 ，是否支持openSetting
		// 								wx.openSetting({
		// 									success: res => {
		// 										if (res.authSetting['scope.userInfo']) {
		// 											//如果用户重新同意了授权登录
		// 											wx.getUserInfo({
		// 												success: function(res) {
		// 													// that.globalData.userInfo = res.userInfo;
		// 													console.log(res.userInfo);
		// 												}
		// 											});
		// 										} else {
		// 											//用户还是拒绝
		// 											// typeof cb == 'function' &&
		// 											// 	cb(that.globalData.userInfo, false);
		// 												console.log("用户还是拒绝");
		// 										}
		// 									},
		// 									fail: function() {
		// 										// //调用失败，授权登录不成功
		// 										// typeof cb == 'function' &&
		// 										// 	cb(that.globalData.userInfo, false);
		// 											console.log("调用失败，授权登录不成功");
		// 									}
		// 								});
		// 							} else {
		// 								console.log("当前微信的版本 ，不支持openSetting");
		// 							}
		// 						} else {
		// 							console.log("不confirm");
		// 						}
		// 					}
		// 				});
		// 				// }
		// 			}
		// 		});
		// 	},
		// 	fail: res => {}
		// });
	},
	methods: {
		onClickScan() {
			uni.scanCode({
				onlyFromCamera: true,
				success: res => {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					if(this.containsStr(res.result,'http')){
						let cat = res.result.split('/');

						uni.setStorageSync('key_cat',cat[cat.length-1]);
						
						uni.navigateTo({
							url:'../item_choose/cart'
						})
					}
				}
			});
		},
		
		onClickHistory() {
			uni.navigateTo({
				url: '../history/history'
			});
		},
		onGotUserInfo(e){
			console.log(e);
		},
		getPhoneNumber(e){
			console.log(e);
		}
	}
};
</script>

<style></style>
