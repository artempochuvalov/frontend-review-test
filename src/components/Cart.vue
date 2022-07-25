<template>
  <div class="cart">
    <h3 class="cart-title">
      Корзина
    </h3>
    <ul class="cart-list">
      <li class="cart-item" v-for="(item, index) in cartToRender" :key="index">
        <h4 class="cart-item__title">
          {{ item.title }}
        </h4>
        <p class="cart-item__price">Цена: {{ item.price }} {{currency}}</p>
        <p class="cart-item__amount">Кол-во: {{ item.amount }}кг</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  computed: {
    ...mapState({
      cart: state => state.cart,
      currency: state => state.currency,
    }),
    cartToRender() {
      return this.cart.slice().reverse();
    },
  },
};
</script>

<style scoped>
  .cart {
    padding-left: 10px;
  }
  .cart-list {
    list-style: none;
  }
  .cart-title {
    margin-bottom: 10px;
  }
  .cart-item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    border-top: 2px solid #dad7cd;
    padding: 10px 5px;
  }
</style>
