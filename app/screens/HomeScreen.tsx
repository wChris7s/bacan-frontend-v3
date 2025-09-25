import { Button, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { RowStack } from "~/features/common/RowStack";
import { useAuth } from "react-oidc-context";
import Sidebar from "~/features/sidebar/Sidebar";

export default function HomeScreen(): ReactNode {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/about");
  };

  const auth = useAuth();

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

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
