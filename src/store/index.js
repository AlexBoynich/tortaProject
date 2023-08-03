import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    total:[
      {
        topping:{},
        decors: [],
        form: ''
      },
      {
        topping:{},
        decors: [],
        form: ''
      },
      {
        topping:{},
        decors: [],
        form: ''
      },
      {
        topping:{},
        decors: [],
        form: ''
      },
      {
        topping:{},
        decors: [],
        form: ''
      }
    ], 
    checkedTiers: 1,
    fio: '',
    checkedEvent: false,
    weight: '',
    phoneNumber: '',
    data_finish: '',
    comment: '',
    favourite_link: '',
    checkedEventId: '',
    isSuccessOrder: null,
  },
  getters: {
    TOTAL(state) {
        return state.total;
    },
    GET_CHECKED(state, {tier, type}) {
      return state.total[tier][type]
    },
    GET_TOPPINGS_PRICE(state) {
      let notEmptyObj=state.total.filter(item=> item.topping.price)
      const total=notEmptyObj.reduce((total, item) => {
        return total+item.topping.price
      }, 0)
      return (notEmptyObj.length===0) ? 0 : total/notEmptyObj.length
    },
    GET_DECORS_PRICE(state){
      // let result = state.total.map(a=>Math.max.apply(null,a.decors))
        let result = state.total.flatMap(item=> {
         return item.decors
      })
      return (result.length===0) ? 0 : Math.max(...result.map(item => {
        return item.price
      }))
    },
    GET_CHECKED_DECORS_ID(state) {
      return state.total.map(item => {
        return{comp: item.topping.id,form: item.form, decor: [...item.decors.map(i=> {
          return i.id
        })]}
      })
    },
    GET_TOTAL_PRICE(state, getters) {
      if(state.weight && getters.GET_DECORS_PRICE && getters.GET_TOPPINGS_PRICE){
        console.log(getters.GET_DECORS_PRICE,getters.GET_TOPPINGS_PRICE, Number(state.weight))
        return Math.round((getters.GET_DECORS_PRICE+getters.GET_TOPPINGS_PRICE) * Number(state.weight))
      }
    },
    GET_CHECKED_TIERS(state) {
      return state.checkedTiers

    },
    GET_CHECKED_EVENT(state) {
      return state.checkedEvent
    },
    GET_CHECKED_EVENT_ID(state) {
      return state.checkedEventId
    },
    GET_WEIGHT(state) {
      return state.weight
    },
    GET_IS_SUCCESS_ORDER(state) {
      return state.isSuccessOrder
    }
  },
  mutations: {
    SET_CHECKED(state, {tier, item, type}){
        state.total[tier-1][type]=item
    },
    SET_DECOR(state, {tier,item, type}) { 
      if(state.total[tier-1][type].length === 0) {
        state.total[tier-1][type].push(item)
      } else if (state.total[tier-1][type].some((i) => {
        return i.id===item.id
      })) {
        state.total[tier-1][type]=state.total[tier-1][type].filter(same => same.id != item.id)
      } else state.total[tier-1][type].push(item)
    },
    SET_IS_ACTIVE(state, {tier, obj, type}) {
        if(state.total[tier-1][type] === obj) {
          return true
        } else 
        return false
    },
    SET_CHECKED_TIERS(state, data){
      state.checkedTiers=data
    },
    SET_CHECKED_EVENT(state, {name, id}){
      state.checkedEventId=id
      state.checkedEvent=name
    },
    SET_WEIGHT(state, data){
      state.weight=data
    },
    SET_APPLICATION(state, {fio,number,date,comment}) {
      state.fio=fio
      state.phoneNumber=number
      state.data_finish=date
      state.comment=comment
    },
    SET_FAVOURITE_LINK(state, {link}) {
      state.favourite_link = link
    },
    SET_IS_SUCCESS_ORDER(state, data) {
      state.isSuccessOrder=data
    },
    SET_STATE_EMPTY(state) {
      state.total= [
        {
          topping:{},
          decors: [],
          form: ''
        },
        {
          topping:{},
          decors: [],
          form: ''
        },
        {
          topping:{},
          decors: [],
          form: ''
        },
        {
          topping:{},
          decors: [],
          form: ''
        },
        {
          topping:{},
          decors: [],
          form: ''
        }
      ],
      state.checkedTiers = 1,
      state.fio = '',
      state.checkedEvent =  false,
      state.weight =  '',
      state.phoneNumber =  '',
      state.data_finish =  '',
      state.comment =  '',
      state.favourite_link =  '',
      state.checkedEventId =  ''
    }
  },
  actions: {
    ADD_TO_TOTAL({commit}, product) {
        commit('SET_TOTAL', product)
    },
    CHANGE_CHECKED({commit}, data) {
      commit('SET_CHECKED', data )
    },
    ADD_DECOR({commit}, data) {
      commit('SET_DECOR', data)
    },
    IS_ACTIVE({commit}, data) {
      commit('SET_IS_ACTIVE', data)
    },
    CHANGE_CHECKED_TIERS({commit}, data) {
      commit('SET_CHECKED_TIERS', data )
    },
    CHANGE_CHECKED_EVENT({commit}, data) {
      commit('SET_CHECKED_EVENT', data )
    },
    CHANGE_WEIGHT({commit}, data) {
      commit('SET_WEIGHT', data )
    },
    CHANGE_APPLICATION({commit},data) {
      commit('SET_APPLICATION', data)
    },
    CHANGE_FAVOURITE_LINK({commit}, data) {
      commit('SET_FAVOURITE_LINK', data)
    },
    SEND_ORDER({state, commit, getters}) {
      axios.post('https://torta-dev.tomsk-it.ru/api/send/order', {
        fio: state.fio,
        event: state.checkedEvent,
        mass: state.weight,
        price: getters.GET_TOTAL_PRICE,
        levels: state.checkedTiers,
        comment: state.comment,
        data_finish: state.data_finish,
        favourite_link: state.favourite_link,
        order: state.total.slice(0,state.checkedTiers),
        phone: state.phoneNumber
      })
      .then(function (response) {
        console.log(response.data.success)
        if (response.data.success) {
          commit('SET_IS_SUCCESS_ORDER', response.data.success)
          commit('SET_STATE_EMPTY')
          console.log(state)
        } else commit('SET_IS_SUCCESS_ORDER', false)
      })
      .catch(function (error) {
        commit('SET_IS_SUCCESS_ORDER', false)
      });
    },
    CHANGE_IS_SUCCESS_ORDER({commit}, data) {
      commit('SET_IS_SUCCESS_ORDER', data)
    }
  },
  modules: {
  }
})
