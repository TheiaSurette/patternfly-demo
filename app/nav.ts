export interface NavRoute {
  label: string;
  path: string;
}

export interface NavRouteGroup {
  label: string;
  routes: NavRoute[];
}

export type NavConfig = (NavRoute | NavRouteGroup)[];

export const routes: NavConfig = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About Me",
    path: "/about-me",
  },
];
