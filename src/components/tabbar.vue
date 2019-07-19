<template>
    <div>
        <van-tabbar :value="activeValue" 
        :active-color="activecolor">
		<van-tabbar-item 
        :name="item.name" 
        :icon="item.icon"
        :to="item.link"
        v-for="(item, i) in items"
        :key="i">
        {{item.content}}
        </van-tabbar-item>
		</van-tabbar>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: ['active'],
        data() {
            return {
                activecolor: '#ff0033',
                items: [
                    {name: 'home', content: '首页', link: '/', icon: 'home-o'},
                    {name: 'category', content: '分类', link: '/pages/category/index', icon: 'apps-o'},
                    {name: 'cart', content: '购物车', link: '/pages/cart/index', icon: 'cart-o'},
                    {name: 'user', content: '用户', link: '/pages/user/index', icon: 'user-o'}
                ]
            }
        },
        computed: {
            activeValue () {
                if(this.active === null || this.active === undefined){
                    return 'home'
                }
                return this.active
            }
        }
    })
</script>

<style scoped>

</style>