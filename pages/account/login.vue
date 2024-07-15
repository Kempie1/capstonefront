<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleSignIn">
          <input type="hidden" name="remember" value="true">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" v-model="email">
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" v-model="password">
            </div>
          </div>
  
          <div class="flex items-center justify-between">
            <!-- <div class="flex items-center"> TODO: Add remember me
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div> -->
  
            <!-- <div class="text-sm">   TODO: Add forgot password page
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div> -->
          </div>
  
          <div>
            <div v-if="errorMessage" class="text-red-500 text-sm">
        {{ errorMessage }}
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span v-if="isLoading" class="pr-2">Loading...</span>
        Sign in
      </button>
          </div>
          <button
    type="button"  
    class="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    @click="handleRegistration"
  >
    Register
  </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  definePageMeta({
    middleware: 'auth',
    auth: {
      unauthenticatedOnly: true,
      navigateAuthenticatedTo: '/account',
    }
  });

  const route = useRoute();
  let callbackUrl = "/account"
  if (route.query.redirect) {
    callbackUrl =  route.query.redirect as string;
  }
  const { signIn } = useAuth();
  const errorMessage = ref('');
  const isLoading = ref(false);
  const email = ref('');
  const password = ref('');     
  
  async function handleSignIn() {
    isLoading.value = true;
    errorMessage.value = '';
    try {
      await signIn({ email: email.value, password: password.value }, {callbackUrl: callbackUrl,  external: true});
        navigateTo(callbackUrl);
    } catch (error) {
  isLoading.value = false;
  if (error.response && error.response.status === 401) {
    errorMessage.value = 'Wrong credentials.';
  } else {
    console.log(error);
    errorMessage.value = error.message || 'An error occurred during sign in.';
  }
}
  }

  function handleRegistration() {
  navigateTo('/account/register');
}
  </script>