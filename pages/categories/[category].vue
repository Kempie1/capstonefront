<script setup lang="ts">
const route = useRoute();
const { error, data } = useFetch<getProductResponse>(
  `http://localhost:3000/products/category?page=1&category=${route.params.category}&sortBy=LowHigh`,
);
</script>
<template>
  <section>
    <h1>Products Page</h1>
    <div v-if="data" class="grid grid-cols-4 gap-4">
      <div v-for="item in data">
        <NuxtLink :to="'/product/' + item.id">
          <nuxt-img :src="item.imgUrl" alt="Product Image" />
          <p>{{ item.name }}</p>
          <p>{{ item.price}}$</p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
