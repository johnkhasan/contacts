
import { platformRoutes } from "@/constants";
import { usePermissionStore } from "@/store/permissionsStore";
import { SystemType } from "@/store/main";

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/') {
    const permissionStore = usePermissionStore();
    const systems = permissionStore.userInfo?.accountRole.systems ?? 0;

    const hasPermission = (required: SystemType) => (systems & required) === required;

    const firstAllowedRoute = platformRoutes.find(p => hasPermission(p.permission));

    if (firstAllowedRoute) {
      return navigateTo(firstAllowedRoute.route);
    } else {
      return navigateTo('/auth');
    }
  }
});
