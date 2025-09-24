import { Button } from "@mui/material";
import { ReactNode } from "react";
import { Colors } from "~/enums/Colors";

interface NavbarButtonProps {
  onClick: () => void;
  starIcon: ReactNode;
  title: string;
}

export function NavbarButton(props: NavbarButtonProps) {
  return (
    <Button
      sx={{ color: Colors.BLACK, paddingX: "12px" }}
      onClick={props.onClick}
      startIcon={props.starIcon}
    >
      {props.title}
    </Button>
  );
}
