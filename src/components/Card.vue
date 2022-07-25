<template>
    <div class="card">
      <p class="card-title">{{ product.title }}</p>
      <img class="card-image" :src="product.image" :alt="product.title">
      <p class="card-price">Цена: {{ product.price }} {{ currency }}</p>
      <form @submit.prevent="handleSubmit">
        <input :value="amount" @input="handleInput" type="number" min="1" required>
        <span>кг</span>
        <button class="card-btn"> В корзину </button>
      </form>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    name: 'Card',
    props: {
      product: {
        type: Object,
        required: true,
        default: {},
      },
    },
    data() {
        return {
          amount: '',
        }
    },
    computed: {
      ...mapState({
        currency: state => state.currency,
      }),
    },
    methods: {
      handleInput(event) {
        this.amount = event.target.value;
      },
      handleSubmit(event) {
        const {title, price} = this.product;
        const amount = this.amount;

        this.$store.commit('addToCart', {title, price, amount});
        this.amount = '';
      }
    }
}
</script>

<style scoped>
  .card {
    border: 1px solid #908888;
    border-radius: 5px;
    text-align: center;
    padding: 10px;
  }
  .card-image {
    width: 100%;
  }
  .card-btn {
    padding: 5px;
    margin: 5px;
  }
</style>