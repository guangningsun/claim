<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="content">{{ cate_title }}</block>
		</cu-custom>
		<view class="margin-xl"></view>
		<view v-for="(item, index) in cartList" :key="index">
			<view class="cu-card card-margin">
				<view
					class="cu-item padding-sm "
					:class="[item.number > 0 ? 'solids line-olive' : ' ']"
				>
					<view class="flex flex flex-wrap">
						<view class="flex align-center" style="flex-basis: 80%;">
							<img
								class=""
								:src="domain + item.asset_image"
								:onerror="default_img"
								style="width: 150upx; height: 150upx;"
							/>
							<view class="margin-left-xs">
								<view>{{ item.asset_name }}</view>
								<view class="flex align-center">
									<view class="text-gray margin-right-xs">
										库存:{{ item.asset_count }}
									</view>
									<view class="text-gray">{{ item.asset_unit }}</view>
								</view>
								<view>
									<view class="text-gray margin-right-xs ">
										型号:{{ item.asset_type }}
									</view>
								</view>
								<view>
									<view class="text-gray margin-right-xs ">
										规格:{{ item.asset_specification }}
									</view>
								</view>
							</view>
						</view>

						<view class="justify-end align-center" style="flex-basis: 20%;">
							<!-- <uni-number-box
								class="step"
								:min="0"
								:max="item.stock"
								:value="item.number > item.stock ? item.stock : item.number"
								:id="item.item_id"
								@change="numberChange($event, item, index)"
							/> -->

							<view class="align-center justify-end padding-top-sm">
								<button
									v-show="shouldShowAdd(item)"
									class="cu-btn line-blue margin-right-xs margin-bottom-sm"
									@tap="onAdd(item)"
								>
									添加
								</button>
								<button
									class="cu-btn line-light-red margin-bottom-sm margin-right-xs"
									@tap="onMinus(item)"
								>
									删除
								</button>
							</view>
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
			cate_title: '',
			cateId: '',

			cart_item_id_list: [],

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
					iconPath: '/static/cart.png',
					selectedIconPath: '/static/cart.png',
					text: '物品篮',
					active: true
				}
				// {
				// 	iconPath: '/static/order.png',
				// 	selectedIconPath: '/static/order.png',
				// 	text: '我的申领',
				// 	active: false
				// }
			],

			catagory_num_limit: 5,
			item_limit: 5
		};
	},
	onLoad(options) {
		this.cateId = options.tid;
		this.cate_title = options.tname;

		// this.loadCateList(options.fid,options.sid);

		this.cart_item_id_list = getApp().globalData.cart_list_info.map(item => {
			return Object.assign({ id: item.id });
		});

		this.loadData();
	},
	methods: {
		loadData() {
			this.requestWithMethod(
				getApp().globalData.api_asset + this.cateId,
				'GET',
				'',
				this.successCb,
				this.failCb,
				this.completeCb
			);
		},

		shouldShowAdd(item) {
			if (this.cart_item_id_list.indexOf(item.id) > -1) {
				return false;
			}
			return true;
		},

		onAdd(item) {
			if (getApp().globalData.cart_list_info.length == 0) {
				getApp().globalData.cart_list_info.push(item);
				this.showToast('成功添加到购物车');
				console.log(getApp().globalData.cart_list_info);
				return;
			}

			for (var i = 0; i < getApp().globalData.cart_list_info.length; i++) {
				if (getApp().globalData.cart_list_info[i].asset_name == item.asset_name) {
					this.showToast(item.asset_name + ' 已添加过了，无须重复添加');
					console.log(getApp().globalData.cart_list_info);
					return;
				}
			}

			getApp().globalData.cart_list_info.push(item);
			console.log(getApp().globalData.cart_list_info);
			this.showToast(item.asset_name + ' 成功添加到购物车');
		},

		onMinus(item) {
			for (var i = 0; i < getApp().globalData.cart_list_info.length; i++) {
				if (getApp().globalData.cart_list_info[i].asset_name == item.asset_name) {
					getApp().globalData.cart_list_info.splice(i, 1);
					this.showToast(item.asset_name + '成功从购物车删除');
					console.log(getApp().globalData.cart_list_info);
					return;
				}
			}
			this.showToast('购物车无 ' + item.asset_name + '，无须删除');
			console.log(getApp().globalData.cart_list_info);
		},

		successCb(rsp) {
			console.log('success cb');
			if (rsp.data.error === 0) {
				let repList = rsp.data.msg.asset_info;

				let newArr = repList.map((item, stock, number) => {
					return Object.assign(item, { stock: stock }, { number: 0 });
				});
				newArr.map(item => {
					item.stock = parseInt(item.asset_count);
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
			if (this.cartList[index].number < event) {
				this.showToast('添加 ' + item.asset_name + ' 到物品篮');
			} else {
				this.showToast('从物品篮减少 ' + item.asset_name);
			}
			this.cartList[index].number = event;
		},

		trigger(e) {
			if (e.index === 0) {
				// uni.showModal({
				// 	title: '提示',
				// 	content: '是否申领选择的物品？',
				// 	success: res => {
				// 		if (res.confirm) {
				// 			this.submit();
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// });

				uni.navigateTo({
					url: '../cart/cart'
				});
			}
		},

		successCallback(rsp) {
			console.log('success cb');
			if (rsp.data.error === 0) {
				// wx.showToast({
				// 	title:rsp.data.msg,
				// 	complete: () => {
				// 		uni.navigateTo({
				// 			url: '../index/index'
				// 		});
				// 	}
				// });
				uni.showToast({
					title: rsp.data.msg,
					complete: () => {
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 1500);
					}
				});
			} else if (rsp.data.error === 1) {
				this.showToast(rsp.data.msg);
			}
		},
		failCallback(err) {
			uni.hideLoading();
			console.log('api_claim_asset failed', err);
			this.showToast(err);
		},
		completeCallback(rsp) {},

		getCartCataNum() {
			let result = 0;
			for (var i = 0; i < this.cartList.length; i++) {
				this.cartList[i];
			}
		},

		submit() {
			// if()

			uni.showLoading({
				title: '正在提交'
			});

			let itemList = this.cartList.filter(item => {
				return item.number > 0;
			});

			console.log(itemList);

			let cat = uni.getStorageSync('key_cat');
			let result_list = itemList.map(item => {
				return Object.assign(
					{ claim_count: item.number },
					{ claim_name: item.asset_name },
					{ id: item.id },
					{ category: cat }
				);
			});

			console.log(result_list);

			let params = {
				choose_list: JSON.stringify(result_list)
			};

			this.requestWithMethod(
				getApp().globalData.api_claim_asset,
				'POST',
				params,
				this.successCallback,
				this.failCallback,
				this.completeCallback
			);
		}
	}
};
</script>

<style>
.card-margin {
	margin-top: -30upx;
}
</style>
