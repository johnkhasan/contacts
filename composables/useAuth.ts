export default function useAuth() {
  const accessToken = useCookie("access_token");
  const refreshToken = useCookie("refresh_token");

  // Get current access token
  function getAccessToken(): string | null {
    return accessToken.value || null;
  }

  // Refresh access token
  async function refreshAccessToken(): Promise<boolean> {
    if (!refreshToken.value) {
      return false;
    }

    try {
      if (refreshToken.value) {
        // const body = {
        //   refresh: refreshToken.value as string,
        // };
        // // TODO: Implement refresh token logic using your API
        // const { data, error } = await useApiService().Auth.AuthController_refresh(body);

        // if (error.value || !data.value) {
        //   // Clear tokens on failure
        //   clearTokens();
        //   return false;
        // }
        // // Update tokens
        // accessToken.value = data.value.access;
        // refreshToken.value = data.value.refresh;

        return true;
      } else {
        // Clear tokens
        clearTokens();
        return false;
      }
    } catch {
      clearTokens();
      return false;
    }
  }

  function clearTokens() {
    useCookie("access_token", { maxAge: -1 }).value = "";
    useCookie("refresh_token", { maxAge: -1 }).value = "";
  }

  return {
    getAccessToken,
    refreshAccessToken,
    clearTokens
  };
}
