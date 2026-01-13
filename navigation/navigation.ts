// Remove dependency on #components if it's failing or just import them directly if available in components/ui
// IconBarChart was likely an auto-imported icon. We should use a standard icon or ensure it exists.
// Since we are cleaning up, let's use a string or a simple object for icon if we don't have the component.

import type { VueI18nTranslation } from "vue-i18n";

type NavigationKey = "dashboard";

interface NavigationRoute {
  title: string;
  pageTitle?: string;
  icon?: any;
  route: string;
  permission?: string;
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
    dashboard: [
      {
        name: "dashboard",
        route: "/",
        isActive: true,
        routes: [
          {
            title: "Home",
            pageTitle: "Dashboard",
            // icon: "IconBarChart", // Use string or handle component import correctly
            route: "/"
          }
        ]
      }
    ]
  };
};
