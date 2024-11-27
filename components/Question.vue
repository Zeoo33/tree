
<template>
  <div>
    <h2>{{ question }}</h2>
    <ul>
      <li v-for="option in options" :key="option.label">
        <button @click="$emit('option-selected', option)">
          {{ option.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    question: String,
    options: Array
  }
};
</script>
