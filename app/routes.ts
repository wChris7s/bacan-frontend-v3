import { index, layout, route, RouteConfig } from "@react-router/dev/routes";

export default [
  layout("./layouts/AppLayout.tsx", [
    layout("./layouts/PublicLayout.tsx", [
      index("./screens/HomeScreen.tsx"),
      route("about", "./screens/AboutScreen.tsx"),
      route("register", "./screens/RegisterScreen.tsx"),
      route("stores", "./screens/StoresScreen.tsx"),
      route("products", "./screens/ProductsScreen.tsx"),
      route("user", "./screens/UserScreen.tsx"),
    ]),

    layout("./layouts/PrivateLayout.tsx", [
      route("profile", "./screens/SessionScreen.tsx"),
      route("entrepreneur", "./screens/EmprendedorScreen.tsx"),
      route("entrepreneur/add-product", "./screens/AddProduct.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
