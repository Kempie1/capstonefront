<script>
const runtimeConfig = useRuntimeConfig()
export default {
    data() {
        return {
            email: '',
            showSuccessMessage: false,
        };
    },
    methods: {
        async submitForm() {
            try {
                $fetch(runtimeConfig.public.API_URL+'/auth/request-password-reset', {
                    method: 'POST',
                    body: JSON.stringify({ email: this.email })
                }).then((response) => {
                    if (response) {
                    this.showSuccessMessage = true;
                }
                })
            } catch (error) {
                console.error('Error sending password reset email:', error);
            }
        }
    },
}


</script>

<template>
    <div class="flex justify-center items-center h-screen bg-gray-100">
        <div class="w-full max-w-xs">
            <h1 class="mb-6 text-center text-2xl font-bold text-gray-700">Forgot Password</h1>
            <div v-if="showSuccessMessage" class="mb-4 p-4 bg-green-100 text-green-700 border border-green-400 rounded">
                If the email exists, a password reset link has been sent.
            </div>
            <form v-if="!showSuccessMessage" @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input type="email" id="email" v-model="email" required
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="flex items-center justify-between">
                    <button type="submit"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Reset Password
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>