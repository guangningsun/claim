<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<block slot="content">用品申领平台</block>
		</cu-custom>

		<view v-show="!shouldShowContent && showCenterIcon">
			<view class="justify-center l-center">
				<image
					src="../../static/auth_index_icon.png"
					style="width: 300upx; height: 300upx;"
				></image>
				<button
					class="bg-olive margin-bottom-sm text-df"
					open-type="getPhoneNumber"
					lang="zh_CN"
					@getphonenumber="getPhoneNumber"
				>
					手机号登录
				</button>
			</view>
			
			<view class="text-gray text-center justify-center padding-sm" style="position:fixed; bottom:0;" >
				{{hint}}
			</view>
			
			<!-- 			<view class="l-foot padding flex justify-end">
				
				<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">
					微信登录
				</button>
			</view> -->
		</view>

		<view v-show="shouldShowContent">
			<view
				class="cu-list grid col-1 no-border"
				style="margin-top: 70upx; padding-top: 40upx;"
			>
				<view class="cu-item" @tap="onClickScan">
					<view class="flex justify-center">
						<image
							src="../../static/scan.png"
							style="width: 80upx; height: 80upx;"
						></image>
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
		</view>

		<!-- <view v-show="showLoading" class="l-center">
			<image
				src="https://image.weilanwl.com/gif/loading-white.gif"
				mode="aspectFit"
				class="gif-white response"
				style="height:240upx"
			></image>
		</view> -->

		<!-- 申请手机号modal -->
		<view class="cu-modal bottom-modal" :class="modalName == 'PhoneModal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">手机号登录</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-light-purple"></text>
					</view>
				</view>
				<view class="padding-xl">{{hint}}</view>
				<view class="cu-bar bg-white">
					<view class="flex justify-end action">
						<button class="cu-btn text-gray" @tap="hideModal">拒绝</button>
						<button
							class="cu-btn line-olive margin-left-sm"
							open-type="getPhoneNumber"
							lang="zh_CN"
							@getphonenumber="getPhoneNumber"
						>
							同意
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			modalName: null,

			openid: '',
			headImg: '../../static/submit1.png',
			user_nickname: '',
			user_phone:'',
			user_auth:'',

			shouldShowContent: false,
			showCenterIcon: true,
			
			hint:'登录后可以完整使用部门物品申领、审批服务。首次使用，需要授权获取您的手机号进行登录绑定。'
		};
	},
	onLoad() {},
	onShow() {
		this.user_phone = uni.getStorageSync('key_phone_num');
		this.openid = uni.getStorageSync('key_wx_openid');
		this.user_auth = uni.getStorageSync('key_user_auth');
		
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
		showPhoneModal(e) {
			this.modalName = e;
		},
		hideModal(e) {
			this.modalName = null;
		},

		successCb(rsp) {
			console.log(rsp);
			if (rsp.data.error === 0) {
				this.openid = rsp.data.openid;
				let is_login = rsp.data.is_login;
				let user_auth = rsp.data.auth;
				
				uni.setStorage({
					key: 'key_user_auth',
					data: user_auth
				});
				
				uni.setStorage({
					key: 'key_wx_openid',
					data: rsp.data.openid
				});
				
////////				
				if(is_login === '0'){
					this.showPhoneModal('PhoneModal');
				}else{
					console.log('auth:' + user_auth)
					uni.showLoading({
						title:'登录中...'
					})
					if (user_auth === '0') {
						uni.hideLoading();
						this.shouldShowContent = true;
					} else if(user_auth === '1' || user_auth === '2' || user_auth === '3'){
						uni.hideLoading();
						uni.navigateTo({
							url: '../approve/approve'
						});
					} else{
						this.showToast("未知错误!")
					}
				}
			}
		},
		failCb(err) {
			console.log('api_login failed', err);
		},
		completeCb(rsp) {},

		onClickScan() {
			uni.showLoading({
				title: '跳转中'
			});
			uni.scanCode({
				onlyFromCamera: true,
				success: res => {
					this.showCenterIcon = false;
					uni.hideLoading();

					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					if (this.containsStr(res.result, 'http')) {
						let cat = res.result.split('/');

						uni.setStorageSync('key_cat', cat[cat.length - 1]);

						uni.navigateTo({
							url: '../category/category'
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

		// 0: 普通用户， 1:主管,  2:办公室主任   3: 管理员
		successPhoneCb(rsp) {
			console.log('api_phone success');
			this.showCenterIcon = false;
			
			if (this.containsStr(rsp.errMsg, 'ok')) {
				uni.setStorage({
					key: 'key_phone_num',
					data: rsp.data.purePhoneNumber
				});
				uni.setStorage({
					key: 'key_user_auth',
					data: rsp.data.auth
				});

				let auth = rsp.data.auth;
				console.log('phone cb auth: ' + auth);
				uni.hideLoading();
				if (auth === '0') {
					this.shouldShowContent = true;
				} else if(auth === '1' || auth === '2' || auth === '3') {
					uni.navigateTo({
						url: '../approve/approve'
					});
				}
			}
		},
		failPhoneCb(err) {
			console.log('api_phone failed', err);
		},
		completePhoneCb(rsp) {},

		getPhoneNumber(e) {
			this.hideModal();

			var that = this;
			// 拒绝授权
			if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '未授权将无法登录',
					success: function(res) {}
				});
			} else {
				uni.showLoading({
					title: '跳转中'
				});

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

<style>
.l-center {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
