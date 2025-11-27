import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("layouts/main-layout.tsx", [
    index("pages/Home.tsx"),
    route("register", "pages/Register.tsx"),
    route("products", "pages/Products.tsx"),
    route("cart", "pages/Cart.tsx"),
    route("dashboard", "pages/Dashboard.tsx"),
  ]),
] satisfies RouteConfig;
