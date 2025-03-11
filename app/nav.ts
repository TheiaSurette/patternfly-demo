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
  {
    label: "Demos",
    routes: [
      {
        label: "Overview",
        path: "/demos",
      },
      {
        label: "Groupi DateTime Picker",
        path: "/demos/datetime-picker",
      },
      {
        label: "Chatbot",
        path: "/demos/chatbot",
      },
      {
        label: "Tic-Tac-Toe",
        path: "/demos/tic-tac-toe",
      },
      {
        label: "Store Page",
        path: "/demos/store-page",
      },
    ],
  },
];
