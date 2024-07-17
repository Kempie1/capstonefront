<script setup lang="ts">
// Get the parameters
const route = useRoute();
const showSuccessMessage = ref(false)
const passwordReset = ref({
  password: '',
  confirmPassword: '',
});

const passwordMismatch = ref(false);


let token = "";
let id = "";
if (!route.query.token || !route.query.id) {
  console.error("Required parameters are missing.");
  await navigateTo("/")
} else {
  token = route.query.token.toString()
  id = route.query.id.toString()
}

//Verify that the token is valid
const { error, data } = await useFetch<{ validToken: boolean }>(
  "http://localhost:3000/auth/verify-password-reset", {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    token: token,
    id: id,
  }),
})
if (error.value) {
  console.log("Error!!", error.value);
}
if (data?.value?.validToken === false) {
  console.error("Invalid token");
  await navigateTo("/")
}

//Reset the password


const passwordRequirements = computed(() => {
  const minLength = 8;
  const minLowercase = /[a-z]/;
  const minUppercase = /[A-Z]/;
  const minNumbers = /[0-9]/;
  const minSymbols = /[^A-Za-z0-9]/;

  return {
    minLength: passwordReset.value.password.length >= minLength,
    minLowercase: minLowercase.test(passwordReset.value.password),
    minUppercase: minUppercase.test(passwordReset.value.password),
    minNumbers: minNumbers.test(passwordReset.value.password),
    minSymbols: minSymbols.test(passwordReset.value.password),
  };
});

watch([() => passwordReset.value.password, () => passwordReset.value.confirmPassword], ([newPassword, newConfirmPassword]) => {
  passwordMismatch.value = !!(newPassword && newConfirmPassword && newPassword !== newConfirmPassword);
});

async function changePassword() {
  if (!Object.values(passwordRequirements.value).every(requirement => requirement)) {
    alert("Password does not meet the requirements.");
    return;
  }
  if (passwordMismatch.value) {
    alert("Passwords do not match.");
    return;
  }
  try {
    $fetch('http://localhost:3000/auth/complete-password-reset', {
      method: 'POST',
      body: JSON.stringify({ 
        token: token,
        id: id,
        password: passwordReset.value.password,
      })
    }).then((response) => {
      if (response) {
        showSuccessMessage.value = true;
      }
    })
    // if (response.status === 201) {
    //     navigate('/login');
    // }
  } catch (error) {
    console.error("Registration failed:", error);
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div  v-if="!showSuccessMessage" class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
      <h1 class="text-xl font-semibold text-center text-gray-800">Reset Password</h1>
      <div v-if="data?.validToken" class="space-y-4">
        <form @submit.prevent="changePassword" class="space-y-6">
          <div>
            <div>
              <div>
                <ul class="list-disc pl-5 space-y-1">
                  <li
                    :class="{ 'text-green-500': passwordRequirements.minLength, 'text-red-500': !passwordRequirements.minLength }">
                    <span v-if="passwordRequirements.minLength">✅</span>
                    <span v-else>❌</span>
                    Password must be at least 8 characters long
                  </li>
                  <li
                    :class="{ 'text-green-500': passwordRequirements.minLowercase, 'text-red-500': !passwordRequirements.minLowercase }">
                    <span v-if="passwordRequirements.minLowercase">✅</span>
                    <span v-else>❌</span>
                    Password must contain at least one lowercase letter
                  </li>
                  <li
                    :class="{ 'text-green-500': passwordRequirements.minUppercase, 'text-red-500': !passwordRequirements.minUppercase }">
                    <span v-if="passwordRequirements.minUppercase">✅</span>
                    <span v-else>❌</span>
                    Password must contain at least one uppercase letter
                  </li>
                  <li
                    :class="{ 'text-green-500': passwordRequirements.minNumbers, 'text-red-500': !passwordRequirements.minNumbers }">
                    <span v-if="passwordRequirements.minNumbers">✅</span>
                    <span v-else>❌</span>
                    Password must contain at least one number
                  </li>
                  <li
                    :class="{ 'text-green-500': passwordRequirements.minSymbols, 'text-red-500': !passwordRequirements.minSymbols }">
                    <span v-if="passwordRequirements.minSymbols">✅</span>
                    <span v-else>❌</span>
                    Password must contain at least one symbol
                  </li>
                </ul>
                <label for="password" class="sr-only">Password</label>
                <input type="password" id="password" v-model="passwordReset.password" required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password">

              </div>
              <div>
                <label for="confirm-password" class="sr-only">Confirm Password</label>
                <input type="password" id="confirm-password" v-model="passwordReset.confirmPassword" required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password">
                <p v-if="passwordMismatch && passwordReset.password && passwordReset.confirmPassword"
                  class="text-red-500 text-xs italic">
                  Passwords do not match.</p>
              </div>
            </div>
          </div>

          <button type="submit"
            class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Reset Password
          </button>
        </form>
      </div>
    </div>
    <div v-else class="w-full max-w-xs p-8 space-y-6 bg-white rounded-lg shadow">
      <div class="bg-green-100 p-4 text-green-700 border border-green-400 rounded">
        Password reset successful.
      </div>
    </div>
  </div>
</template>
