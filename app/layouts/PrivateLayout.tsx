import { Outlet } from "react-router";
import { RowStack } from "~/features/common/RowStack";
import Sidebar from "~/features/sidebar/Sidebar";

export default function PrivateLayout() {
  // TODO: Add sidebar.
  return (
    <RowStack>
      <Sidebar />
      <Outlet />
    </RowStack>
  );
}
