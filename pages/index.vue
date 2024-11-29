<template>
  <div class="p-6 bg-gray-100 min-h-screen text-gray-800">
    <!-- Selections History -->
    <div v-if="history.length > 0" class="mb-6">
  <h2 class="text-xl font-semibold text-gray-900">Your Selections:</h2>
  <div class="mt-2 text-gray-700 breadcrumbs">
    <ul :class="{ 'flex flex-wrap items-center': !isVertical, 'flex flex-col': isVertical }">
      <li v-for="(selection, index) in history" :key="index" class="flex items-center whitespace-nowrap">
        <span class="text-gray-400 bg-gray-200 rounded-full px-2 py-1 text-xs mr-2">
           {{ index + 1 }}
        </span>
        <span
          class="font-bold text-orange-500 cursor-pointer hover:underline" 
          @click="goToStep(index)"
        >
          {{ selection.label }}
        </span>
        <span v-if="index < history.length - 1 && !isVertical" class="mx-2">&rarr;</span>
      </li>
    </ul>
  </div>
</div>
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
      <!-- <button 
        @click="goBack" 
        :disabled="history.length === 0"
        class="px-4 py-2 bg-gray-800 text-white rounded disabled:bg-gray-200 disabled:cursor-not-allowed hover:bg-gray-700 transition cursor-pointer" 
      >
        Go Back
      </button> -->
      <button 
        @click="reset" 
        :disabled="history.length === 0"
        class="px-4 py-2 bg-gray-800 text-white rounded disabled:bg-gray-200 disabled:cursor-not-allowed hover:bg-gray-700 transition cursor-pointer" 
      >
        Start over
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
  computed: {
    isVertical() {
      // This is a basic check and can be refined based on your design
      if (typeof window === 'undefined') return false; 
      return window.innerWidth < 768; // Adjust breakpoint as needed
    }
  },
  mounted() {
    window.addEventListener('resize', () => { this.$forceUpdate() }); 
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
      this.goToStep(this.history.length - 2); 
    },
    goToStep(index) {
      if (index < 0) {
        this.reset();
        return;
      }

      this.history = this.history.slice(0, index + 1);

      let currentNode = treeData;
      for (const selection of this.history) {
        const option = currentNode.options.find((opt) => opt.label === selection.label);
        if (option) {
          currentNode = option.next
            ? option.next
            : { skus: option.skus, question: null, options: null };
        }
      }
      this.currentNode = currentNode;
    },
    /*goBack() {
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
    },*/
    reset() {
      this.currentNode = treeData;
      this.history = [];
    },
  },
};
</script>

<style scoped>
.breadcrumbs ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumbs li {
  margin-bottom: 0.5rem; /* Adjust spacing for vertical layout */
}
</style>
