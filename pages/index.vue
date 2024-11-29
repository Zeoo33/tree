<template>
  <div class="p-6 bg-gray-100 min-h-screen text-gray-800">
    <!-- Selections History -->
    <div v-if="history.length > 0" class="mb-6">
  <!-- <h2 class="text-xl font-semibold text-gray-900">Your Selections:</h2> -->
  <div class="mt-2 text-gray-700 breadcrumbs">
    <ul :class="{ 'flex flex-wrap items-center': !isVertical, 'flex flex-col': isVertical }">
      <!-- Start Over button -->
      <li class="flex items-center mr-2">
        <button 
          @click="reset" 
          class="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
          title="Start over" 
          aria-label="Start over"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </button>
      </li>
      <!-- Breadcrumb items -->
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

    <div v-if="history.length > 0" class="mb-6">
      <h2 class="mt-4 text-xl font-semibold text-gray-900">Your selection:</h2>

      <ul class="mt-2 text-gray-700 list-disc pl-5">
        <li v-for="(item, index) in history" :key="index">
          <span class="font-medium text-gray-900">
            {{ item.question }} 
          </span>
          <span class="text-gray-600">
            &nbsp;&rarr;&nbsp; {{ item.label }}
          </span>
        </li>
      </ul>
    </div>

    <div v-if="history.length > 0" class="mt-6 flex space-x-4">
      <button @click="goBack" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">
        Back
      </button>
      <button @click="reset" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg">
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
