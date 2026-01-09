import { SystemType } from "@/store/main";
import type { PlatformRoute } from "@/types";

const platformRoutes: PlatformRoute[] = [
  {
    title: "platform.app",
    route: "/app/users",
    name: "app-users",
    icon: "IconHelmet",
    key: "app",
    permission: SystemType.Management
  }
];

export { platformRoutes };