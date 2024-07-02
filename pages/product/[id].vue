<script setup lang="ts">
const route = useRoute();
const { error, data } = await useFetch<FlattenProduct>(
  "http://localhost:3000/products/product/" + route.params.id,
);
if (error.value) {
  console.log("Error!!", error);
}
</script>
<template>
  <section>
    <div class="grid grid-cols-2 gap-1">
      <div>
        <nuxt-img :src="data.imgUrl" alt="Product Image" />
      </div>
      <div>
        <h1>{{ data.name }}</h1>
        <p>{{ data.price }}$</p>
        <ul v-for="item in data.characteristics">
          <li>{{ item.characteristicName }} : {{ item.value }}</li>
        </ul>
      </div>
    </div>
    <!-- <p>{{ item.name }}</p> -->
  </section>
</template>
