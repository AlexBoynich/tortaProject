<template>
  <div class="home">
    <TierMenu
        :currentTier="currentTier"
        @changeCurrentTierForNext="changeCurrentTierForNext"
        @getToppings="getToppings"
    />
    <div class="startBlock" v-if="currentTier===0">
      <Event
          :checkedEvent="checkedEvent"
          @changeCheckedEvent="changeCheckedEvent"
          :squareList="eventList"
      />
      <Tiers
      />
      <CakeWeight
          @postWeight="changeCheckedCakeWeight"
          ref="cakeWeight"
          :checkedCakeWeight="checkedCakeWeight"
      />
      <LinkFavourite/>
      <Button
          :buttonProps="buttonPropsListTransition"
          @changeCurrentTierForNext="changeCurrentTierForNext"
          @getToppings="getToppings"
          :currentTier="currentTier"
      />
    </div>
    <div
        v-for="(tier, index) in tiers"
        :class="`Tier${index+1}`"
        v-if="currentTier===(index+1)"
    >
      <Toppings id="toppings"
          :toppingsList="toppingsList"
          :currentTier="currentTier"
          @getDecors="getDecors"
      />
      <TypesOfDecoration
          :decorationList="decorationList"
          :currentTier='currentTier'
      />
      <Form
          :currentTier="currentTier"
      />
      <Button
          :buttonProps="(currentTier===GET_CHECKED_TIERS) ? buttonPropsListLastTier : buttonPropsListTransition"
          @changeCurrentTierForNext="changeCurrentTierForNext"
          :currentTier="currentTier"
      />
    </div>
  </div>
</template>

<script>

import Event from '@/components/Event.vue'
import Tiers from '@/components/Tiers.vue';
import CakeWeight from '@/components/CakeWeight.vue';
import Button from '@/components/Button.vue';
import LinkFavourite from '@/components/LinkFavourite.vue'
import TierMenu from '@/components/TierMenu.vue';
import Cookie from '@/components/Cookie.vue';
import Toppings from '@/components/Toppings.vue'
import Form from '../components/Form.vue';
import TypesOfDecoration from '../components/TypesOfDecoration.vue';
import axios from 'axios'
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'HomeView',

  data() {
    return {
      buttonPropsListLastTier: {text: 'Перейти к оформлению', emit: 5, link: '/order'},
      buttonPropsListTransition: [
      {text: 'К первому ярусу >', emit: 1},
      {text: 'К следующему ярусу >', emit: 2},
      {text: 'К следующему ярусу >', emit: 3},
      {text: 'К следующему ярусу >', emit: 4},
      {text: 'К следующему ярусу >', emit: 5},
    ],
      checkedCakeWeight: '',
      checkedEvent: '',
      currentTier: 0,
      eventList: [],
      toppingsList: [],
      tiers: [
          {},
          {},
          {},
          {},
          {},
      ],
      decorationList: [],
    }
  },

  methods: {
    ...mapActions([
      'ADD_TO_TOTAL',
      'CHANGE_CHECKED_TIERS',
      'CHANGE_WEIGHT',
      'CHANGE_CHECKED_EVENT'
    ]),
      changeCheckedEvent(name, id) {
        this.CHANGE_CHECKED_EVENT({name, id})
      },
      changeCheckedTiers(tab) {
        this.CHANGE_CHECKED_TIERS(tab)
        this.$refs.cakeWeight.updateMinWeight(this.checkedTiers)
      },
      changeCheckedCakeWeight (tab) {
        this.CHANGE_WEIGHT(tab)
      },
      changeCurrentTierForNext(index) {
        if(this.currentTier===0 && index<=1) {
          // тык на первый ярус с 0
          return this.currentTier = (this.GET_WEIGHT && this.GET_CHECKED_EVENT && this.GET_CHECKED_TIERS && index===1) ? 1 : this.currentTier
        }  else if (index===0) {
          // тык на 0 ярус
          return this.currentTier=index
        } else if (index<= this.currentTier) {
          // тык на уже пройденный ярус
          return this.currentTier=index
        } else if (Object.keys(this.TOTAL[index-2].topping).length === 0 || this.TOTAL[index-2].decors.length===0) {
          // тык на перелист без обяз параметров
          const decor = document.querySelector('.decorations')
          const topping = document.querySelector('.toppings')
          if((Object.keys(this.TOTAL[index-2].topping).length === 0) && topping) {
            console.log(Object.keys(this.TOTAL[index-2].topping).length)
              let top = topping.getBoundingClientRect().top +  window.pageYOffset - document.querySelector('.headerBlock').clientHeight
              window.scrollTo({
                top: top,
                behavior: 'smooth'
              });
            }
          else if ( this.TOTAL[index-2].decors.length===0 && decor) {
              let top = decor.getBoundingClientRect().top + window.pageYOffset - document.querySelector('.headerBlock').clientHeight
              window.scrollTo({
                top: top,
                behavior: 'smooth'
              });
          }
          return this.currentTier=this.currentTier
        } else if(index>this.GET_CHECKED_TIERS) {
          // тык на оформление
          return this.$router.push({ path: `/order` })
        } else if (Object.keys(this.TOTAL[index-2].topping).length > 0) {
          // обычный тык, если все условия выполнены
          return this.currentTier=index
        }
      },
      getToppings() {
        axios.get(`https://torta-dev.tomsk-it.ru/api/get/components/${(this.currentTier)}/${this.GET_CHECKED_EVENT_ID}`)
        .then((response) => {
        this.toppingsList=response.data.data
        })
      },
      getDecors(id) {
        if(id){
          axios.get(`https://torta-dev.tomsk-it.ru/api/get/decors/${id}`)
          .then((response) => {
          this.decorationList=response.data.data
          })
        }
      },

  },

  components: {
    Event,
    Tiers,
    CakeWeight,
    Button,
    LinkFavourite,
    TierMenu,
    Cookie,
    Toppings,
    Form,
    TypesOfDecoration,
  },

  computed : {
    ...mapGetters([
      'TOTAL',
      'GET_CHECKED_TIERS',
      'GET_CHECKED_EVENT',
      'GET_WEIGHT',
      'GET_CHECKED_EVENT_ID'
    ]),
    function() {
      this.checkedTiers=this.TOTAL.checkedTiers
    } ,
    function () {
      this.checkedEvent=this.TOTAL.checkedEvent
    },
    function () {
      this.checkedCakeWeight=this.TOTAL.weight
    },
  },
  
  mounted() {
    axios
    .get('https://torta-dev.tomsk-it.ru/api/get/events')
    .then( (response) => {
      this.eventList=response.data.data
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
}
</script>
