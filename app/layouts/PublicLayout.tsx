import { Outlet } from "react-router";
import { Box } from "@mui/material";
import { Navbar } from "~/features/navbar/Navbar";
import Sidebar from "~/features/sidebar/Sidebar";

export default function PublicLayout() {
  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Box sx={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar />
        <Box sx={{ flex: 1, minWidth: 0, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
