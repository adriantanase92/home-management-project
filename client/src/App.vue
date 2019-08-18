<template>
  <div id="app">
    <v-app :class="{ 'background': $route.path == '/' }">
      <Header v-if="this.$router.history.current.fullPath != '/'"></Header>
      <router-view :key="$route.fullPath" mt-5 />
      <!-- <Footer v-if="this.$router.history.current.fullPath != '/'"></Footer> -->
      <notify-component :notifyAlertObj="alert"></notify-component>
    </v-app>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import NotifyComponent from './components/NotifyComponent/NotifyComponent';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    NotifyComponent
  },
  data() {
    return {
      alert: {
        show: false,
        message: '',
        type: 'success'
      }      
    };
  },
  mounted: function () {
    // console.log(this.$router.history.current.fullPath);
  }
};
</script>

<style scoped lang="scss">
@import './assets/style/main.scss';
</style>
