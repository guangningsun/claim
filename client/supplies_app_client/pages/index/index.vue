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

		<button
			type="primary"
			open-type="getPhoneNumber"
			lang="zh_CN"
			@getphonenumber="getPhoneNumber"
		>
			手机号一键登录
		</button>
		<button type="default" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">
			微信登录
		</button>
		<image class="margin round" :src="headImg" style="width: 100upx; height: 100upx;"></image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			openid:'',
			headImg:'../../static/submit1.png',
			user_nickname:''
		};
	},
	onLoad() {},
	onShow() {
		uni.login({
			provider: 'weixin',
			success: loginRes => {
				console.log('+++code：' + loginRes.code);

				this.requestWithMethod(
					getApp().globalData.api_login + loginRes.code,
					'POST',
					'',
					this.successCb,
					this.failCb,
					this.completeCb
				);
			}
		});	
	},
	methods: {
		
		successCb(rsp) {
			console.log(rsp);
			
			if (rsp.data.error === 0) {
				this.openid = rsp.data.openid;
				uni.setStorage({
					key: 'key_wx_openid',
					data: rsp.data.openid
				});	
			}
		},
		failCb(err) {
			console.log('api_login failed', err);
		},
		completeCb(rsp) {},

		onClickScan() {
			uni.scanCode({
				onlyFromCamera: true,
				success: res => {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					if (this.containsStr(res.result, 'http')) {
						let cat = res.result.split('/');

						uni.setStorageSync('key_cat', cat[cat.length - 1]);

						uni.navigateTo({
							url: '../item_choose/cart'
						});
					}
				}
			});
		},

		onClickHistory() {
			uni.navigateTo({
				url: '../history/history'
			});
		},
		onGotUserInfo(e) {
			console.log(e);
			console.log(e.detail.userInfo.avatarUrl);
			this.headImg = e.detail.userInfo.avatarUrl;
			this.user_nickname = e.detail.userInfo.nickName;
			uni.setStorage({
				key: 'key_user_head',
				data: e.detail.userInfo.avatarUrl
			});	
			uni.setStorage({
				key: 'key_user_nickname',
				data: e.detail.userInfo.nickName
			});	
		},

		///////////////

		successPhoneCb(rsp) {
			console.log('api_phone success');
			if(this.containsStr(rsp.errMsg,"ok")){
				uni.setStorage({
					key: 'key_phone_num',
					data: rsp.data.purePhoneNumber
				});	
			}
		},
		failPhoneCb(err) {
			console.log('api_phone failed', err);
		},
		completePhoneCb(rsp) {},

		getPhoneNumber(e) {
			console.log(e);
			console.log('getPhoneNumber=====');

			var that = this;
			// 拒绝授权
			if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
				uni.showModal({
					title:'提示',
					showCancel:false,
					content:'未授权将无法登录',
					success:function(res){
						
					}
				})
			} else {
				let params = {
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv,
					openid: this.openid
				};
				this.requestWithMethod(
					getApp().globalData.api_getWXInfo,
					'POST',
					params,
					this.successPhoneCb,
					this.failPhoneCb,
					this.completePhoneCb
				);
			}
		}
	}
};
</script>

<style></style>
