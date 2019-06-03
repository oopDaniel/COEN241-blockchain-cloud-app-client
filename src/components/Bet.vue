<template>
  <div class="bet flex-center">
    <div class="bet-targets flex-center">
      <div
        class="bet-target"
        v-for="target in betTargets"
        :key="target"
        @click="selectTarget(target)"
        :class="{ selected: target === selectedTarget }"
      >
        <span>{{ target }}</span>
        <i v-if="target === selectedTarget" class="icon el-icon-thumb"></i>
      </div>
    </div>

    <div class="amount-input-container flex-center">
      <el-input-number
        v-model="amount"
        :step="step"
        :min="10"
        :max="balance"
      ></el-input-number>
    </div>

    <div class="btns">
      <el-button class="btn" @click="bet" :disabled="hasPlayed">Bet</el-button>
      <el-button class="btn" @click="endGame">End the game</el-button>
    </div>

  </div>
</template>

<script>
import { post } from '../services/api'
import { FIXED_PASSWORD } from '../utils/constants'

export default {
  name: 'Bet',
  props: {
    address: String,
    balance: Number
  },
  data: () => ({
    betTargets: ['A', 'B', 'C', 'D', 'E'],
    selectedTarget: '',
    amount: 10,
    step: 10,
    hasPlayed: false
  }),
  methods: {
    selectTarget(target) {
      if (this.selectedTarget === target) {
        this.selectedTarget = ''
      } else {
        this.selectedTarget = target
      }
    },
    async bet() {
      try {
        await post(`/api/game/${this.address}`, {
          password: FIXED_PASSWORD,
          number: this.selectedTarget.charCodeAt(0) - 64, // e.g. 'B' to 2
          value: this.amount
        })
        this.hasPlayed = true
      } catch (e) {
        console.warn(e.message)
      }
    },
    async endGame() {
      if (!this.hasPlayed) return
      try {
        await post(`/api/game/${this.address}/distribute`, {
          password: FIXED_PASSWORD
        })
      } catch (e) {
        console.warn(e.message)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.bet {
  flex-direction column
}

.bet-targets {
  flex 0 0 240px
}

.bet-target {
  border 1px solid slateblue
  padding 2rem
  border-radius 4px
  transition background-color .3s, color .3s
  cursor pointer
  font-size 1.2em

  &:hover:not(.selected) {
    background wheat
    border 1px solid goldenrod
  }
}

.selected {
  color lightblue
  background salmon
  position relative

  .icon {
    position absolute
    bottom -40px
    left 50%
    transform translateX(-50%)
    color slateblue
  }
}

.bet-target + .bet-target {
  margin-left 2rem
}

.amount-input-container {
  flex 0 0 80px
  align-items flex-start
  width 40%
}

.btn + .btn {
  margin-left 2rem
}
</style>
