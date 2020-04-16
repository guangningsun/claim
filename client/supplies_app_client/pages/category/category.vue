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
		
		<view class="contentt">
			<scroll-view scroll-y class="left-aside" >
				<view
					v-for="item in flist"
					:key="item.id"
					class="f-item b-b"
					:class="{ active: item.id === currentId }"
					@click="tabtap(item)">
					{{ item.name }}
				</view>
			</scroll-view>
			<scroll-view
				scroll-with-animation
				scroll-y
				class="right-aside"
				@scroll="asideScroll"
				:scroll-top="tabScrollTop">
				<view v-for="item in slist" :key="item.id" class="s-list" :id="'main-' + item.id">
					<text class="s-item">{{ item.name }}</text>
					<view class="t-list">
						<view
							@click="navToList(item.id, titem.id, titem.name)"
							v-if="titem.parent === item.id"
							class="t-item"
							v-for="titem in tlist"
							:key="titem.id"
						>
							<image :src="titem.image"></image>
							<text>{{ titem.name }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
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
	</view>
	
</template>

<script>
import { uniFab } from '@dcloudio/uni-ui';
export default {
	components: {
		uniFab
	},
	data() {
		return {
			showEmpty:false,
			sizeCalcState: false,
			tabScrollTop: 0,
			currentId: 1,
			flist: [],
			slist: [],
			tlist: [],
			
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

			cateList: []
		};
	},
	
	onLoad() {
		this.loadData();
	},
	
	methods: {
		trigger(e) {
			if (e.index === 0) {
				uni.navigateTo({
					url: '../cart/cart'
				});
			}
		},
		
		successCb(rsp) {
			if (rsp.data.error === 0) {
				this.cateList = rsp.data.msg.commoditycategory;
				
				if(this.cateList.length == 0){
					this.showEmpty = true;
				}
				
				let list = this.cateList;
				list.forEach(item => {
					if (item.parent === '-') {
						this.flist.push(item); //pid为父级id, 没有pid或者pid=0是一级分类
					} else if (item.image === '-') {
						this.slist.push(item); //没有图的是2级分类
					} else {
						item.image = getApp().globalData.domain + item.image;
						this.tlist.push(item); //3级分类
					}
				});
			}
		},
		failCb(err) {
			console.log('api_category failed', err);
		},
		completeCb(rsp) {},
		
		loadData() {
			// let list = await this.$api.json('cateList');
			
			this.requestWithMethod(
				getApp().globalData.api_category,
				'GET',
				'',
				this.successCb,
				this.failCb,
				this.completeCb
			);
		},
		//一级分类点击
		tabtap(item) {
			if (!this.sizeCalcState) {
				this.calcSize();
			}

			this.currentId = item.id;
			let index = this.slist.findIndex(sitem => sitem.parent === item.id);
			this.tabScrollTop = this.slist[index].top;
		},
		//右侧栏滚动
		asideScroll(e) {
			if (!this.sizeCalcState) {
				this.calcSize();
			}
			let scrollTop = e.detail.scrollTop;
			let tabs = this.slist.filter(item => item.top <= scrollTop).reverse();
			if (tabs.length > 0) {
				this.currentId = tabs[0].parent;
			}
		},
		//计算右侧栏每个tab的高度等信息
		calcSize() {
			let h = 0;
			this.slist.forEach(item => {
				let view = uni.createSelectorQuery().select('#main-' + item.id);
				view.fields(
					{
						size: true
					},
					data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}
				).exec();
			});
			this.sizeCalcState = true;
		},
		navToList(sid, tid, tname) {
			uni.navigateTo({
				url: `/pages/category/category_detail_list?fid=${this.currentId}&sid=${sid}&tid=${tid}&tname=${tname}`
			});
		}
	}
};
</script>

<style lang="scss">
page,
.contentt {
	height: 100%;
	background-color: #f8f8f8;
}

.contentt {
	display: flex;
}
.left-aside {
	flex-shrink: 0;
	width: 200upx;
	height: 100%;
	background-color: #fff;
}
.f-item {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100upx;
	font-size: 28upx;
	color: $font-color-base;
	position: relative;
	&.active {
		color: $base-color;
		background: #f8f8f8;
		&:before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			height: 36upx;
			width: 8upx;
			background-color: $base-color;
			border-radius: 0 4px 4px 0;
			opacity: 0.8;
		}
	}
}

.right-aside {
	flex: 1;
	overflow: hidden;
	padding-left: 20upx;
}
.s-item {
	display: flex;
	align-items: center;
	height: 70upx;
	padding-top: 8upx;
	font-size: 28upx;
	color: $font-color-dark;
}
.t-list {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	background: #fff;
	padding-top: 12upx;
	&:after {
		content: '';
		flex: 99;
		height: 0;
	}
}
.t-item {
	flex-shrink: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 176upx;
	font-size: 26upx;
	color: #666;
	padding-bottom: 20upx;

	image {
		width: 140upx;
		height: 140upx;
	}
}
</style>
