<template>
    <div>
	<img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png">
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" @click="waitForPay"/>
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records" @click="waitForBill" />
        待接单
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" @click="waitForTransfer" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" @click="billTransfered" />
        已发货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link 
                to="/pages/order/orderstatus" />
      <van-cell icon="points" title="完成订单" is-link 
                to="/pages/order/orderstatus?type=5" />
    </van-cell-group>
    <van-cell-group>
      <van-cell icon="hotel-o" title="地址管理" is-link to='/pages/Address/addresslist' />
    </van-cell-group>
    <app-tabbar active='user'></app-tabbar>
    </div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
    methods: {
      waitForPay() {
        this.$router.push('/pages/order/orderstatus?type=1')
      },
      waitForTransfer() {
        this.$router.push('/pages/order/orderstatus?type=2')
        console.log('on transfer');
      },
      waitForBill(){
        this.$router.push('/pages/order/orderstatus?type=3')
      },
      billTransfered() {
        this.$router.push('/pages/order/orderstatus?type=4')
      },

    }
	}

</script>

<style lang="less" scoped>
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }
  &-group {
    margin-bottom: 15px;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
