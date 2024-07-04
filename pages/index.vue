<script setup lang="ts">
const { status, data } = useAuth()
</script>

<template>
  <div>
  <h1>Index page</h1>
  <pre>Status: {{ status }}</pre>
</div>
</template>
