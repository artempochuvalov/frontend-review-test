import api from '../../api/products.js';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    currency: 'VGTB',
  },
  mutations: {
    addToCart(state, product) {
      state.cart.push(product);
    },
    setProducts(state, products) {
      state.products = products;
    }
  },
  actions: {
    async getProductsList({ state, commit }) {
      const productList = await api.getProductsList();
      commit('setProducts', productList);
    },
  },
  modules: {
  }
})
