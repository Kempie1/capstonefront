<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { status, data, token, lastRefreshedAt, signOut } = useAuth()
const handleSignOut = async () => {
  await signOut({ redirect: false })
  await navigateTo("/")
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
