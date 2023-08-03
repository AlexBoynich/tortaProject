<template>
  <div class="orderBlock container">
    <router-link to="/"><img src="/images/arrowBack.svg" alt="" class="back"></router-link>
    <Total/>
    <Application/>
    <Button 
      :buttonProps="buttonPropsList" 
      @changeCurrentTierForNext="send"/>
    <orderModal v-show="(GET_IS_SUCCESS_ORDER === null) ? false : true"/>
  </div>
</template>
  
<script>

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
      'SEND_ORDER'
    ]),
    send() {
      this.SEND_ORDER()
    }
  },

  components: {
      Application,
      Button,
      Total,
      orderModal
  },

  computed:{
    ...mapGetters([
          'GET_IS_SUCCESS_ORDER'
      ])
  }
}
</script>
 
<style lang="sass" scoped>
.title
    margin: 32px
.button
    margin: 32px 0
.back
    cursor: pointer
</style>