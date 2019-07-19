<template>
    <div>
        <div>
            <van-cell :value="total" is-link :to="link">
                <template slot="title">
                    <span>评论</span>
                    <van-rate v-model="stars" />
                </template>
            </van-cell>
            <van-panel v-for="(comment, i) in latest.slice(5)"
                :key="i">
                <template slot="header">
                    <van-row style="padding:5px">
                        <van-col span="2"><img class="userShortcut" v-lazy="comment.shortcut"></van-col>
                        <van-col span="4" style="font-size:small;padding-top:5px;">{{comment.user}}</van-col>
                        <van-col span="6"><van-rate :value="comment.star" :size="10" /></van-col>
                        <van-col span="12" class="commentDate">{{comment.date}}</van-col>
                    </van-row>
                </template>
                <div style="font-size:smaller;padding:10px;">{{comment.content}}</div>
            </van-panel>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        data() {
            return {
                title: '评价',
                stars: 4,
                total: '共1230条评论',
                link: '/abc',
                latest: [
                    {user: 'user1', shortcut: 'https://picsum.photos/id/1069/100/100', date: '2019-02-09', star: 4, content: '这个好！！！！！！'},
                    {user: 'user2', shortcut: 'https://picsum.photos/id/1068/100/100', date: '2019-02-09', star: 2, content: '这个好，我我降火的！！！！！！'},
                    {user: 'user3', shortcut: 'https://picsum.photos/id/107/100/100', date: '2019-02-09', star: 3, content: '这个好， 是这样么？？'},
                    {user: 'user4', shortcut: 'https://picsum.photos/id/1071/100/100', date: '2019-02-09', star: 5, content: '这个好，我买了23个'},
                    {user: 'user5', shortcut: 'https://picsum.photos/id/1072/100/100', date: '2019-02-09', star: 2, content: '也就这样吧'},
                    {user: 'user6', shortcut: 'https://picsum.photos/id/1073/100/100', date: '2019-02-09', star: 4, content: '这个好！！！！！！'},
                    {user: 'user7', shortcut: 'https://picsum.photos/id/1074/100/100', date: '2019-02-09', star: 5, content: '这个好！！！！！！'},
                    {user: 'user8', shortcut: 'https://picsum.photos/id/1075/100/100', date: '2019-02-09', star: 3, content: '这个好！！！！！！'},
                    {user: 'user9', shortcut: 'https://picsum.photos/id/1076/100/100', date: '2019-02-09', star: 1, content: '这个好！！！！！！'},
                    {user: 'user10', shortcut: 'https://picsum.photos/id/1078/100/100', date: '2019-02-09', star: 3, content: '这个好！！！！！！'},
                ]
            }
        },
    })
</script>

<style scoped>
    .van-cell__title{
        display: flex;
    }
    .commentDate{
        font-size:small;
        color: gray;
        padding: 5px 5px 0px 0px;
        text-align:right
    }
    .userShortcut{
        width: 25px;
        border-radius: 50%;
    }
</style>