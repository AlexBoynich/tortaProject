<template>
  <div id="app">
    <main>
      <Header/>
      <router-view/>
      <Footer/>
    </main>
    <Cookie
      class="cookies"
      :warning="warning"
      @setWarning="setWarning"
      v-if="!warning"
      />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue'
import Cookie from './components/Cookie.vue'

export default {
  components: {
    Header,
    Footer,
    Cookie,
},
data () {
    return {
      warning: '',
    }
  },
  mounted() {
        if(localStorage.warning){
          this.warning=localStorage.warning
        }
      },
  methods: {
    setWarning() {
      localStorage.warning='true'
      this.warning='true'
    }
  },
}
</script>

<style lang="sass" >
@import '@/styles/styles.sass'
</style>
