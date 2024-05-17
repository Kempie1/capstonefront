<script setup lang="ts">
const { error, data } = useFetch('http://localhost:3000/products/category?page=1&category=cpu&sortBy=LowHigh')
console.log(data)
</script>
<template>
  <section>
    <h1>Products Page</h1>
    <div class="grid grid-cols-4 gap-4" v-if="data">

      <div v-for="item in data">
        <!-- <a :href="'http://localhost:3000/products/product/'+ item.id"> -->
        <NuxtLink :to="'/product/' + item.id">
          <nuxt-img :src="item.imgUrl" alt="Product Image" />
          <p>{{ item.name }}</p>
          <p>{{ item.productCharacteristics[0].value }}$</p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>