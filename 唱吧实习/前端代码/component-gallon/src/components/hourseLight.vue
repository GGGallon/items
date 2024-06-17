<template>
  <div class="container">
    <div class="box" ref="box1"></div>
    <div class="box" ref="box2"></div>
    <div class="box" ref="box3"></div>
    <div class="box" ref="box4"></div>
    <button class="boxcenter" id="startButton" @click="start">开始</button>
    <div class="box" ref="box5"></div>
    <div class="box" ref="box6"></div>
    <div class="box" ref="box7"></div>
    <div class="box" ref="box8"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const box1 = ref(null)
const box2 = ref(null)
const box3 = ref(null)
const box4 = ref(null)
const box5 = ref(null)
const box6 = ref(null)
const box7 = ref(null)
const box8 = ref(null)
const centerBox = ref(null)

const boxes = [box1, box2, box3, box5, box8, box7, box6, box4]

const start = () => {
  let index = 0
  const interval = setInterval(() => {
    boxes.forEach((box) => (box.value.style.backgroundColor = '#f9e4d4'))
    boxes[index].value.style.backgroundColor = '#ffa500'
    index = (index + 1) % boxes.length
  }, 300)

  setTimeout(() => clearInterval(interval), 3000) // Run for 3 seconds
}
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f0f0f0;
}

.container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
}

.box {
  background-color: #f9e4d4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

.center {
  background-color: #b00020;
  color: white;
  cursor: pointer;
}
</style>
