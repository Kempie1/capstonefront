<script setup lang="ts">
// const { status, data } = useAuth()
const route = useRoute();
const params = reactive(new URLSearchParams());
if (!route.query.token || !route.query.id) {
    console.error("Required parameters are missing.");
    await navigateTo("/")
  } else {
      params.set(token, route.query[token]);
      params.set(id, route.query[id]);
  }
  
  const { error, data } = await useFetch<{ validToken: boolean }>(
  "http://localhost:3000/auth/verify-password-reset", {
    headers: {
      "Content-Type": "application/json",
      "authorization": ""+token.value,
    },
    body: JSON.stringify({
      token: token,
      id: id,
    }),
})
if (error.value) {
  console.log("Error!!", error.value);
}

// async function removeFromCart(productId: string){
// if (status.value === "authenticated") {
//   $fetch(
//   "http://localhost:3000/cart/remove", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "authorization": ""+token.value,
//     },
//     body: JSON.stringify({
//       productId: productId,
//     }),
//   })
//   navigateTo("/cart")
// }
// else navigateTo("/account/login")
// }
</script>

<template>
    <div>
        <h1>Reset Password</h1>
        <!-- Add your reset password form here -->
    </div>
</template>

