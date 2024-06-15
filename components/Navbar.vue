<script setup lang="ts">
const { keycloak, authState } = useKeycloak();

function login() {
  keycloak.login();
}

function logout() {
  keycloak.logout();
}
</script>
<template>
    <nav class="bg-blue-500 p-4">
        <ul class="flex justify-between items-center">
            <div class="flex space-x-4">
                <li class="mr-6">
                    <NuxtLink class="text-white text-lg hover:text-gray-300" to="/">Home</NuxtLink>
                </li>
                <li class="mr-6 relative">
                    <HeadlessPopover as="div" class="relative inline-block text-left">
                        <HeadlessPopoverButton class="text-white text-lg hover:text-gray-300">
                            Categories
                        </HeadlessPopoverButton>
                        <HeadlessPopoverPanel v-slot="{ close }"
                            class="absolute bg-white shadow-md mt-2 w-max rounded-md overflow-hidden z-10 grid grid-cols-4">
                            <div v-for="(value) in CategoriesList">
                                <NuxtLink :to="{ name: 'categories-category', params: { category: value } }"
                                    @click="close" class="text-black text-lg hover:text-gray-700 block px-4 py-2"
                                    :class="{ 'bg-blue-500': active }">
                                    {{ value }}
                                </NuxtLink>
                            </div>
                        </HeadlessPopoverPanel>
                    </HeadlessPopover>
                </li>
            </div>
            <div class="flex flex-1 mx-8 relative">
                <input type="text" class="w-full p-2 rounded" placeholder="Search..." />
            </div>
            <div class="flex space-x-4">
                <li>
                    <NuxtLink class="text-white text-lg hover:text-gray-300" to="/cart">
                    <Icon name="ion:cart" class="text-white text-3xl" />
                </NuxtLink>
                </li>
                <li>
                    <NuxtLink class="text-white text-lg hover:text-gray-300" to="/account">
                        <Icon name="ion:person-circle" class="text-white text-3xl" />
                    </NuxtLink>

                </li>
            </div>
        </ul>
    </nav>
</template>