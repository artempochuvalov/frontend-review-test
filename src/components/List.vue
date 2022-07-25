<template>
  <div class="product-list">
    <!-- Инлайновые стили являются нехорошей практикой, так как переопределить их возможно только с помощью important. -->
    <div class="card" v-for="(product, index) in products" v-bind:key="index" :style="{width: cardsWidth + '%'}">
      <!-- Здесь содержимое карточки => по хорошему, необходима отдельная компонента,
       что также поможет в расширении приложения -->
      <p class="card-title">{{ product.title }}</p>
      <!-- // Незаполнен атрибут alt - проблемы c доступностью. -->
      <img class="card-image" :src="product.image" alt="">
      <p class="card-price">Цена: {{ product.price }} {{ currency }}</p>
      <!-- // проблема с ref, id и прочим (см. ниже) -->
      <div>
        <!-- Пользователь может выбрать отрицательные килограмы. Решение - использование min в атрибутах -->
        <input type="number" ref="amount" :id="product.id">
        <span>кг</span>
      </div>

      <button @click="addToCart(product)"> В корзину </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currency: String,
  },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    // Очень странная функция по своей консепции:
    // 1) Она будет вычислена только 1 раз, так как count и window.innerWidth никак не относится ни к компоненте, ни к Vue,
    // 2) в css существуют mediaquery,
    // 3) Работает не так как необходимо (см. ниже),
    // Решение проблемы - в использовании mediaquery.
    cardsWidth() {
      let width = window.innerWidth;
      let count = 1;
      // Width принимает числовое значение, поэтому условие не сработает;
      // решение - сравнение по числовому значению.
      if (width > '840px') {
        count = 3;
      // Получается, что при 420px и 840px условие не выполняется (строгие сравнения)
      } else if ((width > '420px' && width < '840px')) {
        count = 2;
      }
      return 100 / count;
    },
  },
  methods: {
    startPricesMonitoring() {
      // Интервал запускается раз в секунду (по тз, должно быть раз в 2 секунды) + когда сработает хук created, 
      // запрос на получение данных будет выполнен только через секунду;
      // setInterval не гаранитурет запуск функции получения списка раз в 2 секунды (из-за времени выполнения колбэка),
      // поэтому может возникнуть ситуация, при которой запросы на сервер отправляются почти что моментально.
      // Решение - рекурсивный setTimeout.
      setInterval(this.getList, 1000);
    },
    // Странное разделение action от state: состояние находится в компоненте, action во Vuex.
    // Получается, что Vuex неоправдано используется. Решение - вынести products во Vuex.
    async getList() {
      let data = await this.$store.dispatch('getProductsList');
      this.products = data;
    },
    // Лишние манипуляции с VirtualDom + "пробежка" по всем input-ам + непонятный синтаксис.
    // Логичным решением является вынесение карточки продукта в отедельную компоненту,
    // использование form и двустороннего связывания с  отслеживанием событий submit и input,
    // что уберёт лишние использования ref и добавит семантики.
    addToCart(product) {
      let amount = this.$refs.amount.find((input) => input.id === product.id).value;
      // Для поддержания стилистики кода, логично воспользоваться деструктуризацией и
      // поместить значения price и title в объект через запятую (по аналогии с amount).
      let data = {
        amount,
        price: product.price,
        title: product.title,
      };
      // Практика изменения элементов родителя из потомка "пахнет не очень хорошо" +
      // страдает масшабируемость проекта (если мы захотим поместить компоненту в другое место?).
      // Решение: использование $emit и отслеживать событие в родительском компоненте, а ещё оптимальнее - Vuex;
      this.$parent.cart.push(data);
    },
  },
  created() {
    this.startPricesMonitoring();
  },
};
</script>

// Использование scoped было бы нелишним.
<style>
  .product-list {
    padding: 10px;
  }

  .card {
    /* Адаптивность с помощью inline-block и подгонка ширины - неоптимальная практика, учитывая наличие display: flex-box */
    display: inline-block;
    width: 100%;
    border: 1px solid #908888;
    border-radius: 5px;
    text-align: center;
    padding: 10px;
  }
  .card-image {
    width: 100%;
  }
  /* Задаём стиль для всех кнопок, отсутствует scoped у style => данный стиль применится ко всем кнопкам на странице */
  button {
    padding: 5px;
    margin: 5px;
  }

</style>
