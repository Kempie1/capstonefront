<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    async search() {
      await navigateTo({
        path: '/search',
        query: {
          page: 1,
          keyword: this.searchQuery
        }
      })
    },
  },
};
</script>
<template>
  <nav class="bg-blue-500 p-4">
    <ul class="flex justify-between items-center">
      <div class="flex space-x-4">
        <li class="mr-6">
          <NuxtLink class="text-white text-lg hover:text-gray-300" to="/"
            >Home</NuxtLink
          >
        </li>
        <li class="mr-6 relative">
          <HeadlessPopover as="div" class="relative inline-block text-left">
            <HeadlessPopoverButton
              class="text-white text-lg hover:text-gray-300"
            >
              Categories
            </HeadlessPopoverButton>
            <HeadlessPopoverPanel
              v-slot="{ close }"
              class="absolute bg-white shadow-md mt-2 w-max rounded-md overflow-hidden z-10 grid grid-cols-4"
            >
              <div v-for="value in CategoriesList">
                <NuxtLink
                  :to="{
                    name: 'categories-category',
                    params: { category: value },
                  }"
                  class="text-black text-lg hover:text-gray-700 block px-4 py-2"
                  :class="{ 'bg-blue-500': active }"
                  @click="close"
                >
                  {{ value }}
                </NuxtLink>
              </div>
            </HeadlessPopoverPanel>
          </HeadlessPopover>
        </li>
      </div>
        <form class="flex flex-1 mx-8 relative" @submit.prevent="search">
          <input 
          v-model="searchQuery"
          type="search"
          placeholder="Search..." class="w-full p-2 rounded-l" >
          <button type="submit" class="bg-white p-2"><Icon name="ion:search" class="text-black text-2xl" /></button>
      </form>
      <div class="flex space-x-4">
        <li>
          <NuxtLink class="text-white text-lg hover:text-gray-300" to="/cart">
            <Icon name="ion:cart" class="text-white text-3xl" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            class="text-white text-lg hover:text-gray-300"
            to="/account"
          >
            <Icon name="ion:person-circle" class="text-white text-3xl" />
          </NuxtLink>
        </li>
      </div>
    </ul>
  </nav>
</template>
