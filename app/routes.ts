import { index, layout, route, RouteConfig } from "@react-router/dev/routes";

export default [
  layout("./layouts/AppLayout.tsx", [
    layout("./layouts/PublicLayout.tsx", [
      index("./screens/HomeScreen.tsx"),
      route("about", "./screens/AboutScreen.tsx"),
    ]),

    layout("./layouts/PrivateLayout.tsx", []),
  ]),
] satisfies RouteConfig;
