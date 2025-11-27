import { Outlet } from "react-router";
import { Box } from "@mui/material";
import { Navbar } from "~/components/layout/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function MainLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </QueryClientProvider>
  );
}
