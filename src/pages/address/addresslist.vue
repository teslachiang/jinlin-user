<template>
    <div>
    <app-navbar title="地址列表"
        showNavBar=true
        leftback=true
        ></app-navbar>
    <app-addresslist :list="list" :disabledList="disabledList"
                    :chosenAddressId="chosenAddressId" @updateChosenId="updateChosenId"></app-addresslist>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        data() {
            return {
                list: [],
                disabledList: [],
                chosenAddressId: 0,
            }
        },
        onLoad() {
            this.list = this.$store.getters.addresslist
                        .filter(e=> e.valid === true)
                        .map(e => {return {address: e.addressDetail, ...e}})
            this.disabledList = this.$store.getters.addresslist.filter(e=> e.valid === false).map(e => {return {address: e.addressDetail, ...e}})
            if(this.list.find(e => e.isDefault === true) !== null && this.list.find(e => e.isDefault === true) !== undefined){
                this.chosenAddressId =  this.list.find(e => e.isDefault === true).id
            }else {
                this.chosenAddressId = -1
            }
            console.log('parent layer:', this.chosenAddressId)
        },
        methods: {
            updateChosenId(val) {
                console.log('current chosen id is:', val)
            }
        },
    })
</script>

<style scoped>

</style>