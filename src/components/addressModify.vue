<template>
    <div>
    <van-address-edit
    :area-list="areaList"
    show-postal
    :address-info="address"
    :show-delete=isModify
    show-set-default
    show-search-result
    :search-result="searchResult"
    @save="onSave"
    @delete="onDelete"
    @change-detail="onChangeDetail"
    />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        props: ['isModify', 'address'],
        data() {
            return {
                areaList: {province_list: {
                    110000: '朝阳区',
                    120000: '海淀区',
                    130000: '丰台区',
                    140000: '石景山区',
                    150000: '通州区',
                    160000: '怀柔区',
                    170000: '东城区',
                    180000: '西城区',
                    190000: '朝阳区',
                },
                city_list: {
                    110100: '双合家园1',
                    110200: '双合家园2',
                    110300: '双合家园3',
                    120100: '海淀家园1',
                    120200: '海淀家园2',
                    120300: '海淀家园3',
                    130100: '双合家园11',
                    130200: '双合家园21',
                    130300: '双合家园31',
                    140100: '双合家园-1',
                    140200: '双合家园-2',
                    140300: '双合家园-3',
                    150100: '双合家园1',
                    150200: '双合家园2',
                    150300: '双合家园3',
                    160100: '双合家园1',
                    160200: '双合家园2',
                    160300: '双合家园3',
                    170100: '双合家园1',
                    170200: '双合家园2',
                    170300: '双合家园3',
                    180100: '双合家园1',
                    180200: '双合家园2',
                    180300: '双合家园3',
                    190100: '双合家园1',
                    190200: '双合家园2',
                    190300: '双合家园3',
                }},
                searchResult: []
            }
        },
        onLoad() {
        },
        methods: {
            onSave(item) {
                if(this.isModify){
                    this.$store.dispatch('updateAddress', item)
                } else {
                    this.$store.dispatch('addAddress2List', item)
                }
                this.$toast('saved');
                if(this.$route.query.from === 'order') {
                    this.$router.push('/pages/order/index')
                } else {
                    this.$router.push('/pages/address/addresslist')
                }
            },
            onDelete() {
                console.log('delete');
                this.$toast('delete');
            },
            onChangeDetail(val) {
                this.searchResult = val ? this.searchResult : [];
            }
        }
    })
</script>

<style scoped>

</style>