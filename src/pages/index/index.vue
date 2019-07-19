<template>
	<view class="content">
		<app-navbar 
        showNavBar=false
        showSearchBar=true></app-navbar>

        <van-swipe class="swipImage" :autoplay="3000" indicator-color="grey">
		<van-swipe-item v-for="(item, i) in posterItems" :key=i @click="clickItem(item.id)">
			<van-image :src="item.link" fit="contain" height="9rem"></van-image>
		</van-swipe-item>
		</van-swipe>

		<div class="goodsListBlock">
			<div v-for="(block, i) in blocks" :key="i">
				<van-cell :title="block.title" value="更多" is-link :to="link" />
				<div v-for="(good, k) in block.list" :key="k" class="moduleBlock">
					<van-card
					:tag="block.title"
					:price="good.new_price"
					:desc="good.descWords"  
					:title="good.name"
					:thumb="good.image"
					:origin-price="good.price"
					@click="navToGoodsDetail(good.id)"
					>
					</van-card>
				</div>
			</div>
			<div class="footer">这里是底了</div>
		</div>
		<app-tabbar></app-tabbar>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue'
	export default Vue.extend({
		data() {
			return {
				link: 'pages/empty/index',
				value: 'default',
				blocks: null,
				posterItems: null
			}
		},
		onLoad() {
			setTimeout(() => {
				console.log("start pulldown")
			}, 1000)
			uni.startPullDownRefresh()
			this.$store.dispatch('setHomeSwips')
			this.$store.dispatch('setHomeGoodsModule')
		},
		onPullDownRefresh() {
			console.log('refresh now!!!')
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
			this.posterItems = this.$store.getters.getHomeSwips
			this.blocks = this.$store.getters.getHomeGoodsModule
		},
		methods: {
			navToGoodsDetail(id) {
				console.log('nav to good detail with id:', id);
				
				this.$router.push('/pages/empty/index')
			},
			clickItem(itemid) {
				console.log(`you seleced: ${itemid}`)
			}
		}
	});
</script>

<style lang="less">
	.content {
		position: relative;
		height: 400upx;
	}
	.goodsListBlock{
		position: relative;
		bottom: 3rem;
	}
	.footer {
		text-align: center;
		color: grey;
		font-size: x-small;
	}
    .goodsname {
		font-size: 0.9rem;
		display: block;
		padding-left: 0.5rem;
	}
	.newprice {
		position: absolute;
		bottom: 1rem;
		font-weight: bold;
		display: block;
		padding-left: 0.5rem;
		color: red;
	}
	.oldprice {
		color: gray;
		text-decoration: line-through grey;
		padding-left: 0.5rem;
		font-size: small
	}
	.goodsdesc {
		font-size: small;
		color: gray;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding-left: 0.5rem;
	}
	&-item {
		cursor: pointer;
		color: white;
		font-size: 20px;
		line-height: 150px;
		text-align: center;
		&:nth-child(even) {
			background-color: #39a9ed;
		}
		&:nth-child(odd) {
			background-color: #66c6f2;
		}
	}
	.swipImage {
		top: 2rem;
		margin-bottom: 4.5rem;
	}
</style>
