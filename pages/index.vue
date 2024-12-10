<template>
    <div class="p-10 bg-background min-h-screen text-gray-800">
      <!-- Breadcrumbs (Visible on medium screens and up) -->
      <div v-if="history.length" class="mb-6 hidden md:block">
        <div class="mt-2 text-warm-gray breadcrumbs">
          <ul class="flex flex-wrap items-center">
            <!-- Start Over button -->
            <li class="flex items-center mr-2">
              <button @click="reset" class="p-1 rounded-full hover:bg-gray-200 focus:outline-none" title="Start over" aria-label="Start over">
                <!-- Home icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </button>
            </li>
            <!-- Breadcrumb items -->
            <li v-for="(selection, index) in history" :key="selection.optionId" class="flex items-center whitespace-nowrap">
              <span class="text-white bg-gray-900 rounded-full px-2 py-1 text-xs mr-2">
                <span class="font-bold">{{ index + 1 }}</span>
              </span>
              <span class="font-bold text-warm-gray cursor-pointer hover:text-orange" @click="goToStep(index)">
                {{ selection.label }}
              </span>
              <span v-if="index < history.length - 1" class="mx-2">&rarr;</span>
            </li>
          </ul>
        </div>
      </div>
  
      <!-- Current Question -->
      <div v-if="currentNode?.question" class="mb-6 bg-background rounded-lg">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          {{ currentNode.question }}
        </h1>
        <div class="flex flex-wrap max-w-[600px] ml-0 mr-auto">
          <button 
            v-for="(option, index) in currentNode.options" 
            :key="option.id" 
            @click="handleOptionSelected(option)" 
            class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow m-2 text-sm"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
  
      <!-- Recommended Products -->
      <div v-if="currentNode?.skus?.length">
        <h2 class="text-xl font-semibold text-gray-900">Recommended Products:</h2>
        <ul class="list-disc pl-5 mt-2 text-orange">
          <li v-for="sku in currentNode.skus" :key="sku" class="font-medium">
            {{ sku }}
          </li>
        </ul>
      </div>
  
      <!-- User's Selection History  -->
      <div v-if="history.length" class="mb-6">
        <h2 class="mt-4 text-xl font-semibold text-gray-900">Your selection:</h2>
        <ul class="mt-2 text-warm-gray list-disc pl-5">
          <li v-for="(item, index) in history" :key="item.optionId">
            <span class="font-medium text-gray-900">
              {{ item.question }}
            </span>
            <span class="text-gray-600">
              &nbsp;&rarr;&nbsp; {{ item.label }}
            </span>
          </li>
        </ul>
      </div>
  
      <!-- Navigation Buttons -->
      <div v-if="history.length" class="mt-6 flex space-x-4 justify-center md:justify-start">
        <button @click="goBack" class="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg">
          Previous Step
        </button>
        <button @click="reset" class="button-primary">
          Start Over
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
        history: [], // User's selection history
      };
    },
    methods: {
      // Extracted method for getting the next node
      getNextNode(option) {
        return option.next || { skus: option.skus };
      },
      // Handle option selection and navigate to the next node
      handleOptionSelected(option) {
        this.history.push({
          question: this.currentNode.question,
          optionId: option.id, // Use option.id instead of option.label
          label: option.label,  // Store the label for display purposes
        });
        this.currentNode = this.getNextNode(option);
      },
      // Go back one step in the decision tree
      goBack() {
        this.goToStep(this.history.length - 2);
      },
      // Navigate to a specific step in the history
      goToStep(index) {
        if (index < 0) return this.reset();
  
        this.history = this.history.slice(0, index + 1);
        let currentNode = treeData;
        for (const selection of this.history) {
          const option = currentNode.options.find(opt => opt.id === selection.optionId);
          if (!option) {
            // Handle the error: reset or show a message
            return this.reset();
          }
          currentNode = this.getNextNode(option);
        }
        this.currentNode = currentNode;
      },
      // Reset the decision tree to the initial state
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
    margin-bottom: 0.5rem;
    /* Adjust spacing for vertical layout */
  }
  </style>
  