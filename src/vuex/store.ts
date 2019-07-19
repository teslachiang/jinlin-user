import Vue from 'vue';
import Vuex from 'vuex';
import share from './share';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    share,
  },
});
