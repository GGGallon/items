<script setup>
import hourseLight from './components/hourseLight.vue'
import SudokuTurntableVue from './components/SudokuTurntable.vue'

const previewList = [
        {
          id: 102893,
          type: 1,
          name: '幸运星',
          num: 1,
          coins: 1000,
          expire: 2,
          img: 'https:\/\/aliimg.changba.com\/promote\/44195111849ec56811462559de8a3ec7.png',
        },
        {
          id: 102894,
          type: 1,
          name: 'K歌之王',
          num: 1,
          coins: 1800,
          expire: 2,
          img: 'https:\/\/aliimg.changba.com\/promote\/f4b09c5f50d9030d45957c02aad1e727.png',
        },
        {
          id: 102895,
          type: 1,
          name: '闪耀双星',
          num: 1,
          coins: 3000,
          expire: 2,
          img: 'https:\/\/aliimg.changba.com\/promote\/dd215f5224ca361e0c80efc8964df01e.png',
        },
        {
          id: 40100685,
          type: 15,
          name: '最佳拍档',
          num: 1,
          coins: 0,
          expire: 3,
          img: 'https:\/\/aliimg.changba.com\/promote\/0f74ce6b441cc3b10fe809faebd786bb.png',
        },
        {
          id: 1,
          type: 20,
          name: '唱吧11周年礼盒',
          num: 1,
          coins: 0,
          expire: 0,
          img: 'https:\/\/aliimg.changba.com\/promote\/e6f3e2b01d1c1b26139611d4383109b6.png',
        },
        {
          id: 80001,
          type: 4,
          name: '唱吧月度会员',
          num: 1,
          coins: 0,
          expire: 0,
          img: 'https:\/\/aliimg.changba.com\/promote\/b11aa9d2fa111de6a3e29570a62a2945.png',
        },
        {
          id: 3,
          type: 20,
          name: 'SSS金属徽章',
          num: 1,
          coins: 0,
          expire: 0,
          img: 'https:\/\/aliimg.changba.com\/promote\/b79c6eca7792f0a40a75f8cd012ab7f8.png',
        },
        {
          id: 4,
          type: 20,
          name: '玫瑰金属徽章',
          num: 1,
          coins: 0,
          expire: 0,
          img: 'https:\/\/aliimg.changba.com\/promote\/ca9adffe007605167a7ab9665e26322b.png',
        },
      ]

  function request() {
      const idx = Math.floor(Math.random() * 8)
      console.log(idx)
      return this.previewList[idx]
  }

  function handleResults(res) {
      alert('恭喜你，抽中了:' + JSON.stringify(res))
  }
</script>

<template>
  <SudokuTurntableVue
  :min-loop="6"
  :request="request"
  :reward-preview-list="previewList"
  @success="handleResults" />
</template>

<style scoped></style>
