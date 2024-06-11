<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
})
</script>

<template>
    <h1>Account page</h1>
    <div> 
      <User />
    </div>
</template>