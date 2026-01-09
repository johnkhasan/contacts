import { IconBarChart, IconMap } from "#components";
import { PERMISSION_KEYS, type PermissionKey } from "@/types";
import type { VueI18nTranslation } from "vue-i18n";

type NavigationKey = "app";

interface NavigationRoute {
  title: string;
  pageTitle?: string;
  icon: any;
  route: string;
  permission: PermissionKey
}

interface NavigationSection {
  name: string;
  route: string;
  isActive: boolean;
  routes: NavigationRoute[];
}

type NavigationReturn = Record<NavigationKey, NavigationSection[]>;

export const navigation = (t: VueI18nTranslation): NavigationReturn => {
  return {
    app: [
      {
        name: "app",
        route: "/app",
        isActive: true,
        routes: [
          {
            title: t("app.users"),
            pageTitle: t("app.users"),
            icon: IconBarChart,
            route: "/users",
            permission: PERMISSION_KEYS.LIST_ACCOUNTS
          },
          {
            title: t("app.roles"),
            pageTitle: t("app.roles"),
            icon: IconMap,
            route: "/roles",
            permission: PERMISSION_KEYS.LIST_ROLES
          }
        ]
      }
    ],
  };
};
