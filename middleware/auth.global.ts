export default defineNuxtRouteMiddleware(to => {
  // Simple auth middleware example
  const accessToken = useCookie("access_token").value;

  // Uncomment to enable auth protection
  // if (!accessToken && to.path !== "/auth") {
  //   return navigateTo("/auth");
  // }
});
