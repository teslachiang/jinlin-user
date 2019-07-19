import Vue from 'vue';
import Vant from 'vant';
import VueLazyload from 'vue-lazyload';
import App from './App.vue';
import 'vant/lib/index.css';
import store from './vuex/store';
import myNavBar from './components/navbar.vue';
import myTabBar from './components/tabbar.vue';
import myDetail from './components/detail.vue';
import myComments from './components/comments.vue';
import myDesc from './components/desc.vue';
import myAddressList from './components/addressList.vue';
import myAddressModify from './components/addressModify.vue';
import myPayWay from './components/payway.vue';
import myInputComments from './components/inputcomment.vue';


Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.component('app-navbar', myNavBar);
Vue.component('app-tabbar', myTabBar);
Vue.component('app-detail', myDetail);
Vue.component('app-comments', myComments);
Vue.component('app-desc', myDesc);
Vue.component('app-addresslist', myAddressList);
Vue.component('app-addressmodify', myAddressModify);
Vue.component('app-payway', myPayWay);
Vue.component('app-inputcomment', myInputComments);

Vue.use(VueLazyload);
Vue.use(Vant);

new App().$mount();
