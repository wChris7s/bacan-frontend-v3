import { RowStack } from "@/app/components/common/RowStack";
import { Button, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router";

export function HomeScreen(): ReactNode {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/about");
  };

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
