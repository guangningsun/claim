<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="content">申请详情</block>
		</cu-custom>

		<view class="cu-card">
			<view class="cu-item">
				<view class="flex cu-form-group">
					<view class="title text-gray">部门</view>
					<view>{{ department }}</view>
				</view>
				<view class="flex cu-form-group">
					<view class="title text-gray">申请状态</view>
					<view>{{ status }}</view>
				</view>
				<view class="flex cu-form-group">
					<view class="title text-gray">申请物品</view>
					<view class="text-wrapper text-right margin-bottom-sm margin-top-sm">{{ itemList }}</view>
				</view>
				<view class="flex cu-form-group">
					<view class="title text-gray">申请理由</view>
					<view>{{ reason }}</view>
				</view>
				<view class="flex cu-form-group">
					<view class="title text-gray">申请时间</view>
					<view>{{ date }}</view>
				</view>
			</view>
		</view>

		<view class="flex">
			<view
				class="flex-sub text-center bg-light-red padding-sm margin-xs margin-left-sm radius"
				@tap="onRejcet()"
			>
				拒绝
			</view>
			<view
				class="flex-sub text-center bg-gradual-green padding-sm margin-xs margin-right-sm radius"
				@tap="onApprove()"
			>
				同意
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='RejectModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">拒绝原因</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-light-purple"></text>
					</view>
				</view>
		
				<form>
					<view class="cu-form-group">
						<view class="title">拒绝原因</view>
						<input class="text-left" placeholder="输入拒绝原因" name="input" v-model="reject_reason"></input>
						<!-- <textarea class="text-left" maxlength="-1" @input="textareaInput" placeholder="输入拒绝原因"></textarea> -->
					</view>
				</form>
		
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-gray text-gray" @tap="hideModal">取消</button>
						<button class="cu-btn bg-gradual-light-red margin-left" @tap="onConfirmReject()">确定</button>
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
			reject_reason:'',
			modalName: null,
			
			date: '',
			status: '',
			department: '',
			items: '',
			reason: '',
			itemList: '',
			
			approveInfo:''
		};
	},
	onLoad: function(option) {
		if (option.approveInfo !== undefined) {
			let info = JSON.parse(decodeURIComponent(option.approveInfo));
			this.approveInfo = info;
			this.date = info.claim_date;
			this.status = info.approval_status;
			this.department = info.category;
			this.items = info.items;
			this.itemList = info.itemsList;
			this.reason = info.desc;
		}
	},
	methods: {
		showModal(e) {
			this.modalName = e;
		},
		hideModal(e) {
			this.modalName = null;
		},
		
		successStatusCb(rsp) {
			console.log('success cb');
			this.initData();
			if (rsp.data.error === 0) {
				
			}
		},
		failStatusCb(err) {
			console.log('api_status failed', err);
		},
		completeStatusCb(rsp) {},
		
		requestChangeStatus(id, isRejected, reason){
			let params = {
				openid: uni.getStorageSync('key_wx_openid'),
				is_rejectted: isRejected,
				is_finished: false,
				reason: reason,
				record_id:id
			};
			this.requestWithMethod(
				getApp().globalData.api_change_approval_status,
				'POST',
				params,
				this.successStatusCb,
				this.failStatusCb,
				this.completeStatusCb
			);
		},
		
		onApprove(e) {
			this.requestChangeStatus(this.approveInfo.id, false,'');
		},
		onRejcet(e) {
			this.reject_reason = '';
			this.showModal('RejectModal');
		},
		onConfirmReject(e){
			this.requestChangeStatus(this.approveInfo.id, true, this.reject_reason);
			this.hideModal();
		}
	}
};
</script>

<style>
.text-wrapper {
	white-space: pre-wrap;
}
</style>
