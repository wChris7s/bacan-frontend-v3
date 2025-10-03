import { Outlet } from "react-router";
import Sidebar from "~/features/sidebar/Sidebar";

export default function PrivateLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}