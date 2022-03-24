<script setup lang="ts">
import { reactive } from 'vue'

const token = reactive({
    meter: '',
    ammount: ''
})
</script>

<template>
    <form class="flex flex-col w-60 mt-8">
        <label for="meter" class="flex flex-col">
            <span class="capitalize mb-2 font-bold">Meter</span>
            <input
                v-model="token.meter"
                placeholder="eg. NMA92N2981"
                type="text"
                id="meter"
                class="bg-gray-100 outline-none py-2 px-4"
            />
        </label>
        <label for="ammount" class="flex flex-col">
            <span class="capitalize mb-2 font-bold">Ammount</span>
            <input
                v-model="token.ammount"
                placeholder="eg. 1000"
                type="text"
                id="ammount"
                class="bg-gray-100 outline-none py-2 px-4"
            />
        </label>
        <button
            type="submit"
            class="mt-4 py-2 px-6 bg-blue-600 rounded text-white shadow-lg shadow-blue-600/50 hover:bg-blue-500"
        >Purchase</button>
    </form>
</template>