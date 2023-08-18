<template>
  <div class="orderBlock container">
    <img src="/images/arrowBack.svg" alt="Back" class="back" @click="backToHome">
    <Total/>
    <Application/>
    <Button 
      :buttonProps="buttonPropsList" 
      @changeCurrentTierForNext="send"/>
    <orderModal v-show="(GET_IS_SUCCESS_ORDER === null) ? false : true"/>
  </div>
</template>
  
<script>
import axios from 'axios';
import Application from '@/components/Application.vue';  
import Button from '@/components/Button.vue';
import Total from '@/components/Total.vue';
import { mapActions, mapGetters } from 'vuex';
import orderModal from '@/components/orderModal/orderModal.vue';

export default {

  name: 'OrderPageView',

  data() {
    return {
      buttonPropsList: {text: 'Отправить'},
    }
  },

  methods: {
    ...mapActions([
      'SEND_ORDER',
      'CHANGE_CURRENT_TIER',

    ]),
    send() {
      if(this.GET_PHONE==='') {
        return document.querySelector('.phoneInput').classList.add('fail')
      }
      this.SEND_ORDER()
    },

      backToHome (){
      this.$router.push({ path: `/` })
      this.CHANGE_CURRENT_TIER(this.GET_CHECKED_TIERS)
          axios.get(`/api/get/components/${(this.GET_CURRENT_TIER)}/${this.GET_CHECKED_EVENT_ID}`)
          .then((response) => {
          this.toppingsList=response.data.data
          })
        return
    },
  },
  components: {
      Application,
      Button,
      Total,
      orderModal
  },

  computed:{
    ...mapGetters([
        'GET_IS_SUCCESS_ORDER',
        'GET_CHECKED_TIERS',
        'GET_CURRENT_TIER',
        'GET_CHECKED_EVENT_ID',
        'GET_PHONE'
      ])
  }
}
</script>
 
<style lang="sass" scoped>
.container 
  margin-top: 0
  max-width: 360px
  padding: 0 16px
.orderBlock
  padding-top: 175px
.title
    margin: 32px
.button
    margin: 32px 0 0
.back
    cursor: pointer
</style>