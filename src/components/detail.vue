<template>
    <div>
        <van-tabs v-model="active">
        <van-tab :title="item.label" v-for="(item, i) in items" :key="i">
            <div class="tabContent" v-html="item.content"></div></van-tab>
        </van-tabs>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        data() {
            return {
                active: 0,
                items: [
                    {label: '商品介绍', content: `<img src="https://picsum.photos/id/1069/500/800" />
                    <img src="https://picsum.photos/id/1071/500/800" />
                    <img src="https://picsum.photos/id/1072/500/800" />
                    <img src="https://picsum.photos/id/1073/500/800" />
                    <img src="https://picsum.photos/id/1074/500/800" />`},
                    {label: '规格参数', content: `<table>
        <tr>
            <td>a</td>
            <td>b</td>
        </tr>
        <tr>
            <td>a</td>
            <td>b</td>
        </tr>
    </table>`},
                    {label: '售后保障', content: '<p>yes...</p>'},
                    ]
            }
        },
    })
</script>

<style scoped>
.tabContent {
    text-align: center;
    padding: 10px 0 0 0;
}
.tabContent >>> img {
    width: 98%;
}
</style>