export default defineNuxtRouteMiddleware((to) => {
    console.log("authState", authState.value)
    if (authState.value === "unAuthenticated") {
      return navigateTo('/account')
    }
  })
  