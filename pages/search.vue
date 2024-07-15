<script setup lang="ts">
const route = useRoute();
const params = reactive(new URLSearchParams());
for (const key in route.query) {
  params.set(key, route.query[key]);
}

const products = ref<FlattenProduct[]>([]);
const error = ref(null);
const currentPage = ref(route.query.page ? parseInt(route.query.page as string) : 1)
const totalPages = ref(1);

const onParamsChange = async () => {
  const response = await useFetch<getProductResponse>(`http://localhost:3000/products/search?${params.toString()}`);
  products.value = response.data?.value?.products || [];
  error.value = response.error.value;
  totalPages.value = response.data?.value?.totalPages || 1;
};

onParamsChange();

watch(() => route.query, (newQuery) => {
  for (const key in newQuery) {
    params.set(key, newQuery[key]);
  }
  onParamsChange(); 
}, { deep: true });

async function goToPage(page){
  currentPage.value = page;
  navigateTo({
        path: '/search',
        query: {
          page: page,
          keyword: route.query["keyword"]
        }
      })
}

</script>
<template>
  <section class="mt-10">
    <div class="flex">
    <!-- Sidebar for filters -->
    <div class="sidebar w-1/4 p-4">
      <h2>Filters</h2>
      <div>
        <label for="filter1">Categories</label>
        <input type="checkbox" id="filter1" name="filter1">
      </div> 
    </div> 
    <div v-if="products" class="grid grid-cols-4 gap-4">
      <div v-for="item in products">
        <!-- <a :href="'http://localhost:3000/products/product/'+ item.id"> -->
        <NuxtLink :to="'/product/' + item.id">
          <nuxt-img :src="item.imgUrl" alt="Product Image" />
          <p>{{ item.name }}</p>
          <p>{{ item.price }}$</p>
        </NuxtLink>
      </div>
    </div>
  </div>
    <div class="flex justify-center my-4 mb-14 ">
      <button 
    class="border-black border-2 p-1 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200" 
    @click="goToPage(currentPage - 1)" 
    :disabled="currentPage <= 1">
    Previous
  </button>
  
  <span 
    v-if="currentPage >= 2" 
    class="border-black border-y-2 p-1 cursor-pointer hover:bg-gray-200" 
    @click="goToPage(1)">
    1
  </span>
  
  <span 
    class="border-black border-2 p-1 w-12 text-center" 
    :class="{'bg-blue-500 text-white': true}">
    {{ currentPage }}
  </span>
  
  <span 
    v-if="currentPage <= totalPages - 1" 
    class="border-black border-y-2 p-1 cursor-pointer hover:bg-gray-200" 
    @click="goToPage(totalPages)">
    {{ totalPages }}
  </span>
  
  <button 
    class="border-black border-2 p-1 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200" 
    @click="goToPage(currentPage + 1)" 
    :disabled="currentPage >= totalPages">
    Next
  </button>
    </div>
  </section>
</template>
