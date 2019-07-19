<template>
    <div v-if="loading">
        <van-skeleton
            title
            avatar
            :row="3"
            :loading="loading"
        />
    </div>
    <div v-else>
        <app-navbar
        showNavBar=true
        showSearchBar=false>
        <template title="" slot="vtitle" slot-scope="props">
            <div>
                <van-tabs @click="onClickTopTab"
                type="card" color="#8ebbe4">
                <van-tab title="商品"></van-tab>
                <van-tab title="评价"></van-tab>
                <van-tab title="详情"></van-tab>
                </van-tabs>
            </div>
        </template>
        </app-navbar>
        <div><app-desc :goods="goods.goods_info"></app-desc></div>
        <div class="commentBlock" ref="comment"><app-comments></app-comments></div>
        <div class="detailBlock" ref="detail"><app-detail></app-detail></div>
        <div class="sku-container">
            <van-sku
            hide-quota-text
            v-model="showSKUBoard"
            :sku="skuData.sku"
            :goods="skuData.goods_info"
            :goods-id="skuData.goods_id"
            :hide-stock="skuData.sku.hide_stock"
            :quota="skuData.quota"
            :quota-used="skuData.quota_used"
            :custom-stepper-config="customStepperConfig"
            :message-config="messageConfig"
            :show-soldout-sku="false"
            @buy-clicked="onBuyClicked"
            @add-cart="onAddCartClicked"
            />
        </div>

        <div>
            <van-goods-action>
            <van-goods-action-icon
                icon="chat-o"
                text="客服"
                @click="onClickIcon"
            />
            <van-goods-action-icon
                icon="cart-o"
                text="购物车"
                :info="goodsInCart"
                @click="onClickCart"
            />
            <van-goods-action-button
                type="warning"
                text="加入购物车"
                @click="showSKUBoard=true"
            />
            <van-goods-action-button
                type="danger"
                text="立即购买"
                @click="showSKUBoard=true"
            />
            </van-goods-action>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        data() {
            return {
                goods: null,
                skuData: null,
                showSKUBoard: false,
                closeOnClickOverlay: false,
                customStepperConfig: {
                    quotaText: '单次限购100件',
                    stockFormatter: (stock) => `剩余${stock}件`,
                    handleOverLimit: (data) => {
                        const { action, limitType, quota } = data;
                        if (action === 'minus') {
                            this.$toast('至少选择一件商品');
                        } else if (action === 'plus') {
                            if (limitType === 0) {
                            this.$toast(`限购${quota}件`);
                            } else {
                            this.$toast('库存不够了');
                            }
                        }
                    }
                },
                messageConfig: {
                    uploadImg: (file, img) => new Promise(resolve => {
                        setTimeout(() => resolve(img), 1000);
                    }),
                    uploadMaxSize: 3
                }
            }
        },
        onLoad() {
            console.log('empty onload');
            this.$store.dispatch('setCurGoods', '946755');
            this.goods = this.$store.getters.curGoods
            this.skuData = this.goods
            console.log('curGoods', this.goods)
            this.$store.dispatch('setLoading', false)
        },
        computed: {
            loading() {
                return this.$store.getters.getLoading
            },
            goodsInCart() {
                return this.$store.getters.countOfCartsGoods
            }
        },
        methods: {
            onClickTopTab(index, title){
                console.log(index, title);
                if(index === 0){
                    window.scrollTo(0, 0)
                }else if(index === 1) {
                    // comments
                    let comment = this.$refs['comment']
                    window.scrollTo(0, comment.offsetTop)
                }else{
                    let detail = this.$refs['detail']
                    window.scrollTo(0, detail.offsetTop)
                }
            },
            onClickCart(data) {
                this.$router.push('/pages/cart/index')
            },
            onBuyClicked(data) {
                console.log(data);
                this.$store.dispatch('setOrder', 
                {total: data.selectedNum * data.selectedSkuComb.price * data.selectedSkuComb.discount, 
                goodsinfo: [{...data, ...this.goods.goods_info}]})
                this.$router.push('/pages/order/index')
            },
            onAddCartClicked(data) {
                console.log(data);
                this.$store.dispatch('setWarningMessage', '')
                this.$store.dispatch('addGoods2Cart', data)
                if (this.$store.getters.getWarningMessage !== ''){
                    this.$toast(this.$store.getters.getWarningMessage)
                } else {
                    this.showSKUBoard = false
                }
            }
        }
    })
</script>

<style lang="less" scoped>
    .van-tabs--card{
        margin-top: 10px;
    }
    .van-goods-action {
        z-index: 999;
    }
    .detailBlock{
        margin-bottom: 4rem; 
    }
</style>
