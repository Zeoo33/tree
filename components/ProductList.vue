
<template>
  <div>
    <h2>Recommended Products</h2>
    <ul>
      <li v-for="sku in skus" :key="sku">
        <a :href="getProductLink(sku)" target="_blank">{{ sku }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    skus: Array
  },
  methods: {
    getProductLink(sku) {
      return `https://your-magento-store.com/product/${sku}`;
    }
  }
};
</script>
