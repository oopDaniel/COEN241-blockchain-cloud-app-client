<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/gamble.jpg" />
    <Bet :address="address" :balance="balance" />
  </div>
</template>

<script>
import Bet from './components/Bet.vue'
import { get, post } from './services/api'
import {
  FIXED_ADMIN_ADDR,
  FIXED_ADMIN_PASSWORD,
  FIXED_INITIAL_AMOUNT
} from './utils/constants'

export default {
  name: 'App',
  data: () => ({
    address: '',
    loadingInstance: null,
    balance: FIXED_INITIAL_AMOUNT
  }),
  methods: {
    async initAccount() {
      this.showHint()
      // const { address } = await post('/api/contract/account')
      // this.address = address
      this.address = '0xc781307eFf80F69FCe5c3909c86439e6a373358c'
      // await this.getInitialFunding()
      await this.getAccountBalance()
      this.hideHint()
    },
    async getInitialFunding() {
      await post(`/api/contract/${FIXED_ADMIN_ADDR}`, {
        toAddr: this.address,
        password: FIXED_ADMIN_PASSWORD,
        value: FIXED_INITIAL_AMOUNT
      })
    },
    async getAccountBalance() {
      const { balance } = await get(`/api/contract/${this.address}`)
      this.balance = balance
    },
    showHint() {
      this.loadingInstance = this.$loading({
        lock: true,
        text: 'Initializing your account...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    hideHint() {
      this.loadingInstance && this.loadingInstance.close()
    }
  },
  created() {
    this.initAccount()
  },
  components: {
    Bet
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
