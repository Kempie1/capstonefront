<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { status, token } = useAuth()
const runtimeConfig = useRuntimeConfig()
const isCartEmpty = ref(true)
const messages = ref<string[]>([])

const { error, data } = await useFetch<CartCompatability>(
  runtimeConfig.public.API_URL + "/cart/compatibility", {
  headers: {
    "Content-Type": "application/json",
    "authorization": "" + token.value,
  }
})
if (data.value?.compatibilityIssues) {
  messages.value = data.value.compatibilityIssues
}
if (data.value?.cart) {
  isCartEmpty.value = data.value.cart.cartItems.length === 0
}
if (error.value) {
  console.error("Error!!", error.value);
}

async function removeFromCart(productId: string) {
  if (status.value === "authenticated") {
    $fetch(
      runtimeConfig.public.API_URL + "/cart/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authorization": "" + token.value,
      },
      body: JSON.stringify({
        productId: productId,
      }),
    })
    await refreshNuxtData()
  }
  else navigateTo("/account/login")
}

async function checkout() {
  if (status.value === "authenticated") {
    const checkoutUrl = await $fetch<URL>(
      runtimeConfig.public.API_URL + "/stripe/checkout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": "" + token.value,
      },
    })
    await navigateTo(checkoutUrl, { external: true })
  }
}

</script>

<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <h1 class="text-2xl font-bold mb-6">Cart</h1>
    <div v-if="messages.length" :class="{
      'bg-yellow-100 border-yellow-400 text-yellow-700': !data?.compatibilityStatus,
      'bg-green-100 border-green-400 text-green-700': data?.compatibilityStatus,
      'mb-4 p-4 rounded border': true
    }">
      <ul>
        <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
      </ul>
    </div>
    <div class="text-right mt-4">
      <button :disabled="isCartEmpty" :class="{
        'bg-green-500 hover:bg-green-700': !isCartEmpty,
        'bg-gray-500 cursor-not-allowed': isCartEmpty,
        'text-white font-bold py-4 px-8 text-lg rounded transition-colors duration-150': true
      }" @click="checkout">
        Checkout
      </button>
    </div>
    <div v-if="data.cart" class="space-y-4">
      <div 
      v-for="item in data.cart.cartItems" :key="item.product._id"
        class="flex items-center bg-white shadow-md rounded-lg p-4">
        <NuxtLink :to="'/product/' + item.product.id">
          <nuxt-img :src="item.product.imgUrl" alt="Product Image" class="h-24 w-24 object-cover rounded-md mr-4" />
        </NuxtLink>
        <NuxtLink :to="'/product/' + item.product.id" class="flex-1">
          <div>
            <p class="text-lg font-semibold">{{ item.product.name }}</p>
            <p class="text-gray-600">{{ item.product.price }}$</p>
            <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
          </div>
        </NuxtLink>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-150"
          @click="removeFromCart(item.id)">
          Remove from cart
        </button>

      </div>
    </div>
    <div v-else class="text-center text-gray-500">
      Your cart is empty.
    </div>
  </div>
</template>
