<template>
  <div>
    <NuxtLoadingIndicator/>
    <!-- navBar -->
    <nav class="bg-blue-500 p-4">
      <ul class="flex">
        <li class="mr-6">
          <router-link class="text-white text-lg hover:text-gray-300" to="/">Home</router-link>
        </li>
        <li class="mr-6">
          <router-link class="text-white text-lg hover:text-gray-300" to="/about">About</router-link>
        </li>
        <li class="mr-6">
          <router-link class="text-white text-lg hover:text-gray-300" to="/contact">Contact</router-link>
        </li>
      </ul>
    </nav>
    <!-- Content -->
    <div>
      <NuxtPage />
    </div>
  </div>
</template>