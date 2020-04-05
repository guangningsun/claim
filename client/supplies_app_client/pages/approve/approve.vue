<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<block slot="content">审批</block>
		</cu-custom>

		<view class="cu-card card-margin" style="margin-bottom: -30upx;" v-for="(item,index) in approve_list" :key="index">
			<view class="cu-item">
				<view class="flex justify-between">
					<view class="flex align-center text-left margin-top-sm margin-left-sm text-gray" style="width: 100%;">
						{{item.applytime}}
					</view>
					<view class="cu-tag radius bg-green">{{item.status}}</view>
				</view>
				<view class="flex">
					<view class="margin-top-sm margin-left-sm">
						<view>申请人: {{item.applicant}}</view>
						<view>申请物品: {{item.items}}</view>
						<view>申请理由: {{item.reason}}</view>
					</view>
				</view>
				<view class="flex justify-end">
					<button class="cu-btn line-blue margin-right-xs margin-bottom-sm" @tap="onDetail(item)">详情</button>
					<button class="cu-btn line-light-red margin-bottom-sm margin-right-xs" @tap="onRejcet(item)">拒绝</button>
					<button class="cu-btn line-green margin-bottom-sm margin-right-xs" @tap="onApprove(item)">同意</button>
				</view>
			</view>
		</view>

		<!-- <view class=" flex justify-center margin-top-sm text-gray margin-bottom-sm" v-if="showLoadMore">{{loadMoreText}}</view> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadMoreText: "加载中...",
				showLoadMore: true,

				search_device_sn: '',

				request_num: 20,
				start_index: 0,

				approve_list: [
					{
						id:1,
						applytime:'2020-02-12',
						status:'待审批',
						applicant:'小李',
						items:'笔10支，笔记本20本，A4纸1盒',
						reason:'不需要理由'
					},
					{
						id:1,
						applytime:'2020-02-12',
						status:'待审批',
						applicant:'小李',
						items:'笔10支，笔记本20本，A4纸1盒',
						reason:'不需要理由'
					},
					{
						id:1,
						applytime:'2020-02-12',
						status:'待审批',
						applicant:'小李',
						items:'笔10支，笔记本20本，A4纸1盒',
						reason:'不需要理由'
					}
				],
			}
		},
		
		// onPullDownRefresh() {
		// 	console.log('onPullDownRefresh!!!!');
		// 	this.initData();
		// },
		// onReachBottom() {
		// 	console.log("onReachBottom");
		// 	this.showLoadMore = true;
			
		// 	let startIndex = this.install_device_list.length - 1;
		// 	if (this.install_device_list.length === 1) {
		// 		startIndex = 1;
		// 	}
			
		// 	let params = {
		// 		start_index: startIndex,
		// 		num: this.request_num,
		// 	};

		// 	this.requestWithMethod(
		// 		getApp().globalData.api_install_device + this.getParamsUrl(params),
		// 		"GET",
		// 		'',
		// 		this.successCb,
		// 		this.failCb,
		// 		this.completeCb);
		// },
		onLoad() {
			this.initData();
		},
		// onUnload() {
		// 	this.install_device_list = [],
		// 		this.loadMoreText = "加载更多",
		// 		this.showLoadMore = false;
		// },
		methods: {
			
			initData() {
				
				
				
				// uni.stopPullDownRefresh();

				// this.install_device_list = [],
				// 	this.loadMoreText = "加载更多",
				// 	this.showLoadMore = false;

				// var params = {
				// 	start_index: 0,
				// 	num: this.request_num,
				// };
				// this.requestWithMethod(
				// 	getApp().globalData.api_approve + this.getParamsUrl(params),
				// 	"GET",
				// 	'',
				// 	this.successCb,
				// 	this.failCb,
				// 	this.completeCb);
			},
			successCb(rsp) {
				console.log('success cb')
				if (rsp.data.error === 0) {
					this.approve_list = rsp.data.msg.approve_list;
					
					// let rspList = rsp.data.msg.install_device_list;
					// this.approve_list = this.install_device_list.concat(rspList);
					// if (rspList.length < this.request_num) {
					// 	this.showLoadMore = true;
					// 	this.loadMoreText = "没有更多";
					// } else {
					// 	this.loadMoreText = "加载中...";
					// }
				}
			},
			failCb(err) {
				console.log('api_approve failed', err);
			},
			completeCb(rsp) {},

			onDetail(item) {
				uni.navigateTo({
					url: 'approve_detail?approveInfo=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			onApprove(item) {
				
			}
		}
	}
</script>

<style>

</style>
