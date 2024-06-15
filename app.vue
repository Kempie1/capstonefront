<script setup>
provideHeadlessUseId(() => useId());
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <!-- navBar -->
    <Navbar />
    <!-- Content -->
    <div>
      <NuxtPage />
    </div>
  </div>
</template>
