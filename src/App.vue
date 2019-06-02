<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/gamble.jpg" />
    <Bet />
  </div>
</template>

<script>
import Bet from './components/Bet.vue'

export default {
  name: 'App',
  components: {
    Bet
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 1.5em;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
