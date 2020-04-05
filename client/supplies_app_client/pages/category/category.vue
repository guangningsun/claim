<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<block slot="content">物品分类</block>
		</cu-custom>
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

			cateList: [
				//一级标题
				{
					id: 1,
					name: '手机数码'
				},
				{
					id: 2,
					name: '礼品鲜花'
				},
				{
					id: 3,
					name: '男装女装'
				},
				{
					id: 4,
					name: '母婴用品'
				},
				//二级标题，pid为父级id
				{
					id: 5,
					pid: 1,
					name: '手机通讯'
				},
				{
					id: 6,
					pid: 1,
					name: '运营商'
				},
				{
					id: 17,
					pid: 2,
					name: '礼品'
				},
				{
					id: 18,
					pid: 2,
					name: '鲜花'
				},
				{
					id: 25,
					pid: 3,
					name: '男装'
				},
				{
					id: 26,
					pid: 3,
					name: '女装'
				},
				{
					id: 33,
					pid: 4,
					name: '奶粉'
				},
				{
					id: 34,
					pid: 4,
					name: '营养辅食'
				},
				{
					id: 35,
					pid: 4,
					name: '童装'
				},
				{
					id: 39,
					pid: 4,
					name: '喂养用品'
				},

				//三级标题
				{
					id: 8,
					pid: 5,
					name: '全面屏手机',
					picture: '/static/temp/cate2.jpg'
				},
				{
					id: 9,
					pid: 5,
					name: '游戏手机',
					picture: '/static/temp/cate3.jpg'
				},
				{
					id: 10,
					pid: 5,
					name: '老人机',
					picture: '/static/temp/cate1.jpg'
				},
				{
					id: 11,
					pid: 5,
					name: '拍照手机',
					picture: '/static/temp/cate4.jpg'
				},
				{
					id: 12,
					pid: 5,
					name: '女性手机',
					picture: '/static/temp/cate5.jpg'
				},
				{
					id: 14,
					pid: 6,
					name: '合约机',
					picture: '/static/temp/cate1.jpg'
				},
				{
					id: 15,
					pid: 6,
					name: '选好卡',
					picture: '/static/temp/cate4.jpg'
				},
				{
					id: 16,
					pid: 6,
					name: '办套餐',
					picture: '/static/temp/cate5.jpg'
				},
				{
					id: 19,
					pid: 17,
					name: '公益摆件',
					picture: '/static/temp/cate7.jpg'
				},
				{
					id: 20,
					pid: 17,
					name: '创意礼品',
					picture: '/static/temp/cate8.jpg'
				},
				{
					id: 21,
					pid: 18,
					name: '鲜花',
					picture: '/static/temp/cate9.jpg'
				},
				{
					id: 22,
					pid: 18,
					name: '每周一花',
					picture: '/static/temp/cate10.jpg'
				},
				{
					id: 23,
					pid: 18,
					name: '卡通花束',
					picture: '/static/temp/cate11.jpg'
				},
				{
					id: 24,
					pid: 18,
					name: '永生花',
					picture: '/static/temp/cate12.jpg'
				},

				{
					id: 27,
					pid: 25,
					name: '男士T恤',
					picture: '/static/temp/cate13.jpg'
				},
				{
					id: 28,
					pid: 25,
					name: '男士外套',
					picture: '/static/temp/cate14.jpg'
				},
				{
					id: 29,
					pid: 26,
					name: '裙装',
					picture: '/static/temp/cate15.jpg'
				},
				{
					id: 30,
					pid: 26,
					name: 'T恤',
					picture: '/static/temp/cate16.jpg'
				},
				{
					id: 31,
					pid: 26,
					name: '上装',
					picture: '/static/temp/cate15.jpg'
				},
				{
					id: 32,
					pid: 26,
					name: '下装',
					picture: '/static/temp/cate16.jpg'
				},
				{
					id: 36,
					pid: 33,
					name: '有机奶粉',
					picture: '/static/temp/cate17.jpg'
				},
				{
					id: 37,
					pid: 34,
					name: '果泥/果汁',
					picture: '/static/temp/cate18.jpg'
				},
				{
					id: 39,
					pid: 34,
					name: '面条/粥',
					picture: '/static/temp/cate20.jpg'
				},
				{
					id: 42,
					pid: 35,
					name: '婴童衣橱',
					picture: '/static/temp/cate19.jpg'
				},
				{
					id: 43,
					pid: 39,
					name: '吸奶器',
					picture: '/static/temp/cate21.jpg'
				},
				{
					id: 44,
					pid: 39,
					name: '儿童餐具',
					picture: '/static/temp/cate22.jpg'
				},
				{
					id: 45,
					pid: 39,
					name: '牙胶安抚',
					picture: '/static/temp/cate23.jpg'
				},
				{
					id: 46,
					pid: 39,
					name: '围兜',
					picture: '/static/temp/cate24.jpg'
				}
			]
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
