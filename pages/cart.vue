<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { status, token } = useAuth()
const route = useRoute();

const { error, data } = await useFetch<Cart>(
  "http://localhost:3000/cart", {
    headers: {
      "Content-Type": "application/json",
      "authorization": ""+token.value,
    }})
if (error.value) {
  console.log("Error!!", error.value);
}

async function removeFromCart(productId: string){
if (status.value === "authenticated") {
  $fetch(
  "http://localhost:3000/cart/remove", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": ""+token.value,
    },
    body: JSON.stringify({
      productId: productId,
    }),
  })
  navigateTo("/cart")
}
else navigateTo("/account/login")
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <h1 class="text-2xl font-bold mb-6">Cart</h1>
    <div v-if="data" class="space-y-4">
      <div v-for="item in data.cartItems" :key="item.product._id" class="flex items-center bg-white shadow-md rounded-lg p-4">
        <nuxt-img :src="item.product.imgUrl" alt="Product Image" class="h-24 w-24 object-cover rounded-md mr-4" />
        <div class="flex-1">
          <p class="text-lg font-semibold">{{ item.product.name }}</p>
          <p class="text-gray-600">{{ item.product.price }}$</p>
          <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
        </div>
        <button @click="removeFromCart(item.product.id)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-150">
          Remove from cart
        </button>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">
      Your cart is empty.
    </div>
  </div>
</template>
