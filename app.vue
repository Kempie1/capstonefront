<script setup>
provideHeadlessUseId(() => useId())
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <!-- <HeadlessListbox v-model="selectedPerson"></HeadlessListbox> -->
    <!-- navBar -->
    <nav class="bg-blue-500 p-4">
      <ul class="flex justify-between items-center">
        <div class="flex space-x-4">
          <li class="mr-6">
            <NuxtLink class="text-white text-lg hover:text-gray-300" to="/">Home</NuxtLink>
          </li>
          <li class="mr-6 relative">
            <HeadlessMenu as="div" class="relative inline-block text-left">
              <HeadlessMenu.Button class="text-white text-lg hover:text-gray-300">
                Categories
              </HeadlessMenu.Button>
              <HeadlessMenuItems class="absolute bg-white shadow-md mt-2 w-64 rounded-md overflow-hidden z-10">
                <HeadlessMenuItem v-slot="{ active }" v-for="(value) in CategoriesList">
                  <NuxtLink :to="{ name: 'categories-category', params: { category: value } }" class="text-black text-lg hover:text-gray-700 block px-4 py-2" :class="{ 'bg-blue-500': active }">
                    {{ value }}
                  </NuxtLink>
                </HeadlessMenuItem>
              </HeadlessMenuItems>
            </HeadlessMenu>
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