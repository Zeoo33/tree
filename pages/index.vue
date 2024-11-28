<template>
  <div class="p-6 bg-gray-100 min-h-screen text-gray-800">

    <!-- Current Question -->
    <div v-if="currentNode && currentNode.question" class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        {{ currentNode.question }}
      </h1>
      <ul class="text-base text-gray-700 space-y-2">
        <li 
          v-for="(option, index) in currentNode.options" 
          :key="index" 
          class="hover:underline cursor-pointer"
          @click="handleOptionSelected(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>

    <!-- Selections History -->
<div v-if="history.length > 0" class="mb-6">
  <h2 class="text-xl font-semibold text-gray-900">Your Selections:</h2>
  <ul class="list-disc pl-5 mt-2 text-gray-700">
    <li v-for="(selection, index) in history" :key="index">
      <span>{{ selection.question }}</span> <span class="font-bold text-orange-500">{{ selection.label }}</span> 
    </li>
  </ul>
</div>


    <!-- Recommended Products -->
    <div v-if="currentNode && currentNode.skus && currentNode.skus.length > 0">
      <h2 class="text-xl font-semibold text-gray-900">Recommended Products:</h2>
      <ul class="list-disc pl-5 mt-2 text-orange-500">
        <li v-for="sku in currentNode.skus" :key="sku">
          {{ sku }}
        </li>
      </ul>
    </div>

    <!-- Buttons -->
    <div class="mt-6 flex gap-4"> 
      <button 
        @click="goBack" 
        :disabled="history.length === 0"
        class="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition cursor-pointer" 
      >
        Go Back
      </button>
      <button 
        @click="reset" 
        :disabled="history.length === 0"
        class="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition cursor-pointer" 
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script>
import treeData from '~/assets/json/decision-tree.json';

export default {
  data() {
    return {
      currentNode: treeData, // Start at the root of the tree
      history: [] // Array to store user selections
    };
  },
  methods: {
    handleOptionSelected(option) {
      this.history.push({
        question: this.currentNode.question,
        label: option.label,
      });

      this.currentNode = option.next
        ? option.next
        : { skus: option.skus, question: null, options: null };
    },
    goBack() {
      if (this.history.length > 0) {
        this.history.pop();

        if (this.history.length === 0) {
          this.currentNode = treeData;
        } else {
          let currentNode = treeData;
          for (const selection of this.history) {
            if (currentNode && currentNode.options) {
              const option = currentNode.options.find(
                (opt) => opt.label === selection.label
              );
              if (option) {
                currentNode = option.next
                  ? option.next
                  : { skus: option.skus, question: null, options: null };
              }
            }
          }
          this.currentNode = currentNode;
        }
      }
    },
    reset() {
      this.currentNode = treeData;
      this.history = [];
    },
  },
};
</script>
