import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    cartData: []
  },
  mutations: {
    GET_DATA(state, data) {
      state.data = data
      // console.log(state.data)
    },
    SET_CART(state, data) {
      const { id, title,  price, style, _type, availableSizes, installments} = data
      let index = this.state.cartData.findIndex(item => item.id == id)
      if (index == -1) {
        state.cartData.push({
          id, title, price, style, availableSizes, installments,
          count: 1,
          select: false,
          Tprice: price
        })
      } else {
        let item = state.cartData[index]
        if (_type == "add") {
          item.count += 1
          item.Tprice += price
        } else if (_type == "jian") {
          if (item.count > 1) {
            item.count -= 1
            item.Tprice -= price
          } else {
            state.cartData.splice(index, 1)
          }
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cartData))
    },
    SET_CARTDATA(state, data) {
      const { cartData } = data;
      state.cartData = cartData;
    },
    DELECT(state, index) {
      state.cartData.splice(index, 1)
      localStorage.setItem("cart", JSON.stringify(state.cartData))
    }
  },
  actions: {
    get_Data({commit}) {
      axios.get('https://react-shopping-cart-67954.firebaseio.com/products.json').then( res => {
        commit('GET_DATA', res.data.products)
      })
      const cartData = JSON.parse(localStorage.getItem('cart')) || [];
      commit('SET_CARTDATA', {
        cartData,
      })
    },
    setCart({ commit }, data) {
      commit('SET_CART', data)
    },
    setCartData({ commit }) {
      const cartData = JSON.parse(localStorage.getItem('cart')) || [];
      commit('SET_CARTDATA', {
        cartData,
      })
    },
  },
  modules: {
  }
})
