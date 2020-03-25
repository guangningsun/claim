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
						<view class="flex align-center">
							<view class="">{{ item.item_name }}</view>
							<text class="text-gray margin-left margin-right">
								库存:{{ item.stock }}
							</text>
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
			@trigger="trigger" />
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
			cartList: [
				{
					item_id: 1,
					item_name: '蓝色中性笔',
					stock: 15,
					number: 0
				},
				{
					item_id: 2,
					item_name: '黑色签字笔',
					stock: 10,
					number: 2
				},
				{
					item_id: 3,
					item_name: '16开笔记本',
					stock: 10,
					number: 2
				}
			],
			
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
			content: [{
					iconPath: '/static/submit1.png',
					selectedIconPath: '/static/submit1.png',
					text: '提交选择',
					active: true
				},
				{
					iconPath: '/static/order.png',
					selectedIconPath: '/static/order.png',
					text: '我的申领',
					active: false
				},
			]
		};
	},
	methods: {
		//数量
		numberChange(event, item, index) {
			this.cartList[index].number = event;
		},
		//删除
		deleteCartItem(item, index) {
			let list = this.cartList;
			let row = list[index];
			let id = row.id;

			this.cartList.splice(index, 1);
		},
		trigger(e) {
			console.log(e)

			if(e.index === 0){
				uni.showModal({
					title: '提示',
					content: '是否申领选择的物品？',
					success:res => {
						if (res.confirm) {
							this.submit();
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			}else if(e.index === 1){
				uni.navigateTo({
					url:'../history/history'
				})
			}
		},
		submit(){
			this.showToast('yes');
			
		},
	}
};
</script>

<style>
.card-margin {
	margin-top: -30upx;
}
</style>
