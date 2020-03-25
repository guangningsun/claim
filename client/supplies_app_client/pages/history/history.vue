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
						<view>{{ item.item_name }}</view>
					</view>
					<view class="margin-left margin-top-sm flex align-center">
						<view class="text-gray margin-right-sm">数量:</view>
						<view>{{ item.item_num }}</view>
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
					item_name:'笔',
					item_num:3
				},
				{
					time: '2020-03-20 10:00',
					status: '已申领',
					item_name:'橡皮擦',
					item_num:4
				}
			]
		};
	},
	methods: {}
};
</script>

<style></style>
