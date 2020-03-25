<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<block slot="content">用品申领平台</block>
		</cu-custom>
		<view class="cu-list grid col-2 no-border" style="margin-top: 70upx; padding-top: 40upx;">
			<view class="cu-item" @tap="onClickScan">
				<view class="flex justify-center">
					<image src="../../static/scan.png" style="width: 80upx; height: 80upx;"></image>
				</view>
				<text class="margin-top-sm">扫码领用</text>
			</view>
			<view class="cu-item" @tap="onClickHistory">
				<view class="flex justify-center">
					<image src="../../static/order.png" style="width: 80upx; height: 80upx;"></image>
				</view>
				<text class="margin-top-sm">我的领用</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
		    
		},
		onShow() {
			uni.login({
			    provider: 'weixin',
			    success: function (loginRes) {
			        console.log("+++code：" + loginRes.code);
					
					uni.setStorage({
						key: 'key_wx_code',
						data: loginRes.code
					});
			    }
			});
		},
		methods: {
			onClickScan(){
				uni.scanCode({
				    onlyFromCamera: true,
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						uni.showToast({
							icon:'none',
							title:'条码类型：' + res.scanType + ', ' + '条码内容：' + res.result
						})
				    }
				});
			},
			onClickHistory(){
				uni.navigateTo({
					url:'../history/history'
				})
			}
		}
	}
</script>

<style>
	
</style>
