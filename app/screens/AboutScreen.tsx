import { Button, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { RowStack } from "~/features/common/RowStack";

export default function AboutScreen(): ReactNode {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <RowStack sx={{ gap: "8px" }}>
      <Stack sx={{ justifyContent: "center" }}>
        <Typography>About screen</Typography>
      </Stack>
      <Button
        type="button"
        variant="contained"
        size="small"
        onClick={handleClick}
      >
        Home!
      </Button>
    </RowStack>
  );
}
