<script>
export default {
  name: 'Header',
  props: {
    cart: Array,
    required: true,
    // Странное дефолтное значение для Array.
    default: {},

    currency: String,
  },
  data() {
    return {
      cartPrice: 0,
    };
  },
  watch: {
    // Наблюдаем за массивом => лучше отслеживать через handler и deep: true.
    cart(cart) {
      // val - это явное аккамулирующие значение => логичнее воспользоваться reduce().
      let val = 0;
      cart.forEach((item) => {
        val += item.price * item.amount;
      });
      // Так же имеем дело с числами с плавающей точкой. Из-за их представления в JS, могут возникнуть ситуации,
      // когда пользователю будет выведено число с кучей чисел после запятой => необходимо создать computed свойство,
      // "обрезающее" строковое представление числа до 2 символов после запятой.
      this.cartPrice = val;
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

// Все компоненты были написаны в порядке: template, style и script, здесь же порядок нарушился.
<template>
  <div class="header">
    <h3>Товаров в корзине на: {{ cartPrice }} {{ currency }}</h3>
  </div>
</template>
