<template>
  <section>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="products.length">
      <ul>
        <product-item
          v-for="prod in products"
          :key="prod.id"
          :id="prod.id"
          :title="prod.title"
          :image="prod.image"
          :description="prod.description"
          :price="prod.price"
        ></product-item>
      </ul>
    </div>
    <div v-else>
      <spinner />
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import Spinner from '../components/Spinner/Spinner.vue';
import ProductItem from '../components/products/ProductItem.vue';

export default {
  components: {
    Spinner,
    ProductItem,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('prods/loadProducts');
    });
    const products = computed(() => store.getters['prods/productsList']);
    const error = computed(() => store.getters['prods/error']);

    return {
      products,
      error
    }
  }
};
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 40rem;
  }
  .error {
    text-align: center;
  }
</style>