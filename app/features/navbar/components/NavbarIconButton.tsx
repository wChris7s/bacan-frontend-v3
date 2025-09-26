import { Badge, IconButton, Tooltip } from "@mui/material";
import { ReactNode } from "react";
import { Colors } from "~/enums/Colors";

interface NavbarIconButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  icon: ReactNode;
  badgedCount: number;
  tooltipTitle: string;
}

export function NavbarIconButton(props: NavbarIconButtonProps) {
  const showBadge: boolean = props.badgedCount > 0;
  return (
    <Tooltip title={props.tooltipTitle} placement="bottom" arrow>
      <IconButton onClick={props.onClick} sx={{ color: Colors.BLACK }}>
        {props.icon}
        {showBadge && (
          <Badge
            slotProps={{
              badge: {
                sx: {
                  color: Colors.WHITE,
                  backgroundColor: Colors.BLACK,
                  top: "-12px",
                  right: "-6px",
                },
              },
            }}
            badgeContent={props.badgedCount}
            overlap="circular"
          />
        )}
      </IconButton>
    </Tooltip>
  );
}
