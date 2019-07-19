<template>
    <div v-if="isShowNavBar">
        <van-nav-bar
            fixed
            left-text="返回"
            left-arrow
            @click-left="onClickLeft">
            <template slot="title">
                <div v-if="title!==null">{{title}}</div>
                <slot name="vtitle" :tabclick="tabclick"></slot>
            </template>
        </van-nav-bar>
        <div v-if="!isShowSearchBar" style="margin-bottom:3rem"></div>
        <div v-if="isShowSearchBar" class="searchBar" style="position: relative; top:2rem;">
            <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            @search="onSearch"
            >
            <div slot="action" @click="onSearch">搜索</div>
            </van-search>
        </div>
    </div>
    <div v-else>
        <div v-if="isShowSearchBar" class="searchBar" style="position: fixed; top:0; width:100%">
        <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
        >
        <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        </div>
        <div v-if="isShowSearchBar" style="margin-bottom:1.2rem"></div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: ['title', 'vtitle', 'showNavBar', 'showSearchBar', 'leftback'],
        data() {
            return {
                value: '',
            }
        },
        onLoad () {
        },
        methods: {
            tabclick(index, title) {
                // drop it!!
                this.$toast(`check...tab click: ${index}, ${title}`);
            },
            onClickLeft() {
                if(this.leftback){
                    this.$router.push('/pages/user/index')
                } else {
                    this.$toast('back')
                    this.$router.go(-1)
                }
                
            },
            onSearch(){
                console.log(`search value is ${this.value}`);
            }
        },
        computed: {
            isShowNavBar() {
                return this.showNavBar === 'true'
            },
            isShowSearchBar() {
                return this.showSearchBar === 'true'
            }
        }
    })
</script>

<style>
    .searchBar {
		width: 100%;
		z-index: 9999;
	}
</style>