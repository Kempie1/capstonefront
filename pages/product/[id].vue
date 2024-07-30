<script setup lang="ts">
const { status, token } = useAuth()
const route = useRoute();
const runtimeConfig = useRuntimeConfig()
const { error, data } = await useFetch<FlattenProduct>(
  runtimeConfig.public.API_URL+"/products/product/" + route.params.id,
);
if (error.value) {
  console.log("Error!!", error);
}


async function addToCart() {
  if (status.value === "authenticated") {
    $fetch(
      runtimeConfig.public.API_URL+"/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": "" + token.value,
      },
      body: JSON.stringify({
        productId: route.params.id,
      }),
    })
    await navigateTo("/cart")
  }
  else
    await navigateTo("/account/login")
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
        <div>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="addToCart()">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </section>
</template>