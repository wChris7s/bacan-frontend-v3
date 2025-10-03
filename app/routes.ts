import { index, layout, route, RouteConfig } from "@react-router/dev/routes";

export default [
  layout("./layouts/AppLayout.tsx", [
    index("./screens/HomeScreen.tsx"),

    layout("./layouts/PublicLayout.tsx", [
      route("about", "./screens/AboutScreen.tsx"),
      route("register", "./screens/RegisterScreen.tsx"),
    ]),

    layout("./layouts/PrivateLayout.tsx", [
      route("profile", "./screens/SessionScreen.tsx"),
      route("entrepreneur", "./screens/EmprendedorScreen.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
