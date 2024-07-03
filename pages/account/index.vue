<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { status, data, token, lastRefreshedAt } = useAuth()

console.log(status.value) // Session status: `unauthenticated`, `loading`, `authenticated`
console.log(data.value) // Session data, e.g., expiration, user.email, ...

// await signIn() // Sign in the user
// await signOut() // Sign out the user
const handleSignOut = async () => {
  await signOut()
}

</script>

<template>
  <div>
  <h1>Account page</h1>
  <pre>Status: {{ status }}</pre>
    <pre>Data: {{ data || 'no session data present, are you logged in?' }}</pre>
    <pre>Last refreshed at: {{ lastRefreshedAt || 'no refresh happened' }}</pre>
    <pre>JWT token: {{ token || 'no token present, are you logged in?' }}</pre>
    <button @click="handleSignOut">Sign Out</button>
</div>
</template>
