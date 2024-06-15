<script setup>
provideHeadlessUseId(() => useId());
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <!-- navBar -->
    <AppNavbar />
    <!-- Content -->
    <div>
      <NuxtPage />
    </div>
  </div>
</template>
