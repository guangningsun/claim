<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="content">物品选择</block>
		</cu-custom>
		<view class="margin-xl"></view>
		<view v-for="(item, index) in cartList" :key="index">
			<view class="cu-card card-margin">
				<view
					class="cu-item padding-sm"
					:class="[item.number > 0 ? 'solids line-olive' : ' ']"
				>
					<view class="flex justify-between">
						<!-- <img class="margin-left-xl" :src="domain + item.asset_image ../../static/default.png" :onerror="default_img" style="width: 150upx; height: 150upx;"></img> -->
						<view class="flex align-center">
							<img
								class=""
								:src="domain + item.asset_image"
								:onerror="default_img"
								style="width: 150upx; height: 150upx;"
							/>
							<view class="margin-left-xs">
								<view>{{ item.asset_name }}</view>
								<view class="flex align-center">
									<text class="text-gray margin-right-xs">
										库存:{{ item.asset_count }}
									</text>
									<view class="text-gray">{{ item.asset_unit }}</view>
								</view>
								<view>
									<text class="text-gray margin-right-xs">
										型号:{{ item.asset_type }}
									</text>
								</view>
								<view>
									<text class="text-gray margin-right-xs">
										规格:{{ item.asset_specification }}
									</text>
								</view>
							</view>
						</view>

						<view class="flex align-center">
							<uni-number-box
								class="step"
								:min="0"
								:max="item.stock"
								:value="item.number > item.stock ? item.stock : item.number"
								:id="item.item_id"
								@change="numberChange($event, item, index)"
							/>
							<!-- <view class="cuIcon-close"></view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<uni-fab
				ref="fab"
				:pattern="pattern"
				:content="content"
				:horizontal="horizontal"
				:vertical="vertical"
				:direction="direction"
				@trigger="trigger"
			/>
		</view>
	</view>
</template>

<script>
import { uniNumberBox } from '@dcloudio/uni-ui';
import { uniFab } from '@dcloudio/uni-ui';
export default {
	components: {
		uniNumberBox,
		uniFab
	},
	data() {
		return {
			domain: getApp().globalData.domain,
			default_img: 'this.src="' + require('../../static/default.png') + '"',

			cartList: [],

			directionStr: '垂直',
			horizontal: 'right',
			vertical: 'bottom',
			direction: 'horizontal',
			pattern: {
				color: '#7A7E83',
				backgroundColor: '#fff',
				selectedColor: '#0b988f',
				buttonColor: '#0b988f'
			},
			content: [
				{
					iconPath: '/static/submit1.png',
					selectedIconPath: '/static/submit1.png',
					text: '提交选择',
					active: true
				},
				// {
				// 	iconPath: '/static/order.png',
				// 	selectedIconPath: '/static/order.png',
				// 	text: '我的申领',
				// 	active: false
				// }
			]
		};
	},
	onLoad() {
		this.requestWithMethod(
			getApp().globalData.api_asset,
			"GET",
			'',
			this.successCb,
			this.failCb,
			this.completeCb);
	},
	methods: {
		successCb(rsp) {
			console.log('success cb')
			if (rsp.data.error === 0) {
				let repList = rsp.data.msg.asset_info;

				let newArr = repList.map((item,stock,number) =>{
				   return Object.assign(item,{stock:stock},{number:0})
				});
				newArr.map((item) => {
					item.stock = parseInt(item.asset_count)
				});
				console.log(newArr);
				this.cartList = newArr;
			}
		},
		failCb(err) {
			console.log('api_asset failed', err);
		},
		completeCb(rsp) {},

		//数量
		numberChange(event, item, index) {
			this.cartList[index].number = event;
		},

		trigger(e) {
			console.log(e);

			if (e.index === 0) {
				uni.showModal({
					title: '提示',
					content: '是否申领选择的物品？',
					success: res => {
						if (res.confirm) {
							this.submit();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			} else if (e.index === 1) {
				uni.navigateTo({
					url: '../history/history'
				});
			}
		},

		successCallback(rsp) {
			console.log('success cb')
			if (rsp.data.error === 0) {
				uni.showToast({
					title:'提交成功!'
				});
				uni.navigateTo({
					url:'../index/index'
				});
			}
		},
		failCallback(err) {
			console.log('api_claim_asset failed', err);
			this.showToast(err)
		},
		completeCallback(rsp) {
			uni.hideLoading();
		},

		submit() {
			uni.showLoading({
				title: '正在提交'
			});

			let itemList = this.cartList.filter((item)=>{return item.number>0});

			console.log(itemList);

			let cat = uni.getStorageSync('key_cat');
			let result_list = itemList.map((item) =>{
			   return Object.assign({claim_count:item.number},{claim_name:item.asset_name},{category:cat})
			});
			
			console.log(result_list);
			
			let params = {
				choose_list : result_list,
			}

			this.requestWithMethod(
				getApp().globalData.api_claim_asset,
				'POST',
				params,
				this.successCallback,
				this.failCallback,
				this.completeCallback
			);
		},
		
	}
};
</script>

<style>
.card-margin {
	margin-top: -30upx;
}
</style>
