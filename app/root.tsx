import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import { initMercadoPago } from "@mercadopago/sdk-react";

const cognitoAuthConfig: AuthProviderProps = {
  authority: import.meta.env.VITE_AWS_AUTHORITY ?? "",
  client_id: import.meta.env.VITE_AWS_CLIENT_ID ?? "",
  redirect_uri: "http://localhost:5173",
  response_type: "code",
  scope: "email openid profile",
  extraQueryParams: {
    lang: "es",
  },
};

export const signOutRedirect = () => {
  const clientId = import.meta.env.VITE_AWS_CLIENT_ID ?? "";
  const logoutUri = "http://localhost:5173";
  const cognitoDomain = import.meta.env.VITE_AWS_COGNITO_DOMAIN ?? "";
  window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
};

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY ?? "");

export const links: Route.LinksFunction = () => [
  {
    title: "Bacan",
    rel: "stylesheet",
    href: "app/index.css",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <Meta />
        <Links />
        <title>artivend.</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AuthProvider {...cognitoAuthConfig}>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </AuthProvider>
  );
}

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
