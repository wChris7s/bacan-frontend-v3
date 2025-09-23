import { useMediaQuery, useTheme } from "@mui/material";

export interface BreakpointData {
  isMobile: boolean;
}

export function useBreakpointData(): BreakpointData {
  const theme = useTheme();
  const xs: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  const sm: boolean = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMobile: boolean = xs || sm;
  return {
    isMobile,
  };
}
