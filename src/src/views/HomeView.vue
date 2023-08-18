<template>
  <div class="home">
    <TierMenu
        :currentTier="currentTier"
        @changeCurrentTierForNext="changeCurrentTierForNext"
        @getToppings="getToppings"
    />
    <div class="startBlock" v-show="GET_CURRENT_TIER===0">
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
        v-if="GET_CURRENT_TIER===(index+1)"
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
          @getToppings="getToppings"
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
      buttonPropsListLastTier: {text: 'Перейти к оформлению ', emit: 5, link: '/order'},
      buttonPropsListTransition: [
      {text: 'К первому ярусу ', emit: 1},
      {text: 'К следующему ярусу ', emit: 2},
      {text: 'К следующему ярусу ', emit: 3},
      {text: 'К следующему ярусу ', emit: 4},
      {text: 'К следующему ярусу ', emit: 5},
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
      iconList: [
        {link: '/images/Dress.svg'},
        {link: '/images/Baby.svg'},
        {link: '/images/Dress.svg'},
        {link: '/images/Dress.svg'},
      ]
    }
  },

  methods: {
    ...mapActions([
      'ADD_TO_TOTAL',
      'CHANGE_CHECKED_TIERS',
      'CHANGE_WEIGHT',
      'CHANGE_CHECKED_EVENT',
      'CHANGE_CURRENT_TIER'
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
        if(!this.GET_CHECKED_EVENT) {
          const event = document.querySelector('.eventBlock')
          let top = event.getBoundingClientRect().top +  window.pageYOffset - document.querySelector('.headerBlock').clientHeight
          window.scrollTo({
                top: top,
                behavior: 'smooth'
              });
          return document.querySelector('.eventBlock').classList.add('fail')
        }    
        if(!this.GET_WEIGHT) {
          const weight = document.querySelector('.cakeWeight')
          let top = weight.getBoundingClientRect().top +  window.pageYOffset - document.querySelector('.headerBlock').clientHeight
          window.scrollTo({
            top: top,
            behavior: 'smooth'
          });
          return document.querySelector('.inputCakeWeight').classList.add('fail')
        }    
        if(this.GET_CURRENT_TIER===0 && index<=1) {
          // тык на первый ярус с 0
          setTimeout(() => {
            window.scrollTo({
                top: top,
                behavior: 'smooth'
              });
          }, 0);
          return this.CHANGE_CURRENT_TIER((this.GET_WEIGHT && this.GET_CHECKED_EVENT && this.GET_CHECKED_TIERS && index===1) ? 1 : this.currentTier)
        }  else if (index===0) {
          // тык на 0 ярус
          return this.CHANGE_CURRENT_TIER(index)
        } else if (index<= this.GET_CURRENT_TIER) {
          // тык на уже пройденный ярус
          return this.CHANGE_CURRENT_TIER(index)
        } else if (Object.keys(this.TOTAL[index-2].topping).length === 0 || this.TOTAL[index-2].decors.length===0) {
          // тык на перелист без обяз параметров
          const decor = document.querySelector('.decorations')
          const topping = document.querySelector('.toppings')
          if((Object.keys(this.TOTAL[index-2].topping).length === 0) && topping) {
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
          return this.CHANGE_CURRENT_TIER(this.GET_CURRENT_TIER)
        } else if(index>this.GET_CHECKED_TIERS) {
          // тык на оформление
          setTimeout(() => {
            window.scrollTo({
                top: top,
                behavior: 'smooth'
                });
            }, 0);
          return this.$router.push({ path: `/order` })
        } else if (Object.keys(this.TOTAL[index-2].topping).length > 0) {
          // обычный тык, если все условия выполнены     
            this.decorationList= (Object.keys(this.TOTAL[index-1].topping).length>0) ? this.decorationList : []
            this.CHANGE_CURRENT_TIER(index)
            setTimeout(() => {
            window.scrollTo({
                top: top,
                behavior: 'smooth'
                });
            }, 0);
              return;
        }
      },
      getToppings() {
        if(this.GET_CHECKED_EVENT_ID) {
          axios.get(`/api/get/components/${(this.GET_CURRENT_TIER)}/${this.GET_CHECKED_EVENT_ID}`)
          .then((response) => {
          this.toppingsList=response.data.data
          })
        }
      },
      getDecors(id) {
        if(id){
          axios.get(`/api/get/decors/${id}`)
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
      'GET_CHECKED_EVENT_ID',
      'GET_CURRENT_TIER'
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
    function () {
      this.currentTier = this.GET_CURRENT_TIER
    }
  },

  watch: {
    GET_CURRENT_TIER() {
      this.currentTier = this.GET_CURRENT_TIER
      if(this.GET_CURRENT_TIER - 1>=0 && Object.keys(this.TOTAL[this.GET_CURRENT_TIER].topping).length>0) {
        axios.get(`/api/get/decors/${this.TOTAL[this.GET_CURRENT_TIER].topping.id}`)
          .then((response) => {
          this.decorationList=response.data.data
          })
      }
      if(this.GET_CURRENT_TIER - 1>=0 && this.TOTAL[this.GET_CURRENT_TIER - 1].topping.id) {
        axios.get(`/api/get/decors/${this.TOTAL[this.GET_CURRENT_TIER - 1].topping.id}`)
          .then((response) => {
          this.decorationList=response.data.data
          })
      }
    },
    GET_CHECKED_EVENT() {
      if(document.querySelector('.eventBlock').classList.contains('fail')) {
        document.querySelector('.eventBlock').classList.remove('fail')
      }
    },
    GET_WEIGHT() {
      if(document.querySelector('.inputCakeWeight').classList.contains('fail')) {
        document.querySelector('.inputCakeWeight').classList.remove('fail')
      }
    }
  },
  
  mounted() {
    axios
    .get('/api/get/events')
    .then( (response) => {
      this.eventList=response.data.data
    })
    .catch(function (error) {
      // handle error
    })
    if  (this.GET_CURRENT_TIER) {
      axios
    .get(`/api/get/components/${(this.GET_CURRENT_TIER)}/${this.GET_CHECKED_EVENT_ID}`)
    .then((response) => {
          this.toppingsList=response.data.data
    })
    .catch(function (error) {
      // handle error
    })
    }
    if(this.GET_CURRENT_TIER - 1>=0 && this.TOTAL[this.GET_CURRENT_TIER - 1].topping.id) {
        axios.get(`/api/get/decors/${this.TOTAL[this.GET_CURRENT_TIER - 1].topping.id}`)
          .then((response) => {
          this.decorationList=response.data.data
          })
      }
  },
}
</script>

<style lang="sass" scoped>
.home
  padding-top: 150px
  max-width: 360px
  width: 100%
  display: flex
  flex-direction: column
.fail
  border: 1px solid red
</style>
