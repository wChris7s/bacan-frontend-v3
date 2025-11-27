import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000000",
      light: "#333333",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
      light: "#f5f5f5",
      dark: "#e0e0e0",
      contrastText: "#000000",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 2px 8px rgba(0, 0, 0, 0.05)",
    "0px 4px 16px rgba(0, 0, 0, 0.08)",
    "0px 8px 24px rgba(0, 0, 0, 0.12)",
    "0px 12px 32px rgba(0, 0, 0, 0.15)",
    "0px 16px 40px rgba(0, 0, 0, 0.18)",
    "0px 20px 48px rgba(0, 0, 0, 0.20)",
    "0px 24px 56px rgba(0, 0, 0, 0.22)",
    "0px 28px 64px rgba(0, 0, 0, 0.24)",
    "0px 32px 72px rgba(0, 0, 0, 0.26)",
    "0px 36px 80px rgba(0, 0, 0, 0.28)",
    "0px 40px 88px rgba(0, 0, 0, 0.30)",
    "0px 44px 96px rgba(0, 0, 0, 0.32)",
    "0px 48px 104px rgba(0, 0, 0, 0.34)",
    "0px 52px 112px rgba(0, 0, 0, 0.36)",
    "0px 56px 120px rgba(0, 0, 0, 0.38)",
    "0px 60px 128px rgba(0, 0, 0, 0.40)",
    "0px 64px 136px rgba(0, 0, 0, 0.42)",
    "0px 68px 144px rgba(0, 0, 0, 0.44)",
    "0px 72px 152px rgba(0, 0, 0, 0.46)",
    "0px 76px 160px rgba(0, 0, 0, 0.48)",
    "0px 80px 168px rgba(0, 0, 0, 0.50)",
    "0px 84px 176px rgba(0, 0, 0, 0.52)",
    "0px 88px 184px rgba(0, 0, 0, 0.54)",
    "0px 92px 192px rgba(0, 0, 0, 0.56)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          padding: "10px 24px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
          border: "1px solid #f0f0f0",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
            transform: "translateY(-4px)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid #f0f0f0",
        },
      },
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
