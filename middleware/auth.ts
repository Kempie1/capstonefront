export default defineNuxtRouteMiddleware((to) => {
  const { keycloak, authState } = useKeycloak();
  console.log("authState", authState.value);
  if (authState.value === "unAuthenticated") {
    return navigateTo("/account");
  }
});
