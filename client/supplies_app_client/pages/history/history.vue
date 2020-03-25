<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="content">我的申领记录</block>
		</cu-custom>

		<view
			class="cu-card card-margin"
			style="margin-bottom: -30upx;"
			v-for="(item, index) in history_list"
			:key="index"
		>
			<view class="cu-item padding-bottom-sm">
				<view class="flex justify-between">
					<view
						class="flex align-center text-left margin-top-sm margin-left text-gray"
						style="width: 100%;"
					>
						{{ item.time }}
					</view>
					<view class="cu-tag radius bg-green">{{ item.status }}</view>
				</view>
				<view class="flex">
					<view class="margin-left margin-top-sm flex align-center">
						<view class="text-gray margin-right-sm">物品:</view>
						<view>{{ item.item_str }}</view>
					</view>
				</view>
				<!-- <view class="flex justify-end">
					<button class="cu-btn line-blue margin-right-xs margin-bottom-sm" @tap="onInstallDetail(item)">详情</button>
					<button class="cu-btn line-orange margin-bottom-sm margin-right-xs" @tap="onReinstall(item)">重装</button>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			history_list: [
				{
					time: '2020-03-20 10:00',
					status: '已申领',
					item_list: [
						{
							name: '笔',
							num: 3
						},
						{
							name: '橡皮擦',
							num: 2
						},
						{
							name: '订书机',
							num: 1
						}
					],
					item_str: '笔(3),橡皮擦(2),订书机(1)'
				},
				{
					time: '2020-03-20 10:00',
					status: '申领中',
					item_list: [
						{
							name: '中性笔',
							num: 10
						},
						{
							name: '橡皮擦',
							num: 1
						}
					],
					item_str: '中性笔(10),橡皮擦(1)'
				}
			]
		};
	},
	methods: {}
};
</script>

<style></style>
