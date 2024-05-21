<template>
  <div>
    <NuxtLoadingIndicator />
    <!-- navBar -->
    <nav class="bg-blue-500 p-4">
      <ul class="flex justify-between items-center">
        <div class="flex space-x-4">
          <li class="mr-6">
            <NuxtLink class="text-white text-lg hover:text-gray-300" to="/">Home</NuxtLink>
          </li>
          <li class="mr-6 relative"  v-click-outside="showCategories">
            <button @click="showCategories = !showCategories"
              class="text-white text-lg hover:text-gray-300">Categories</button>
            <ul v-if="showCategories" class="absolute left-0 flex flex-col space-y-2 mt-2 bg-gray-200 p-4 rounded">
              <li v-for="(value, name) in CategoriesEnum" :key="name">
                <NuxtLink to="/" class="text-black text-lg hover:text-gray-700">{{ value }}</NuxtLink>
              </li>
            </ul>
          </li>
        </div>
        <div class="flex flex-1 mx-8 relative">
          <input type="text" class="w-full p-2 rounded" placeholder="Search..." />
        </div>
        <div class="flex space-x-4">
          <li>
            <Icon name="ion:cart" class="text-white text-3xl" />
          </li>
          <li>
            <Icon name="ion:person-circle" class="text-white text-3xl" />
          </li>
        </div>
      </ul>
    </nav>
    <!-- Content -->
    <div>
      <NuxtPage />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCategories: false,
    };
  },
};
</script>