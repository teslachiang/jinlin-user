<template>
    <div>
    <van-rate v-model="stars" />
    <van-field
        v-model="message"
        label="评论"
        type="textarea"
        placeholder="请输入评论"
        rows="3"
    />
    <van-button type="info" @click="submitComments">发布</van-button>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: ['id'],
        data() {
            return {
                stars: 0,
                message: ''
            }
        },
        methods: {
            submitComments(){

            }
        },
    })
</script>

<style scoped>

</style>