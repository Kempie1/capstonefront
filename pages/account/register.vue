<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register for an account
                </h2>
            </div>
            <div v-if="errorMessage" class="text-red-500 mt-2">
                {{ errorMessage }}
            </div>
            <form @submit.prevent="registerUser" class="mt-8 space-y-6">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email" class="sr-only">Email address</label>
                        <input type="email" id="email" v-model="user.email" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-t-md focus:z-10 sm:text-sm"
                            placeholder="Email address">
                    </div>
                    <div>
                        <ul class="list-disc pl-5 space-y-1">
    <li :class="{'text-green-500': passwordRequirements.minLength, 'text-red-500': !passwordRequirements.minLength}">
      <span v-if="passwordRequirements.minLength">✅</span>
      <span v-else>❌</span>
      Password must be at least 8 characters long
    </li>
    <li :class="{'text-green-500': passwordRequirements.minLowercase, 'text-red-500': !passwordRequirements.minLowercase}">
      <span v-if="passwordRequirements.minLowercase">✅</span>
      <span v-else>❌</span>
      Password must contain at least one lowercase letter
    </li>
    <li :class="{'text-green-500': passwordRequirements.minUppercase, 'text-red-500': !passwordRequirements.minUppercase}">
      <span v-if="passwordRequirements.minUppercase">✅</span>
      <span v-else>❌</span>
      Password must contain at least one uppercase letter
    </li>
    <li :class="{'text-green-500': passwordRequirements.minNumbers, 'text-red-500': !passwordRequirements.minNumbers}">
      <span v-if="passwordRequirements.minNumbers">✅</span>
      <span v-else>❌</span>
      Password must contain at least one number
    </li>
    <li :class="{'text-green-500': passwordRequirements.minSymbols, 'text-red-500': !passwordRequirements.minSymbols}">
      <span v-if="passwordRequirements.minSymbols">✅</span>
      <span v-else>❌</span>
      Password must contain at least one symbol
    </li>
  </ul>
    <label for="password" class="sr-only">Password</label>
    <input type="password" id="password" v-model="user.password" required
           class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
           placeholder="Password">
    
  </div>
                    <div>
                        <label for="confirm-password" class="sr-only">Confirm Password</label>
                        <input type="password" id="confirm-password" v-model="user.confirmPassword" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Confirm Password">
                        <p v-if="passwordMismatch && user.password && user.confirmPassword"
                            class="text-red-500 text-xs italic">Passwords do not match.</p>
                    </div>
                </div>
                <button type="submit" :disabled="isLoading"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span v-if="isLoading" class="pr-2">Loading...</span>
                    Register
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>

const { signUp } = useAuth();

const user = ref({
    email: '',
    password: '',
    confirmPassword: '',
});

const isLoading = ref(false);
const passwordMismatch = ref(false);
const errorMessage = ref('');

const passwordRequirements = computed(() => {
    const minLength = 8;
    const minLowercase = /[a-z]/;
    const minUppercase = /[A-Z]/;
    const minNumbers = /[0-9]/;
    const minSymbols = /[^A-Za-z0-9]/;

    return {
        minLength: user.value.password.length >= minLength,
        minLowercase: minLowercase.test(user.value.password),
        minUppercase: minUppercase.test(user.value.password),
        minNumbers: minNumbers.test(user.value.password),
        minSymbols: minSymbols.test(user.value.password),
    };
});

watch([() => user.value.password, () => user.value.confirmPassword], ([newPassword, newConfirmPassword]) => {
    passwordMismatch.value = newPassword && newConfirmPassword && newPassword !== newConfirmPassword;
});

async function registerUser() {
    errorMessage.value = '';
    if (!Object.values(passwordRequirements.value).every(requirement => requirement)) {
        alert("Password does not meet the requirements.");
        return;
    }
    if (passwordMismatch.value) {
        alert("Passwords do not match.");
        return;
    }
    try {
        await signUp({ email: user.value.email, password: user.value.password }, {}, {preventLoginFlow: true});
        navigateTo('/account/login');
    } catch (error) {
        console.error("Registration failed:", error);
        errorMessage.value = "Registration failed: " + (error.response?.data?.message || error.message || "Unknown error");

    }
}
</script>