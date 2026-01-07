import { platformRoutes } from "@/constants";
import { navigation } from "@/navigation"
import { usePermissionStore } from "@/store/permissionsStore";

export default defineNuxtRouteMiddleware((to) => {
  const { t } = useNuxtApp().$i18n;
  const accessToken = useCookie("access_token").value;

  if (!accessToken && to.path !== "/auth") {
    return navigateTo("/auth");
  }

  if (to.path === "/auth") return;

  const systemsCookie = useCookie("systems").value;
  const systems = Number(systemsCookie ?? 0);

  const routeName = to.name?.toString() ?? "";

  const matched = platformRoutes.find(p => p.name === routeName);

  if (!matched) return;

  const hasPermission = (systems & matched.permission) === matched.permission;

  if (!hasPermission) {
    return navigateTo("/404");
  }
});