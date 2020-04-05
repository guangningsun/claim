<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="content">申请详情</block>
		</cu-custom>
	
		<view class="cu-card">
			<view class="cu-item">
				<view class="flex cu-form-group">
					<view class="title">申请人</view>
					<view>{{this.applicant}}</view>
				</view>
				<view class="flex cu-form-group">
					<view class="title">申请物品</view>
					<view>{{this.items}}</view>
				</view>
				<view class="flex cu-form-group">
					<view class="title">申请理由</view>
					<view>{{this.reason}}</view>
				</view>
				<view class="flex cu-form-group">
					<view class="title">申请时间</view>
					<view>{{this.applytime}}</view>
				</view>
			</view>
		</view>
		
		<view class="flex">
			<view class="flex-sub text-center bg-light-red padding-sm margin-xs margin-left-sm radius" @tap="onReject">拒绝</view>
			<view class="flex-sub text-center bg-gradual-green padding-sm margin-xs margin-right-sm radius" @tap="onApprove">同意</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad: function(option) {
			if(option.approveInfo !== undefined){
				let info = JSON.parse(option.approveInfo);
				
			}
		},
		methods: {
			
			onReject(){
				
			},
			onApprove(){
				
			}
		}
	}
</script>

<style>

</style>
