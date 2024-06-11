export default defineNuxtRouteMiddleware((to) => {

    const { keycloak, authState } = useKeycloak();

    // console.log(useRequestURL().host+to.path)
    console.log("authState", authState.value)
    if (authState.value === "unAuthenticated") {
      // return keycloak.login({redirectUri: useRequestURL().origin+to.path});
      return navigateTo('/')
    }
    if (authState.value === "Authenticated") {
      // return keycloak.login({redirectUri: useRequestURL().origin+to.path});
      return navigateTo('/')
    }
    // In a real app you would probably not redirect every route to `/`
    // however it is important to check `to.path` before redirecting or you
    // might get an infinite redirect loop
    if (to.path !== '/') {
      return navigateTo('/')
    }
  })
  