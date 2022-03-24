<script setup lang="ts">
  import {ref } from 'vue'
  import BuyToken from './components/BuyToken.vue'
  import LoadToken from './components/LoadToken.vue'
  import TokenInfo from './components/TokenInfo.vue'

  const tab = ref(1)

</script>

<template>
  <div class="ml-6 text-gray-700">
    <div class="menu">
    <ul class="flex mt-6">
      <li @click="tab = 1" class="py-2 px-10 bg-gray-100 hover:bg-gray-200 cursor-pointer" :class="`${tab === 1 ? 'bg-gray-300 hover:bg-gray-300 border-gray-400 border-2' : ''}`">Info</li>
      <li @click="tab = 2" class="py-2 px-10 bg-gray-100 hover:bg-gray-200 cursor-pointer" :class="`${tab === 2 ? 'bg-gray-300 hover:bg-gray-300 border-gray-400 border-2' : ''}`">Load</li>
      <li @click="tab = 3" class="py-2 px-10 bg-gray-100 hover:bg-gray-200 cursor-pointer" :class="`${tab === 3 ? 'bg-gray-300 hover:bg-gray-300 border-gray-400 border-2' : ''}`">Buy</li>
    </ul>
  </div>
  <div class="tabs">
    <div class="load" v-if="tab === 2 "> <LoadToken/> </div>
    <div class="buy" v-else-if="tab === 3">
      <BuyToken />
    </div>
    <div class="info" v-else>
      <TokenInfo />
    </div>
  </div>
  </div>
</template>

<style>

</style>
