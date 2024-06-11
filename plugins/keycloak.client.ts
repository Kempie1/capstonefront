import Keycloak from "keycloak-js";
import type { KeycloakConfig } from "keycloak-js";

export default defineNuxtPlugin((nuxtApp) => {
const runtimeConfig = useRuntimeConfig()
  const initOptions: KeycloakConfig = {
    url: runtimeConfig.public.authKeycloakURL,
    realm: runtimeConfig.public.authKeycloakRealm,
    clientId: runtimeConfig.public.authKeycloakId,
  };

  const keycloak = new Keycloak(initOptions);
  console.log(keycloak)
  nuxtApp.$keycloak = keycloak;

  keycloak.init({
    onLoad: "check-sso",
  });
});