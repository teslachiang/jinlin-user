<template>
    <div>
        <app-navbar 
        title="购物车"
        showNavBar=true
        showSearchBar=false></app-navbar>

        <!-- goods in cart list -->
        <div class="goodsList">
            <van-checkbox-group v-model="result">
                <van-panel v-for="(item, i) in goodslist" :key="i">
                <div slot="header" class="van-panel__header">
                    <van-row>
                        <van-col span="8">
                            <van-checkbox :name="item.selectedSkuComb.id"
                            ></van-checkbox></van-col>
                        <van-col span="8" offset="8" class="statusInfo">{{`状态: ${item.selectedSkuComb.stock_num>0?'正常':'失效'}`}}</van-col>
                    </van-row>
                </div>
                <div>
                    <van-card
                            :tag="item.tags.join('/')"
                            :price="item.selectedSkuComb.price * item.selectedSkuComb.discount / 100"
                            :desc="item.skudesc"
                            :title="item.title"
                            :thumb="item.picture"
                            :origin-price="item.selectedSkuComb.price"
                            @click="navToGoodsDetail(item.goodsId, item.selectedSkuComb.id)"
                            >
                    </van-card>
                </div>
                <div slot="footer">
                    <van-row>
                        <van-col span="12" style="text-align: left">
                            <van-stepper integer :max="item.selectedSkuComb.stock_num" 
                                v-model="item.selectedNum" @change="updateCount(item.selectedSkuComb.id, item.selectedNum, item.selectedSkuComb.stock_num)"/>
                            </van-col>
                        <van-col span="12">
                            <van-button size="small" type="danger"
                            @click="deleteSelected(item.goodsId, item.selectedSkuComb.id)">删除</van-button></van-col>
                    </van-row>
                </div>
                </van-panel>
            </van-checkbox-group>
        </div>
        <!-- end of list -->
        <van-submit-bar
        :price="selectedTotalPrice"
        :disabled="!(selectedTotalPrice > 0)"
        button-text="生成订单"
        @submit="onSubmit"
        >
        <van-checkbox v-model="selectedAll">全选</van-checkbox>
        <!-- <span slot="tip">
            你的收货地址不支持同城送, <span>修改地址</span>
        </span> -->
        </van-submit-bar>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        data() {
            return {
                result: [],
                goodslist: [],
                selectedAll: false,
                selectedTotalPrice: 0,
                tmpOrder: null
            }
        },
        onLoad() {
            this.goodslist = this.$store.getters.getCartGoodsSummary
            console.log(this.goodslist);
            
        },
        methods: {
            deleteSelected(id) {
                this.goodslist = this.goodslist.filter(e => e.id !== id)
            },
            navToGoodsDetail(id) {
                this.$router.push('/pages/empty/index')
            },
            computeTotalPrice() {
                const goodslist = this.goodslist.filter(e => this.result.indexOf(e.selectedSkuComb.id) >= 0)
                let prices = goodslist.map(
                    e => e.selectedNum * e.selectedSkuComb.price * (e.selectedSkuComb.discount / 100)
                )
                this.selectedTotalPrice = 0
                console.log('show total:', prices)
                prices.forEach(element => {
                    this.selectedTotalPrice += element
                });
                this.selectedTotalPrice = this.selectedTotalPrice * 100
                this.tmpOrder = {total: this.selectedTotalPrice, 
                                goodsinfo: goodslist}
            },
            updateCount(id, count, total) {
                if(count <= total){
                    this.computeTotalPrice()
                }else{
                    console.log('up to max');
                }
            },
            toggle(index) {
                console.log('show index:', index);
            },
            onSubmit() {
                console.log('submit your selected!!', this.tmpOrder);
                this.$store.dispatch('setOrder', this.tmpOrder)
                this.$router.push('/pages/order/index')
            }
        },
        watch: {
            result(value) {
                console.log('check result', value)
                this.computeTotalPrice(this.goodslist)
            },
            selectedAll(){
                if(this.selectedAll === true){
                    this.result = this.goodslist.map(e => e.selectedSkuComb.id)
                }else{
                    this.result = []
                }
            }
        }
    })
</script>

<style scoped>
    .goodsList{
        margin-top: 8rem;
        position: relative;
		bottom: 5rem;
    }
    .van-panel {
        margin-bottom: 1rem;
    }
    .van-panel__header{
        padding: 10px 0px 11px 13px;
    }
    .van-panel__content{
        padding: 0px;
    }
    .van-panel__footer {
        text-align: right;
    }
    .van-panel__footer .van-button {
        margin-left: 5px;
    }
    .statusInfo{
        font-size: small;
        color: red;
        text-align: right;
        padding-right: 1rem;
    }
    .van-card__footer {
        margin-top: -30px;
        text-align: right;
    }
    .van-submit-bar__bar {
        padding-left: 0.5rem;
    }
</style>