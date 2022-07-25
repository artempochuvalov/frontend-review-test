<template>
  <ul class="product-list">
    <li class="product-item" v-for="(product, index) in products" :key="index">
      <Card :product="product"/>
    </li>
  </ul>
</template>

<script>
import {mapState} from 'vuex';
import Card from './Card.vue';

export default {
  data() {
    return {};
  },
  methods: {
    startPricesMonitoring() {
      const tik = () => {
        this.$store.dispatch('getProductsList');
        setTimeout(tik, 2000);
      }
      setTimeout(tik, 0);
    },
  },
  computed: {
    ...mapState({
      products: state => state.products,
    }),
  },
  created() {
    this.startPricesMonitoring();
  },
  components: { Card },
};
</script>

<style scoped>
  .product-list {
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    list-style: none;
  }
  @media (max-width: 840px) {
    .product-list {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
  }
  @media (max-width: 419px) {
    .product-list {
      grid-template-columns: 1fr;
    }
  }
</style>
