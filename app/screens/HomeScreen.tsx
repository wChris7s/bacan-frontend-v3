import { Button, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { RowStack } from "~/components/common/RowStack";
import { useBreakpointData } from "~/hooks/useBreakpointData";

export default function HomeScreen(): ReactNode {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/about");
  };

  const { isMobile } = useBreakpointData();
  console.log({ isMobile });
  console.log("!!!");

  return (
    <RowStack sx={{ gap: "8px" }}>
      <Stack sx={{ justifyContent: "center" }}>
        <Typography>Home screen</Typography>
      </Stack>
      <Button
        type="button"
        variant="contained"
        size="small"
        onClick={handleClick}
      >
        About!
      </Button>
    </RowStack>
  );
}
