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
      <el-button
        class="btn"
        @click="bet"
        :disabled="!selectedTarget || hasPlayed"
      >
        Bet
      </el-button>
      <el-button class="btn" @click="startEndingGame" :disabled="!hasPlayed">
        End the game
      </el-button>
    </div>
  </div>
</template>

<script>
import { get, post } from '../services/api'
import { FIXED_PASSWORD } from '../utils/constants'

const FETCH_GAME_STATUS_INTERVAL = 5000

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
        console.warn('start time:', performance.now())
        await post(`/api/game/${this.address}`, {
          password: FIXED_PASSWORD,
          number: this.selectedTarget.charCodeAt(0) - 65, // e.g. 'B' to 1
          value: this.amount
        })
        this.showPostBetHint()
        this.hasPlayed = true
      } catch (e) {
        console.warn(e.message)
      }
    },
    async startEndingGame() {
      if (!this.hasPlayed) return
      try {
        await post(`/api/game/${this.address}/distribute`, {
          password: FIXED_PASSWORD
        })
        this.showEndGameHint()
        this.endGame()
      } catch (e) {
        console.warn(e.message)
      }
    },
    endGame() {
      const interval = setInterval(() => {
        get('/api/game')
          .then(res =>
            res.ending ? null : get('/api/game/prev').then(res => res.prevGame)
          )
          .then(res => {
            if (res && res.prevWinNumber !== undefined) {
              clearInterval(interval)
              const winner = String.fromCharCode(65 + res.prevWinNumber)
              this.showPostEndGameHint(winner)
              this.hasPlayed = false
              console.warn('end time:', performance.now())
            }
          })
      }, FETCH_GAME_STATUS_INTERVAL)
    },
    showEndGameHint() {
      this.$message({
        // eslint-disable-next-line
        message: 'The banker is calculating the winner of the game carefully...',
        showClose: true,
        duration: 0,
        type: 'warning'
      })
    },
    showPostEndGameHint(winner) {
      const hasWon = winner === this.selectedTarget
      const gameMsg = hasWon ? 'You win!' : 'You lose!'
      this.$message({
        message: `The winner is ${winner}. ${gameMsg}`,
        showClose: true,
        duration: 12000,
        type: hasWon ? 'success' : 'warning'
      })
    },
    showPostBetHint() {
      this.$message({
        // eslint-disable-next-line
        message: `You Bet ${this.selectedTarget} win! You can wait for more players or just end the game now.`,
        showClose: true,
        duration: 0
      })
    }
  }
}
</script>

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
