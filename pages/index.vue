<template>
  <div class="p-10 bg-background min-h-screen text-gray-800">
    <div class="mb-4 flex justify-end">
      <select v-model="$i18n.locale" class="bg-white border border-gray-300 rounded px-4 py-2">
        <option value="en-US">{{ $t('english') }}</option>
        <option value="de-DE">{{ $t('german') }}</option>
        <option value="ja-JP">{{ $t('japanese') }}</option>
      </select>
    </div>
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
              {{ $t(selection.label) }}
            </span>
            <span v-if="index < history.length - 1" class="mx-2">→</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Current Question -->
    <div v-if="currentNode?.question" class="mb-6 bg-background rounded-lg">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        {{ $t(currentNode.question) }}
      </h1>
      <div class="flex flex-wrap max-w-[600px] ml-0 mr-auto">
        <button 
          v-for="(option, index) in currentNode.options" 
          :key="option.id" 
          @click="handleOptionSelected(option)" 
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow m-2 text-sm"
        >
          {{ $t(option.label) }}
        </button>
      </div>
    </div>

    <!-- Recommended Products -->
    <div v-if="currentNode?.skus?.length">
      <h2 class="text-xl font-semibold text-gray-900">{{ $t('recommended_products') }}:</h2>
      <ul class="list-disc pl-5 mt-2 text-orange">
        <li v-for="sku in currentNode.skus" :key="sku" class="font-medium">
          {{ sku }}
        </li>
      </ul>
    </div>

    <!-- User's Selection History  -->
    <div v-if="history.length" class="mb-6">
      <h2 class="mt-4 text-xl font-semibold text-gray-900">{{ $t('your_selection') }}:</h2>
      <ul class="mt-2 text-warm-gray list-disc pl-5">
        <li v-for="(item, index) in history" :key="item.optionId">
          <span class="font-medium text-gray-900">
            {{ $t(item.question) }}
          </span>
          <span class="text-gray-600">
             →  {{ $t(item.label) }}
          </span>
        </li>
      </ul>
    </div>

    <!-- Navigation Buttons -->
    <div v-if="history.length" class="mt-6 flex space-x-4 justify-center md:justify-start">
      <button @click="goBack" class="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg">
        {{ $t('previous_step') }}
      </button>
      <button @click="reset" class="button-primary">
        {{ $t('start_over') }}
      </button>
    </div>
  </div>
</template>

<script>
import treeData from '~/assets/json/decision-tree.json';
import { useI18n } from 'vue-i18n';

export default {
  setup() {
      const { locale } = useI18n();
     // Use the default locale on initial load
      locale.value = 'en-US';
      return { locale };
    },
  data() {
    return {
      currentNode: treeData, // Start at the root of the decision tree
      history: [], // User's selection history (array of objects)
    };
  },
  methods: {
    /**
     * Gets the next node in the decision tree based on the selected option.
     * If the option has a 'next' property, it returns the next node.
     * If the option has a 'skus' property, it returns an object with the skus,
     * indicating the end of the decision path.
     *
     * @param {Object} option - The selected option object.
     * @returns {Object} - The next node in the decision tree or an object with skus.
     */
    getNextNode(option) {
      return option.next || { skus: option.skus };
    },

    /**
     * Handles the selection of an option in the decision tree.
     * It adds the current question and selected option to the history,
     * and then updates the currentNode to the next node based on the selected option.
     *
     * @param {Object} option - The selected option object.
     */
    handleOptionSelected(option) {
      this.history.push({
        question: this.currentNode.question,
        optionId: option.id, // Use option.id to uniquely identify the selected option
        label: option.label,  // Store the label for display in the history/breadcrumbs
      });
      this.currentNode = this.getNextNode(option);
    },

    /**
     * Navigates back one step in the decision tree history.
     */
    goBack() {
      this.goToStep(this.history.length - 2);
    },

    /**
     * Navigates to a specific step in the decision tree history.
     *
     * @param {number} index - The index of the step to navigate to (0-based).
     */
    goToStep(index) {
      // If the index is out of bounds (e.g., -1 when the history is empty), reset the tree.
      if (index < 0 || index >= this.history.length) {
        return this.reset();
      }
    
      // Rebuild the history up to the desired step.
      this.history = this.history.slice(0, index + 1);
    
      // Reconstruct the current node by traversing the tree from the root
      // based on the selections in the updated history.
      let currentNode = treeData; // Start from the root of the tree
      for (const selection of this.history) {
        // Find the option in the current node's options that matches the selection's optionId.
        const option = currentNode.options.find(opt => opt.id === selection.optionId);
    
        // If the option is not found (which indicates an invalid state),
        // reset the tree and exit the loop to prevent errors.
        if (!option) {
          console.error("Error: Invalid optionId found in history.", selection.optionId);
          this.reset();
          return;
        }
    
        // Move to the next node based on the selected option.
        currentNode = this.getNextNode(option);
      }
    
      // Update the currentNode to reflect the reconstructed state.
      this.currentNode = currentNode;
    },
    

    /**
     * Resets the decision tree to its initial state (back to the root node).
     */
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