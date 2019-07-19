<template>
    <div>
    <app-navbar title="编辑地址" showNavBar=true></app-navbar>
    <app-addressmodify :address="address" :isModify="isModify"></app-addressmodify>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        data() {
            return {
                address: null,
                isModify: true
            }
        },
        onLoad() {
            if(this.$route.query.type && this.$route.query.type === 'new'){
                this.isModify = false
                this.address = {}
            }else{
                let addressid = this.$route.query.id
                this.address = this.$store.getters.getAddressById(addressid)
                console.log(this.address);
            }
        }
    })
</script>

<style scoped>

</style>