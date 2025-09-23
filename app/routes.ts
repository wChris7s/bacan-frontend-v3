import { index, route, RouteConfig } from "@react-router/dev/routes";

export default [
  index("./screens/HomeScreen.tsx"),
  route("about", "./screens/AboutScreen.tsx"),
] satisfies RouteConfig;
