<template>
    <div>
        <van-collapse v-model="activeNames">
        <van-collapse-item
            title="支付方式"
            name="1"
            icon="balance-pay"
            :value="showPayway"
        >
            <van-radio-group v-model="radio">
                <van-cell-group>
                    <van-cell :title="pay.name" v-for="(pay, i) in paywaylist" clickable @click="radioClick">
                    <van-radio slot="right-icon" :name="i" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-collapse-item>

        <van-collapse-item
            title="订单商品"
            name="2"
            icon="balance-list-o"
            :value="`共${goodslist.counts}件`"
        >
            <van-card
            v-for="(item, i) in goodslist.goodslist"
            :num="item.selectedNum"
            :tag="item.tags?item.tags.join('/'):''"
            :price="item.selectedSkuComb.price * item.selectedSkuComb.discount / 100"
            :desc="item.skudesc"
            :title="item.title"
            :thumb="item.picture"
            :origin-price="item.selectedSkuComb.price"
            />
        </van-collapse-item>
        <van-collapse-item
            title="发票"
            name="3"
            icon="coupon-o"
        >
        需要开发票，请联系卖家！
        </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: ['payway', 'goodslist'],
        data() {
            return {
                activeNames: ['2'],
                radio: this.payway,
                goodsCounts: 10,
                paywaylist: [{
                    id: 0,
                    name: '微信支付'
                },
                {
                    id: 1,
                    name: '货到付款'
                }]
            }
        },
        computed: {
            showPayway(){
                let seleced = this.paywaylist.find(e => e.id === this.radio)
                if (seleced) {
                    return seleced.name
                } else {
                    console.log('error: can not find select payway')
                }
            }
        },
        methods: {
            radioClick(val){
                console.log('clck with:', this.radio)
                this.activeNames = ['0']
            }
        },
    })
</script>

<style scoped>
.van-collapse-item {
    margin: 20px 0 20px 0;
}
</style>