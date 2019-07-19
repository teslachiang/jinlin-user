<template>
    <div>
        <van-swipe :autoplay="3000" indicator-color="white" :height="height">
            <van-swipe-item v-for="(image, index) in goods.imageList" :key="index">
                <img v-lazy="image" :style="`height: ${height}px`">
                <!-- <van-image :src="image" fit="contain" height="9rem"></van-image> -->
            </van-swipe-item>
        </van-swipe>
        <van-cell-group>
        <van-cell>
            <van-tag class="goods-tag" type="danger" 
                    v-for="(tag, index) in goods.tags" :key="index">{{tag}}
            </van-tag>
            <div class="goods-title">{{ goods.title }}</div>
            <div class="goods-price">{{ formatPrice(goods.price) }}
                <span class="originPrice"
                    v-if="goods.origin_price !== null && goods.origin_price !== ''">{{goods.origin_price}}
                </span>
            </div>
        </van-cell>
        <van-cell class="goods-express">
            <van-col span="10">运费：{{ goods.express }}</van-col>
            <van-col span="14" v-if="goods.renamn !== null && goods.remain !== undefined">剩余：{{ goods.remain }}</van-col>
        </van-cell>
        </van-cell-group>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Lazyload } from 'vant';
    export default Vue.extend({
        props: ['goods'],
        data() {
            return {
                height: 220
            }
        },
        computed: {
            loading() {
                return this.$store.getters.getLoading
            }
        },
        methods: {
            formatPrice() {
                return '¥' + (this.goods.price / 100).toFixed(2);
            },
        }
    })
</script>

<style scoped>
    .originPrice{
        font-style: italic;
        color: gray;
        margin-left: 5px;
        font-size: small;
        text-decoration: line-through;
    }
    .goods-price {
        color: red;
        font-weight: bold;
        font-size: medium;
    }
    .goods-tag {
        margin-right: 5px;
    }
</style>