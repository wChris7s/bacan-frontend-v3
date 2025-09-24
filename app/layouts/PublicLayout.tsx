import { Outlet } from "react-router";
import { Stack } from "@mui/material";
import { Navbar } from "~/features/navbar/Navbar";

export default function PublicLayout() {
  return (
    <Stack sx={{ width: "100%", height: "100%" }}>
      <Navbar />
      <Outlet />
    </Stack>
  );
}
