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
      ></el-input-number>
    </div>

    <div class="btns">
      <el-button class="btn" @click="bet">Bet</el-button>
      <el-button class="btn" @click="endGame">End the game</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Bet',
  data: () => ({
    betTargets: ['A', 'B', 'C', 'D', 'E'],
    selectedTarget: '',
    amount: 10,
    step: 10
  }),
  methods: {
    selectTarget(target) {
      if (this.selectedTarget === target) {
        this.selectedTarget = ''
      } else {
        this.selectedTarget = target
      }
    },
    bet() {
    },
    endGame() {
    }
  },
  props: {
    msg: String
  }
};
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
