<template>
  <div id="app">
    <Chatbot />
  </div>
</template>

<script>
import Chatbot from './components/ChatbotInternet.vue';

export default {
  name: 'App',
  components: {
    Chatbot
  }
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

#app {
  background: rgb(243 244 246);
  /* background: linear-gradient(
    to left,
    #509eb8 10%,
    #06d6a0 60%,
    #ffd166 120%
    ); */
}
</style>
