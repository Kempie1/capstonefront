import Keycloak from "keycloak-js";

export const useKeycloak = () => {
  const nuxtApp = useNuxtApp();
  // Ensure keycloak is defined before attempting to use it
  const keycloak = nuxtApp.$keycloak as Keycloak | undefined;
  const authState = useState("authState", () => "unAuthenticated");

  if (keycloak) {
    keycloak.onAuthSuccess = () => (authState.value = "authenticated");
    keycloak.onAuthError = () => (authState.value = "error");
  }

  return {
    keycloak,
    authState,
  };
};