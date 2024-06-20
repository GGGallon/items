<template>
  <div class="cb-lottery">
    <div
      class="cb-lottery__item"
      :class="{ 'is-active': idx + 1 === current.value }"
      v-for="(item, idx) in rewardPreviewList"
      :key="'preview' + idx"
      :data-num="idx + 1"
    >
      <slot :item="item" :idx="idx">
        <img class="gift-img" :src="item.img" alt="礼物图" />
        <span class="gift-name">{{ item.name }}</span>
      </slot>
    </div>
    <div class="cb-lottery__btn" >
      <button class="cb-lottery__btn_inner" @click="requestLottery"></button>
      <button class="cb-lottery__btn_inner" @click="requestLottery"></button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watchEffect } from 'vue'
import { props } from '../props'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default {
  name: 'CbSudokuTurntable',
  props,
  setup(props, { emit }) {
    const current = ref(1)
    const isSpinning = ref(false)
    const poolMap = reactive(new Map())

    watchEffect(() => {
      if (!Number.isNaN(Number.parseInt(props.pos)) && props.pos >= 1 && props.pos <= 8) {
        current.value = props.pos
      }
    })

    watchEffect(() => {
      if (Array.isArray(props.rewardPreviewList) && props.rewardPreviewList.length) {
        poolMap.clear()
        props.rewardPreviewList.forEach((v, idx) => {
          poolMap.set(String(v[props.rewardPk]), {
            ...v,
            num: idx + 1
          })
        })
      }
    })

    const requestLottery = async () => {
      if (isSpinning.value) {
        return
      }
      emit('click')
      if (props.lotteryDisabled) {
        return
      }
      isSpinning.value = true
      emit('start')
      try {
        const results = await Promise.resolve(props.request())
        const giftId = getResponseGift(results)[props.rewardPk].toString()
        const gift = poolMap.get(giftId)
        if (!gift) {
          if (!props.silence) {
            toast('抽奖失败，请稍后再试试吧~')
          }
          throw new Error('抽奖结果不在奖励内容中')
        }
        const giftIdx = gift.num
        await startAnimation(giftIdx)
        emit('success', gift)
      } catch (exp) {
        if (!props.silence) {
          toast('抽奖失败，请稍后再试试吧~')
        }
        emit('failed', exp)
      }
      isSpinning.value = false
    }

    const getResponseGift = (data) => {
      return Array.isArray(data) && data.length >= 1 ? data[0] : data
    }

    const startAnimation = async (giftIdx) => {
      const loop = props.minLoop < 4 ? 4 : props.minLoop
      const steps = giftIdx + 8 * loop - current.value
      const speedRate = props.speedRate
      const times = Array.from({ length: steps }).fill(30)
      for (let i = 0; i < speedRate.length; i++) {
        const cur = speedRate[i]
        times[i] = cur
        times[times.length - 1 - i] = cur
      }
      while (times.length) {
        current.value++
        if (current.value > 8) {
          current.value = 1
        }
        const tick = times.shift()
        await sleep(tick)
      }
    }

    const toast = (msg) => {
      typeof window.$toast === 'function' ? window.$toast(msg) : alert(msg)
    }

    return {
      current,
      isSpinning,
      poolMap,
      requestLottery
    }
  }
}
</script>


<style lang="scss" scoped>
@import '../scss-mixins/mixins.scss';

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin bg($bgName, $fixHeight: true) {
  @if $fixHeight {
    background-position: center;
    background-size: 100% 100%;
  } @else {
    background-position: top;
    background-size: 100%;
  }

  background-image: url($bgName);
  background-repeat: no-repeat;
}

@include b(lottery) {
  display: flex;
  position: relative;
  width: 658px;
  height: 500px;

  @include e(item) {
    width: 208px;
    height: 154px;
    @include flex-center;
    @include bg('https://res.cdn.changbaimg.com/asset/yunying/twinkle-double-star/lottery-bg.bd041ffd.png');

    position: absolute;
    flex-direction: column;

    @include when(active) {
      @include bg('https://res.cdn.changbaimg.com/asset/yunying/twinkle-double-star/lottery-bg-active.af860559.png');

      .gift-name {
        color: #7445cf;
      }
    }

    &[data-num='1'] {
      left: 0;
      top: 0;
    }

    &[data-num='2'] {
      left: 225px;
      top: 0;
    }

    &[data-num='3'] {
      left: 450px;
      top: 0;
    }

    &[data-num='4'] {
      left: 450px;
      top: 173px;
    }

    &[data-num='5'] {
      left: 450px;
      top: 346px;
    }

    &[data-num='6'] {
      left: 225px;
      top: 346px;
    }

    &[data-num='7'] {
      left: 0;
      top: 346px;
    }

    &[data-num='8'] {
      left: 0;
      top: 173px;
    }
  }

  @include e('btn') {
    @include flex-center();
    flex-direction: column;
    justify-content: space-around;
    width: 208px;
    height: 154px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    outline: none;
    border: none;
    background-color: transparent;
    
    .cb-lottery__btn_inner {
      border: none;
      width: 208px;
      height: 60px;
      @include bg('https://res.cdn.changbaimg.com/asset/yunying/twinkle-double-star/btn-lottery.03a86a0a.png');
    }
  }

  @at-root .gift-img {
    width: 124px;
    height: 94px;
    object-fit: contain;
    margin-bottom: 4px;
  }

  @at-root .gift-name {
    font-size: 22px;
    font-weight: 400;
    color: #af270d;
    white-space: nowrap;
  }
}
</style>
