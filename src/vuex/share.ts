import sampleSKUData from './sample';

export default {
  state: {
    homeSwips: [],
    homeGoodsModule: [],
    sampleSKU: sampleSKUData,
    curgoods: null,
    loading: true,
    cartGoods: [{cartMessages: null,
    goodsId: '946755', messages: [], selectedNum: 2,
    selectedSkuComb: {
        id: 2258,
        price: 100,
        discount: 80,
        code: '',
        s1: '30349',
        s2: '1194',
        s3: '0',
        s4: '0',
        s5: '0',
        stock_num: 2,
        goods_id: 946755,
    }
    }],
    orderinfo: null,
    orderList: [],
    warnmessage: '',
    addressList: [],
  },
  mutations: {
    setWarningMessage(state, payload) {
      state.warnmessage = payload;
    },
    setHomeSwips(state, payload) {
      state.homeSwips = payload;
    },
    setHomeGoodsModule(state, payload) {
      state.homeGoodsModule = payload;
    },
    setCurGoods(state, payload) {
      state.curgoods = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    add2Cart(state, payload) {
      const i = state.cartGoods.findIndex(e => e.id === payload.id && e.selectedSkuComb.stock_num === payload.selectedSkuComb.stock_num);
      if (i === -1) {
        state.warnmessage = '';
        state.cartGoods.push(payload);
      } else {
        state.warnmessage = '该商品已经在您的购物车中';
      }
    },
    setOrder(state, payload) {
      state.orderinfo = payload
    },
    updateOrder(state, payload){
      console.log('update order......')
      let index = state.orderList.findIndex(e => e.id === payload.id)
      if (index > -1) {
        state.orderList[index] = payload
      }else{
        state.orderList.push(payload)
      }
      console.log(state.orderList)
    },
    updateAddress(state, payload){
      state.addressList.forEach((element, i) => {
        if(element.id === payload.id){
          state.addressList[i] = payload
        }else{
          if(payload.isDefault) {
            state.addressList[i].isDefault = false
          }
        }
      });
    },
    addAddress2List(state, payload) {
      const aid = state.addressList.findIndex(e => e.id === payload.id);
      if (aid === -1) {
        state.addressList.push(payload);
      }
      if (payload.isDefault && payload.valid) {
        state.addressList.forEach((e, i) => {
          if (e.id !== payload.id) {
            state.addressList[i].isDefault = false
          }
        });
      }
    },
  },
  actions: {
    setOrder({commit}, payload){
      let orderinfo = {timestamp: Date.now()/1000, ...payload}
      commit('setOrder', orderinfo)
    },
    updateOrder({commit}, payload){
      commit('updateOrder', payload)
    },
    addAddress2List({ commit }, payload) {
      const myaddress = { id: '1123', valid: true, ...payload };
      commit('addAddress2List', myaddress);
    },
    updateAddress({commit}, payload) {
      commit('updateAddress', payload)
    },
    setAddressList({ commit }) {
      const payload = [
        {
          id: '10000',
          name: '张三',
          valid: true,
          isDefault: false,
          tel: '13000000000',
          areaCode: '浙江省',
          city: '杭州市',
          province: '浙江省',
          county: '朝阳区',
          addressDetail: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        },
        {
          id: '20000',
          name: '李四',
          valid: true,
          isDefault: true,
          tel: '1310000000',
          areaCode: '浙江省',
          city: '杭州市',
          province: '浙江省',
          county: '朝阳区',
          addressDetail: '浙江省杭州市拱墅区莫干山路 50 号',
        },
        {
          id: '30000',
          name: '王五',
          isDefault: false,
          valid: false,
          tel: '1320000000',
          areaCode: '浙江省',
          city: '杭州市',
          province: '浙江省',
          county: '朝阳区',
          addressDetail: '浙江省杭州市滨江区江南大道 15 号',
        },
      ];
      payload.map((e) => {
        commit('addAddress2List', e);
      });
    },
    setWarningMessage({ commit }, payload) {
      commit('setWarningMessage', payload);
    },
    setLoading({ commit }, payload) {
      commit('setLoading', payload);
    },
    addGoods2Cart({ commit }, payload) {
      commit('add2Cart', payload);
    },
    setCurGoods({ commit }, goodsid) {
      const payload = {
        id: goodsid,
      };
      commit('setCurGoods', payload);
    },
    setHomeSwips({ commit }, payload) {
      payload = [
        { id: '112', link: 'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg' },
        { id: '113', link: 'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg' },
        { id: '114', link: 'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg' },
        { id: '115', link: 'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg' },
      ];
      commit('setHomeSwips', payload);
    },
    setHomeGoodsModule({ commit }, payload) {
      payload = [{
        title: '特价促销',
        url: 'temai',
        list: [{
          name: '商品1-对华加税听证会，美国政府几乎被反对声淹没',
          id: 1122,
          descWords: '套餐包含：精品烤鸭一套，出溜花生，松鼠桂鱼，甜点，饮料等',
          price: 100,
          new_price: 60,
          image: 'http://psijv3sgj.bkt.clouddn.com/27cccc80-85df-11e9-b378-005056a7498b',
        },
        {
          name: '商品2',
          descWords: '套餐包含：精品烤鸭一套，出溜花生，松鼠桂鱼，甜点，饮料等',
          id: 1123,
          price: 110,
          new_price: 70,
          image: 'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
        }, {
          name: '商品3',
          descWords: '套餐包含：精品烤鸭一套，出溜花生，松鼠桂鱼，甜点，饮料等',
          id: 1124,
          price: 120,
          new_price: 80,
          image: 'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
        }, {
          name: '商品4',
          descWords: '套餐包含：精品烤鸭一套，出溜花生，松鼠桂鱼，甜点，饮料等',
          id: 1125,
          price: 200,
          new_price: 90,
          image: 'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg',
        }],
      },
      {
        title: '特价促销',
        url: 'chuxiao',
        list: [{
          name: '商品1',
          id: 1134,
          descWords: '套餐包含：精品烤鸭一套，出溜花生，松鼠桂鱼，甜点，饮料等',
          price: 100,
          new_price: 60,
          image: 'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
        },
        {
          name: '商品2',
          id: 1134,
          descWords: '套餐包含：精品烤鸭一套，出溜花生，松鼠桂鱼，甜点，饮料等',
          price: 110,
          new_price: 70,
          image: 'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
        }, {
          name: '商品3',
          id: 1134,
          descWords: '套餐包含：精品烤鸭一套，出溜花生，松鼠桂鱼，甜点，饮料等',
          price: 120,
          new_price: 80,
          image: 'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
        }, {
          name: '商品4',
          id: 1134,
          descWords: '套餐包含：精品烤鸭一套，出溜花生，松鼠桂鱼，甜点，饮料等',
          price: 200,
          new_price: 90,
          image: 'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg',
        }],
      },
      {
        title: '新品上市',
        url: 'newcoming',
        list: [{
          name: '商品1',
          id: 1134,
          descWords: '套餐包含：精品烤鸭一套，出溜花生，松鼠桂鱼，甜点，饮料等',
          price: 100,
          new_price: 60,
          image: 'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
        },
        {
          name: '商品2',
          id: 1134,
          descWords: '套餐包含：精品烤鸭一套，出溜花生，松鼠桂鱼，甜点，饮料等',
          price: 110,
          new_price: 70,
          image: 'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
        }, {
          name: '商品3',
          id: 1134,
          descWords: '套餐包含：精品烤鸭一套，出溜花生，松鼠桂鱼，甜点，饮料等',
          price: 120,
          new_price: 80,
          image: 'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
        }, {
          name: '商品4',
          id: 1134,
          descWords: '套餐包含：精品烤鸭一套，出溜花生，松鼠桂鱼，甜点，饮料等',
          price: 200,
          new_price: 90,
          image: 'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg',
        }],
      },
      {
        title: '精选商品',
        url: 'prettygood',
        list: [{
          name: '商品1',
          id: 1134,
          descWords: '套餐包含：精品烤鸭一套，出溜花生，松鼠桂鱼，甜点，饮料等',
          price: 100,
          new_price: 60,
          image: 'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
        },
        {
          name: '商品2',
          id: 1134,
          descWords: '套餐包含：精品烤鸭一套，出溜花生，松鼠桂鱼，甜点，饮料等',
          price: 110,
          new_price: 70,
          image: 'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
        }, {
          name: '商品3',
          id: 1134,
          descWords: '套餐包含：精品烤鸭一套，出溜花生，松鼠桂鱼，甜点，饮料等',
          price: 120,
          new_price: 80,
          image: 'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
        }, {
          name: '商品4',
          id: 1134,
          descWords: '套餐包含：精品烤鸭一套，出溜花生，松鼠桂鱼，甜点，饮料等',
          price: 200,
          new_price: 90,
          image: 'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg',
        }],
      }];
      commit('setHomeGoodsModule', payload);
    },
  },
  getters: {
    getWarningMessage(state) {
      return state.warnmessage;
    },
    getHomeSwips(state) {
      return state.homeSwips;
    },
    getHomeGoodsModule(state) {
      return state.homeGoodsModule;
    },
    sampleSKU(state) {
      return state.sampleSKU;
    },
    getLoading(state) {
      return state.loading;
    },
    getCartGoods(state) {
      return state.cartGoods;
    },
    getCartGoodsSummary(state) {
      return state.cartGoods.map((e) => {
        const skuData = state.sampleSKU.find(s => s.goods_id === e.goodsId);
        let output = '';
        skuData.sku.tree.find((t) => {
          const tree_v = t.v.find(sv => (sv.id === e.selectedSkuComb.s1 || sv.id === e.selectedSkuComb.s2));
          output += `${t.k}:${tree_v.name} `;
        });
        return { ...skuData.goods_info, ...e, skudesc: output };
      });
    },
    curGoods(state) {
      return state.sampleSKU.find(e => (state.curgoods !== null && e.goods_id === state.curgoods.id));
    },
    getOrderList(state) {
        if (!state.orderList) {
          return []
        }
        console.log('vuex order list:', state.orderList)
        return state.orderList
    },
    getOrder(state) {
      console.log('get order info', state.orderinfo)
      if (!state.orderinfo) {
        return {}
      }
      let orderdate = (new Date(state.orderinfo.timestamp *1000)).toLocaleDateString()
      const order = {counts: state.orderinfo.goodsinfo[0].selectedNum, id: null,
                      date:orderdate, price: state.orderinfo.total}
      let goodsinfolist = state.orderinfo.goodsinfo.map(e => {
        let output = ''
        const skuData = state.sampleSKU.find(s => s.goods_id === e.goodsId);
        skuData.sku.tree.find((t) => {
          const tree_v = t.v.find(sv => (sv.id === e.selectedSkuComb.s1 || sv.id === e.selectedSkuComb.s2));
          output += `${t.k}:${tree_v.name} `;
        });
        return {...e, skudesc: output}
      })
      console.log('check it:', goodsinfolist)
      return {...order, goodslist: goodsinfolist}
    },
    countOfCartsGoods(state) {
      return state.cartGoods.length;
    },
    addresslist(state) {
      return state.addressList;
    },
    getAddressById: (state) => (id) => {
      return state.addressList.find(e => e.id === id);
    },
  },
};
