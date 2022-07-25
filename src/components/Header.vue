<template>
  <div class="header">
    <h3>Товаров в корзине на: {{ stringifiedCartPrice}} {{ currency }}</h3>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'Header',
  data() {
    return {
      cartPrice: 0,
    };
  },
  computed: {
    ...mapState({
      cart: state => state.cart,
      currency: state => state.currency,
    }),
    stringifiedCartPrice() {
      return this.cartPrice.toFixed(2);
    }
  },
  watch: {
    cart: {
      handler: function (cart) {
        this.cartPrice = cart.reduce(
          (totalCost, item) => totalCost + item.price * item.amount, 0);
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
  .header {
    padding: 10px;
    background: #e5e5e5;
  }
</style>
