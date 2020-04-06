<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<block slot="content">审批</block>
		</cu-custom>

		<view
			class="cu-card card-margin"
			style="margin-bottom: -30upx;"
			v-for="(item, index) in approve_list"
			:key="index"
		>
			<view class="cu-item">
				<view class="flex justify-between">
					<view
						class="flex align-center text-left margin-top-sm margin-left-sm text-gray"
						style="width: 100%;"
					>
						{{ item.claim_date }}
					</view>
					<view class="cu-tag radius bg-green">{{ item.approval_status }}</view>
				</view>
				<view class="flex">
					<view class="margin-top-sm margin-left-sm">
						<view>部门: {{ item.category }}</view>
						<view>申请物品: {{ item.items }}</view>
						<view>申请理由: {{ item.desc }}</view>
					</view>
				</view>
				<view class="flex justify-end">
					<button
						class="cu-btn line-blue margin-right-xs margin-bottom-sm"
						@tap="onDetail(item)"
					>
						详情
					</button>
					<button
						class="cu-btn line-light-red margin-bottom-sm margin-right-xs"
						@tap="onRejcet(item)"
					>
						拒绝
					</button>
					<button
						class="cu-btn line-green margin-bottom-sm margin-right-xs"
						@tap="onApprove(item)"
					>
						同意
					</button>
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
							<button class="cu-btn bg-gradual-light-red margin-left" @tap="onConfirmReject(item)">确定</button>
						</view>
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
			modalName: null,

			approve_list: [],
			
			reject_reason:''
		};
	},

	onLoad() {
		this.initData();
	},

	methods: {
		initData() {
			let params = {
				auth: uni.getStorageSync('key_user_auth'),
				openid: uni.getStorageSync('key_wx_openid')
			};
			this.requestWithMethod(
				getApp().globalData.api_get_approval_list,
				'POST',
				params,
				this.successCb,
				this.failCb,
				this.completeCb
			);
		},
		successCb(rsp) {
			console.log('success cb');
			if (rsp.data.error === 0) {
				this.approve_list = rsp.data.msg.approval_list_info;
				let result = this.approve_list.map(item => {
					let itemList = item.claim_list;
					itemList.map(i => {
						let key = Object.keys(i);
						if (item['items'] !== undefined) {
							item['items'] += key + i[key] + ', ';
						} else {
							item['items'] = key + i[key] + ', ';
						}

						if (item['itemsList'] !== undefined) {
							item['itemsList'] += key + i[key] + ' \n ';
						} else {
							item['itemsList'] = key + i[key] + ' \n ';
						}

						return i;
					});
					console.log(item.items);
					item.items = item.items.substring(0, item.items.length - 2);
					item.itemsList = item.itemsList.substring(0, item.itemsList.length - 2);
					return item;
				});
				this.approve_list = result;
				console.log(this.approve_list);
			}
		},
		failCb(err) {
			console.log('api_approve failed', err);
		},
		completeCb(rsp) {},

		onDetail(item) {
			uni.navigateTo({
				url: 'approve_detail?approveInfo=' + encodeURIComponent(JSON.stringify(item))
			});
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
		
		showModal(e) {
			this.modalName = e;
		},
		hideModal(e) {
			this.modalName = null;
		},
		
		onApprove(item) {
			this.requestChangeStatus(item.id, false,'');
		},
		onRejcet(item) {
			this.reject_reason = '';
			this.showModal('RejectModal');
		},
		onConfirmReject(item){
			this.requestChangeStatus(item.id, true, this.reject_reason);
			this.hideModal();
		}
	}
};
</script>

<style></style>
