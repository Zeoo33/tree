
<template>
  <div>
    <button @click="goBack" :disabled="history.length === 0">Go Back</button>
    <button @click="reset" :disabled="history.length === 0">Reset</button>

    <div v-if="currentNode && currentNode.question">
      <Question
        :question="currentNode.question"
        :options="currentNode.options"
        @option-selected="handleOptionSelected"
      />
    </div>

    <div v-if="history.length > 0">
      <h2>Your Selections:</h2>
      <ul>
        <li v-for="(selection, index) in history" :key="index">
          {{ selection.question }}: {{ selection.label }}
        </li>
      </ul>
    </div>

    <div v-if="currentNode && currentNode.skus && currentNode.skus.length > 0">
      <h2>Recommended Products:</h2>
      <ul>
        <li v-for="sku in currentNode.skus" :key="sku">
          {{ sku }} 
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Question from '~/components/Question.vue';
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
      // Store the selection in history
      this.history.push({
        question: this.currentNode.question, 
        label: option.label 
      });

      // Move to the next node based on the selection
      this.currentNode = option.next
        ? option.next
        : { skus: option.skus, question: null, options: null };
    },
    goBack() {
      if (this.history.length > 0) {
        this.history.pop(); // Remove the last selection from history

        // If history is empty, go back to the root
        if (this.history.length === 0) {
          this.currentNode = treeData;
        } else {
          // Otherwise, traverse the tree based on the history
          let currentNode = treeData;
          for (let i = 0; i < this.history.length; i++) {
            const selection = this.history[i];
            
            if (currentNode && currentNode.options) {
              const option = currentNode.options.find((opt) => opt.label === selection.label);
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
    }
  },
};
</script>
