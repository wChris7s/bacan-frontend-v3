import { ReactNode } from "react";
import { RowStack } from "~/components/common/RowStack";

export function Navbar(): ReactNode {
  return (
    <RowStack
      sx={{
        width: "100%",
        height: "60px",
        backgroundColor: "#ffffff",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    ></RowStack>
  );
}
