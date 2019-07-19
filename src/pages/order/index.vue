<template>
    <div>
    <app-navbar title="订单确认" showNavBar=true></app-navbar>

    <!-- 联系人卡片 -->
    <van-contact-card
    :type="cardType"
    :name="currentContact.name"
    :tel="currentContact.tel"
    @click="showList = true"
    />

    <!-- 支付方式 -->
    <app-payway :payway='payway' :goodslist='orderinfo' @selectedway='paywaySelected'></app-payway>
    <!-- 联系人列表 -->
    <van-popup v-model="showList" position="bottom">
    <app-addresslist :list="addresslist"
                    from='order'
                    :disabledList="disabledList"
                    :chosenAddressId="chosenAddressId"
                    @updateChosenId="updateChosenIdOrder">
    </app-addresslist>
    </van-popup>

    <van-submit-bar
    :loading="!orderinfo || submittingorder"
    :price="orderinfo.price"
    button-text="提交订单"
    @submit="onSubmitOrder"
    />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        data() {
            return {
                editingContact: {},
                showList: false,
                addresslist: [],
                orderinfo: null,
                payway: 0,
                disabledList: [],
                chosenAddressId: 0,
                submittingorder: false
            }
        },
        onLoad() {
            let list = this.$store.getters.addresslist
                        .filter(e=> e.valid === true)
                        .map(e => {return {address: e.addressDetail, ...e}})
            this.disabledList = this.$store.getters.addresslist.filter(e=> e.valid === false).map(e => {return {address: e.addressDetail, ...e}})
            if(list.find(e => e.isDefault === true) !== null && list.find(e => e.isDefault === true) !== undefined){
                this.chosenAddressId =  list.find(e => e.isDefault === true).id
            }else {
                this.chosenAddressId = null
            }
            this.addresslist = list.map(e => {
                const info = {
                    name: `${e.name} (${e.address})`,
                    id: e.id,
                    tel: e.tel
                }
                return info
            })
            this.orderinfo = this.$store.getters.getOrder
            console.log('orderinfo:', this.orderinfo)
        },
        computed: {
            cardType() {
            return this.chosenAddressId !== null ? 'edit' : 'add';
            },
            currentContact() {
            const id = this.chosenAddressId
            return id !== null ? this.addresslist.filter(item => item.id === id)[0] : {};
            }
        },
        methods: {
            paywaySelected(val) {
                this.payway = val
            },
            updateChosenIdOrder(val) {
                console.log('current chosen id is:', val)
                this.showList = false
                this.chosenAddressId = val
            },
            onSubmitOrder() {
                this.submittingorder = true
                this.orderinfo.status = {name: '已下单', flag: 0}
                let payload = {
                        address: this.currentContact, payway: this.payway,
                        id: Math.floor(Math.random() * 10000000000).toString(),
                        orderinfo: this.orderinfo}
                let p = () => {return new Promise(resolve => {
                    setTimeout(() => {
                        resolve('ok ... get response!')
                        this.submittingorder = false
                        this.$toast('订单提交成功')
                        this.$store.dispatch('updateOrder', payload)
                        this.$router.push("/pages/user/index")
                    }, 3000)
                })}
                // 模拟订单生成
                p().then( (e) => {
                    console.log('promise:', e)
                })
                // 模拟订单被服务器确认
            },
        }
    })
</script>

<style scoped>

</style>
