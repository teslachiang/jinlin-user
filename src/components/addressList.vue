<template>
    <div>
        <van-address-list
        v-model="chosenId"
        :list="list"
        :disabled-list="disabledList"
        :disabled-text="disabledText"
        @add="onAdd"
        @edit="onEdit"
        />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: ['list', 'from',
                'disabledList',
                'chosenAddressId'],
        data() {
            return {
                add: '新增地址',
                edit: '编辑地址',
                disabledText: '以下地址超出配送范围',
                chosenId: this.chosenAddressId
            }
        },
        onLoad() {
            //console.log('check updated', this.$store.getters.addresslist);
            //this.$store.dispatch('setAddressList')
        },
        watch:{
            chosenId(val){
                console.log('watch: ', val)
                this.$emit('updateChosenId', val)
                return this.chosenAddressId
            }
        },
        methods: {
            onAdd() {
                if(this.from === 'order'){
                    this.$router.push('/pages/address/addressmodify?type=new&from=order')
                } else {
                    this.$router.push('/pages/address/addressmodify?type=new')
                }
            },
            onEdit(item, index) {
                console.log(item);
                if(this.from === 'order'){
                    this.$router.push('/pages/address/addressmodify?id='+item.id+'&from=order')
                }else{
                    this.$router.push('/pages/address/addressmodify?id='+item.id)
                }
            }
        }
    })
</script>

<style scoped>

</style>