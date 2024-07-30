<script setup lang="ts">
const route = useRoute();
const params = reactive(new URLSearchParams());
for (const key in route.query) {
  params.set(key, route.query[key]);
}

const products = ref<FlattenProduct[]>([]);
const error = ref(null);
const currentPage = ref(route.query.page ? parseInt(route.query.page as string) : 1);
const totalPages = ref(1);
const categoryCounts = ref<{ [key: string]: number }>({});
const characteristicCounts = ref<{ [characteristicName: string]: { [value: string]: number } }>({});
const expandedCategories = ref([]);
const runtimeConfig = useRuntimeConfig()


const onParamsChange = async () => {
  const response = await $fetch<getProductResponse>(runtimeConfig.public.API_URL+`/products/search?${params.toString()}`);
  products.value = response.products || [];
  // error.value = response.error.value;
  totalPages.value = response.totalPages || 1;
  categoryCounts.value = response.categoryCounts || {};
  characteristicCounts.value = response.characteristicCounts || {};
};

onParamsChange();

watch(() => route.query, (newQuery) => {
  console.log("Query changed", newQuery);
  for (const key in newQuery) {
    if (newQuery[key]) {
      params.set(key, String(newQuery[key]));
    } else {
      params.delete(key);
    }
  }
  for (const key of params.keys()) {
    if (!(key in newQuery)) {
      params.delete(key);
    }
  }
  console.log(params)
  onParamsChange();
}, { deep: true });

async function goToPage(page: number) {
  currentPage.value = page;
  await navigateTo({
    path: '/search',
    query: {
      page: page,
      keyword: route.query["keyword"]
    }
  })
}

async function applyFilter(filterType: string, filterValue: string) {
  let filters: { [key: string]: string[] } = {};
  let category
  if (params.get("filters")) {
    try {
      const filtersParam = params.get("filters");
      filters = filtersParam ? JSON.parse(decodeURIComponent(filtersParam)) : {};
    } catch (error) {
      console.error('Failed to parse filters from params', error);
      filters = {};
    }
  }
  if (filterType === 'category') {
    // For category filters, replace any existing value with the new one
    category = filterValue;
  } else {
    // For other filters, add or remove the value from the array
    if (!filters[filterType]) {
      filters[filterType] = [filterValue];
    } else {
      const index = filters[filterType].indexOf(filterValue);
      if (index === -1) {
        filters[filterType].push(filterValue);
      } else {
        filters[filterType].splice(index, 1);
      }
    }
  }
  const updatedParams = new URLSearchParams(params.toString());
  updatedParams.set('page', '1');
  let encodedFilters
  if (Object.keys(filters).length !== 0) {
    encodedFilters = encodeURIComponent(JSON.stringify(filters));
    updatedParams.set('filters', encodedFilters);
  }
  if (category)
  {
    if(updatedParams.get('category'))
    {
      updatedParams.delete('category')
    }
    else
      updatedParams.set('category', category);
  }
  // Navigate to the updated URL
  await navigateTo({ path: '/search', query: Object.fromEntries(updatedParams) })
}

function toggleCategory(category) {
  const index = expandedCategories.value.indexOf(category);
  if (index === -1) {
    // If the category is not currently expanded, add it to the array
    expandedCategories.value.push(category);
  } else {
    // If the category is already expanded, remove it from the array
    expandedCategories.value.splice(index, 1);
  }
}

async function clearFilters() {
  // Reset filters and category
  if (params.get("filters")) {
    try {
      const updatedParams = new URLSearchParams(params.toString());
      updatedParams.delete("filters")
      await navigateTo({ path: route.path, query: Object.fromEntries(updatedParams) });
    } catch (error) {
      console.error('Failed to parse filters from params', error);
    }
  }
}

</script>

<template>
  <section class="mt-10">
    <div class="flex flex-col md:flex-row">
      <!-- Sidebar for filters -->
      <div class="sidebar w-1/6 p-4 max-h-screen overflow-y-auto md:block">
        <h2 class="text-lg font-bold">Filters</h2>
        <button @click="clearFilters" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Clear Filters
        </button>
        <div>
          <h2 class="cursor-pointer text-blue-500 hover:text-blue-700" @click="toggleCategory('Categories')">Categories
          </h2>
          <div v-if="expandedCategories.includes('Categories')">
            <div v-for="(count, category) in categoryCounts" :key="category" class="py-1">
              <label class="flex items-center space-x-2">
                <input type="checkbox" class="form-checkbox" :value="category"
                  @change="applyFilter('category', category)">
                <span>{{ category }} ({{ count }})</span>
              </label>
            </div>
          </div>

          <!-- Filters WIP -->
          <!-- <div v-for="(values, characteristic) in characteristicCounts" :key="characteristic">
            <h2 class="cursor-pointer text-blue-500 hover:text-blue-700 mt-4" @click="toggleCategory(characteristic)">{{
              characteristic }}</h2>
            <div v-if="expandedCategories.includes(characteristic)">
              <div v-for="(count, value) in values" :key="value" class="py-1">
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="form-checkbox" :value="value"
                    @change="applyFilter(characteristic, value)">
                  <span>{{ value }} ({{ count }})</span>
                </label>
              </div>
            </div>
          </div> -->
        </div>
      </div>

      <!-- Main content -->
      <div v-if="products" class="flex-1 grid grid-cols-4 gap-4">
        <div v-for="item in products">
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
        @click="goToPage(currentPage - 1)" :disabled="currentPage <= 1">
        Previous
      </button>

      <span v-if="currentPage >= 2" class="border-black border-y-2 p-1 cursor-pointer hover:bg-gray-200"
        @click="goToPage(1)">
        1
      </span>

      <span class="border-black border-2 p-1 w-12 text-center" :class="{ 'bg-blue-500 text-white': true }">
        {{ currentPage }}
      </span>

      <span v-if="currentPage <= totalPages - 1" class="border-black border-y-2 p-1 cursor-pointer hover:bg-gray-200"
        @click="goToPage(totalPages)">
        {{ totalPages }}
      </span>

      <button
        class="border-black border-2 p-1 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
        @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages">
        Next
      </button>
    </div>
  </section>
</template>
