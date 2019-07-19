<template>
    <div>
        <app-navbar 
        :title="title"
        showNavBar=true
        leftback=true
        showSearchBar=false></app-navbar>

        <van-tabs v-model="activeName">
            <van-tab :title="tab.title" :name="tab.name"
                    v-for="(tab, i) in tabs" :key='i'>
                <van-panel v-if="activeName === 0 || (orderinfo.orderinfo.status.flag+1) === activeName" 
                    v-for="(orderinfo, i) in orderlist" :key="i">
                    <div slot="header" class="van-panel__header">
                        <van-row style="font-size:smaller;font-weight:lighter;padding: 5px 10px 0px 10px;">
                            <van-col span="16">
                            订单号: {{orderinfo.id}} - {{orderinfo.orderinfo.status.name}}
                            </van-col>
                            <van-col span="8" style="text-align:right">{{orderinfo.orderinfo.date}}</van-col>
                        </van-row>
                    </div>
                    <div>
                        <van-card v-for="item in orderinfo.orderinfo.goodslist"
                                :tag="item.tags.join('/')"
                                :num="item.selectedNum"
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
                        <van-steps :active="orderinfo.orderinfo.status.flag">
                        <van-step>买家下单</van-step>
                        <van-step>商家接单</van-step>
                        <van-step>商家提货</van-step>
                        <van-step>商家发货</van-step>
                        <van-step>交易完成</van-step>
                        </van-steps>
                        <van-row>
                            <van-col span="20" class="orderPrice" style="text-align: left">
                            共计{{orderinfo.orderinfo.counts}}件商品 合计 ￥{{orderinfo.orderinfo.price/100}}
                                </van-col>
                            <van-col span="4">
                                <van-button v-if="orderinfo.orderinfo.status.flag === 4" 
                                    round plain hairline size="small" type="danger"
                                    @click='inputComments(orderinfo.id)'
                                    >评价</van-button>
                            </van-col>
                        </van-row>
                    </div>
                </van-panel>
            </van-tab>
        </van-tabs>
        <van-dialog v-model="popupcomments" title="发布评论" show-cancel-button
            confirm-button-text="发布" @confirm="inputComments"
            :before-close="beforeClose">
            <van-row style="padding: 15px">
            <van-col span="12">综合评分</van-col>
            <van-col span="12"><van-rate v-model="commentStars" /></van-col>
            </van-row>        
            <van-field
                v-model="commentMessage"
                type="textarea"
                placeholder="请输入评论"
                rows="3"
            />
        </van-dialog>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        data() {
            return {
                title: '订单管理',
                activeName: 0,
                orderlist: [],
                popupcomments: false,
                currentOrderId: '',
                commentStars: 0,
                commentMessage: '',
                tabs: [
                    {title: '全部订单', name: "allpay", content: '内容 all'},
                    {title: '待付款', name: "waitpay", content: '内容1'},
                    {title: '待接单', name: "waitprocess", content: '内容2'},
                    {title: '待发货', name: "waittransfer", content: '内容3'},
                    {title: '已发货', name: "hastransfer", content: '内容4'},
                    {title: '已完成', name: "complete", content: '内容5'},
                ]
            }
        },
        onLoad(){
            this.activeName = this.$route.query.type
            this.orderlist = this.$store.getters.getOrderList
            console.log('order list:', this.orderlist)
        },
        methods: {
            checkCommentisValid(val){
                let pt = /\s/g
                return val.replace(pt, '').length > 0
            },
            inputComments(val){
                this.popupcomments = true
                this.currentOrderId = val
                if(this.checkCommentisValid(this.commentMessage) === false){
                    this.$toast('please input correct content')
                }
                console.log('orderid :', val)
            },
            beforeClose(action, done) {
                if (action === 'confirm') {
                    let flag = this.checkCommentisValid(this.commentMessage)
                    setTimeout(done(flag), 1000);
                    if(flag) {
                        this.commentMessage = ''
                        this.commentStars = 0
                    }
                } else {
                    done();
                }
            }
        },
    })
</script>

<style scoped>
    .orderPrice{
        text-align: left;
        /* color: gray; */
        line-height: 32px;
        font-size: smaller;
        font-weight: lighter;
    }
</style>
