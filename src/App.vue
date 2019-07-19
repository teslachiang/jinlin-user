<script lang="ts">
    import Vue from 'vue';
    //import './static/weui.css'
    export default Vue.extend({
        mpType: 'app',
        onLaunch() {
            console.log('App Launch')
            this.$store.dispatch('setAddressList')
        },
        onShow() {
            console.log('App Show')
        },
        onHide() {
            console.log('App Hide')
        }
    });
</script>

<style>
    /*每个页面公共css */
</style>
