<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<block slot="content">物品分类</block>
		</cu-custom>
		
		<view v-show="showEmpty" style="margin-top: 200upx;">
			<view class="flex justify-center align-center margin-left-xl">
				<image src="../../static/empty_icon.png" style="width: 200upx; height: 200upx;" />
			</view>
			<view class="flex justify-center text-gray margin-top">空空如也</view>
		</view>
		
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 100upx)">
				<view class="cu-item" :class="item.id==tabCur?'text-green cur':''" v-for="(item,index) in catList" :key="index" @tap="TabSelect"
				 :data-id="item.id">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 100upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(item,index) in catList" :key="index" :id="'main-'+item.id">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-green"></text> {{item.name}}</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
							<view class="content">
								
								<!-- <view
									class="cu-item padding-sm "
									:class="[item.number > 0 ? 'solids line-olive' : ' ']">
									
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
								</view> -->
								
								<view class="text-grey">凯尔</view>
								<view class="text-gray text-sm flex">
									<text class="text-cut">
										<text class="cuIcon-infofill text-red  margin-right-xs"></text>
										    我已天理</text>
											</view>
							</view>
							<view class="cuIcon-cartfill round padding-xs bg-olive"></view>
						</view>
						
					</view>
				</view>
			</scroll-view>
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
				showEmpty:false,
				
				catList: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				
				cart_item_id_list: [],
				
				domain: getApp().globalData.domain,
				default_img: 'this.src="' + require('../../static/default.png') + '"',
				
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
				],
				
				cateDetailAllList:[]
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			
			this.loadData();
			
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			trigger(e) {
				if (e.index === 0) {
					uni.navigateTo({
						url: '../cart/cart'
					});
				}
			},
			
			successCateDetailCb(rsp) {
				console.log('successCateDetailCb');
				if (rsp.data.error === 0) {
					let repList = rsp.data.msg.asset_info;
					
					this.cateDetailAllList = this.cateDetailAllList.concat(repList);
				}
			},
			failCateDetailCb(err) {
				console.log('api_asset failed', err);
			},
			completeCateDetailCb(rsp) {},
			
			requestCateDetailById(id) {
				this.requestWithMethod(
					getApp().globalData.api_asset + id,
					'GET',
					'',
					this.successCateDetailCb,
					this.failCateDetailCb,
					this.completeCateDetailCb
				);
			},
			
			///////////////////////////////////
			
			successCb(rsp) {
				uni.hideLoading();
				if (rsp.data.error === 0) {
					this.catList = rsp.data.msg.commoditycategory;
					
					if(this.catList.length == 0){
						this.showEmpty = true;
						return;
					}
					
					for(var i = 0; i < this.catList.length; i++){
						let cateId = this.catList[i].id;
						this.requestCateDetailById(cateId);
					}
					console.log(this.cateDetailAllList);
					
					this.listCur = this.catList[0];
					this.mainCur = this.catList[0].id;
					
				}
			},
			failCb(err) {
				uni.hideLoading();
				console.log('api_category failed', err);
			},
			completeCb(rsp) {},
			
			loadData() {
				this.requestWithMethod(
					getApp().globalData.api_category,
					'GET',
					'',
					this.successCb,
					this.failCb,
					this.completeCb
				);
			},
			
			
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.catList.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.catList[i].id);
						view.fields({
							size: true
						}, data => {
							console.log(data);
							this.catList[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.catList[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.catList.length; i++) {
					if (scrollTop > this.catList[i].top && scrollTop < this.catList[i].bottom) {
						this.verticalNavTop = (this.catList[i].id - 1) * 50
						this.tabCur = this.catList[i].id
						console.log(scrollTop)
						return false
					}
				}
			}
		},
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>
