<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<block slot="content">我的</block>
		</cu-custom>

		<view class="cu-card">
			<view class="flex align-center cu-item bg-gradual-dark-olive padding-sm">
				<view class="flex  p-xs margin-bottom-sm mb-sm">
					<view class="flex-sub">
						<view class="flex align-center justify-center margin-top">
							<image
								class=" round"
								:src="headImg"
								style="width: 120upx; height: 120upx;"
							></image>
						</view>
					</view>
					<view class="flex-twice">
						<view class=" flex text-white text-lg margin-left-sm margin-top-xl">
							<view>
								<view class="margin-bottom-xs">{{nickname}}</view>
								<view>{{tel}}</view>
							</view>
						</view>
					</view>
				</view>

				<view v-show="isShowBtn" class="flex justify-end padding-sm margin-xs radius">
					<button
						v-show="isShowTelBtn" 
						class="cu-btn line-white margin-right-xs margin-bottom-sx"
						open-type="getPhoneNumber"
						lang="zh_CN"
						@getphonenumber="getPhoneNumber"
					>
						更新手机号
					</button>
					<button
						v-show="isShowInfoBtn" 
						class="cu-btn line-light-yellow margin-right-xs margin-bottom-sx"
						open-type="getUserInfo"
						lang="zh_CN"
						@getuserinfo="onGotUserInfo"
					>
						更新个人信息
					</button>
				</view>
			</view>
		</view>

		<view class="cu-card">
			<view class="cu-item">
				<view class="cu-form-group" @tap="gotToAddDevice">
					<view class="flex align-center">
						<image
							class="margin-right-sm"
							src="../../static/cart.png"
							style="width: 60upx;height: 60upx;"
						></image>
						<text class="text-lg">添加设备</text>
					</view>
					<text class="cuIcon-right text-gray"></text>
				</view>

				<view class="cu-form-group" @tap="gotoAboutUs">
					<view class="flex align-center">
						<image
							class="margin-right-sm"
							src="../../static/cart.png"
							style="width: 60upx;height: 60upx;"
						></image>
						<text class="text-lg">联系我们</text>
					</view>
					<text class="cuIcon-right text-gray"></text>
				</view>
			</view>
		</view>

		<!-- <view class="justify-between bottom-box">
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-gradual-dark-green lg" @click="onLogout">退出登录</button>
			</view>
		</view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			isShowBtn: true,
			isShowTelBtn: true,
			isShowInfoBtn: true,
			
			headImg: '../../static/default_head.png',
			nickname:'--',
			tel:'--',

		};
	},

	onLoad() {
		let nickname = uni.getStorageSync('key_user_nickname');
		let tel = uni.getStorageSync('key_phone_num');
		let head = uni.getStorageSync('key_user_head');
		
		if(!this.isEmpty(tel)){
			this.tel = tel;
			this.isShowTelBtn = false;
		}else{
			this.isShowTelBtn = true;
		}
		
		if(!this.isEmpty(nickname)){
			this.nickname = nickname;
			this.headImg = head;
			this.isShowInfoBtn = false;
		}else{
			this.isShowInfoBtn = true;
		}
		
		if(this.isShowTelBtn === false && this.isShowInfoBtn === false){
			this.isShowBtn = false;
		}
	},

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
		
		onGotUserInfo(e) {
			this.headImg = e.detail.userInfo.avatarUrl;
			this.nickname = e.detail.userInfo.nickName;
			uni.setStorage({
				key: 'key_user_head',
				data: e.detail.userInfo.avatarUrl
			});	
			uni.setStorage({
				key: 'key_user_nickname',
				data: e.detail.userInfo.nickName
			});	
			this.isShowInfoBtn = false;
			
			if(this.isShowTelBtn === false && this.isShowInfoBtn === false){
				this.isShowBtn = false;
			}
		},
		
		successPhoneCb(rsp) {
			if(this.containsStr(rsp.errMsg,"ok")){
				this.tel = rsp.data.purePhoneNumber;
				uni.setStorage({
					key: 'key_phone_num',
					data: rsp.data.purePhoneNumber
				});
				
				this.isShowTelBtn = false;
				
				if(this.isShowTelBtn === false && this.isShowInfoBtn === false){
					this.isShowBtn = false;
				}
			}
		},
		failPhoneCb(err) {
			console.log('api_phone failed', err);
		},
		completePhoneCb(rsp) {},
		
		getPhoneNumber(e) {		
			var that = this;
			// 拒绝授权
			if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
				uni.showModal({
					title:'提示',
					showCancel:false,
					content:'不授权获取手机号将无法正常使用该小程序功能',
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
		},
		
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
		completeCb(rsp) {}
	}
};
</script>

<style></style>
