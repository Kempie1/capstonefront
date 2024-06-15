<script setup lang="ts">
const route = useRoute();
const { error, data } = await useFetch(
  "http://localhost:3000/products/product/" + route.params.id,
);
if (error.value) {
  console.log("Error!!", error);
}
let flatData = flattenProduct(data.value);
</script>
<template>
  <section>
    <div class="grid grid-cols-2 gap-1">
      <div>
        <nuxt-img :src="flatData.imgUrl" alt="Product Image" />
      </div>
      <div>
        <h1>{{ flatData.name }}</h1>
        <p>{{ flatData.price }}$</p>
        <ul v-for="item in flatData.characteristics">
          <li>{{ item.characteristicName }} : {{ item.value }}</li>
        </ul>
      </div>
    </div>
    <!-- <p>{{ item.name }}</p> -->
  </section>
</template>
