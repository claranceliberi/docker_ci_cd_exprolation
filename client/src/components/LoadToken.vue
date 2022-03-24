<script setup lang="ts">
    import { ref } from 'vue'
    
    const token = ref("")
</script>

<template>
    <form class=" mt-6">
        <label for="token" class="flex flex-col w-60">
            <span class="capitalize mb-2 font-bold">token</span>
            <div class="flex items-center">
                <input placeholder="eg. 82928103" v-model="token" type="text" class="bg-gray-100 outline-none py-2 px-4" id="token">
            <button type="submit" class="ml-4 py-2 px-6 bg-blue-600 rounded text-white shadow-lg shadow-blue-600/50 hover:bg-blue-500">Load</button>
            </div>
        </label>
        
    </form>
</template>