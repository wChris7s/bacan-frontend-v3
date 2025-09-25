import { IconButton, styled, SvgIcon } from "@mui/material";
import { ReactNode } from "react";
import { RowStack } from "~/features/common/RowStack";
import { AppAssets } from "@assets/index";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";

import MenuIcon from "@mui/icons-material/Menu";
import { useBreakpointData } from "~/hooks/useBreakpointData";
import { NavbarButton } from "~/features/navbar/components/NavbarButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { NavbarIconButton } from "~/features/navbar/components/NavbarIconButton";
import { Colors } from "~/enums/Colors";
import { NavbarSearchFilter } from "~/features/navbar/components/NavbarSearchFilter";
import { useAuth } from "react-oidc-context";

export function Navbar(): ReactNode {
  const { isMobile } = useBreakpointData();
  const auth = useAuth();
  return (
    <RowStack
      sx={{
        height: "60px",
        gap: "4px",
        backgroundColor: Colors.WHITE,
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <RowStack
        sx={{
          width: "fit-content",
          padding: "18px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SvgIcon sx={{ fontSize: 32, color: Colors.BLACK }}>
          <AppAssets.AppLogo />
        </SvgIcon>
      </RowStack>

      {!isMobile && (
        <RowStack sx={{ width: "100%", gap: "4px" }}>
          <NavbarChildContainer>
            <NavbarButton
              title={"Emprendimientos"}
              onClick={() => {}}
              starIcon={<StoreOutlinedIcon />}
            />
            <NavbarButton
              title={"Categorías"}
              onClick={() => {}}
              starIcon={<CategoryOutlinedIcon />}
            />
            <NavbarButton
              title={"Reseñas"}
              onClick={() => {}}
              starIcon={<ReviewsOutlinedIcon />}
            />
          </NavbarChildContainer>
          <NavbarChildContainer>
            <NavbarSearchFilter onChange={() => {}} />
          </NavbarChildContainer>
          <NavbarChildContainer>
            <NavbarIconButton
              icon={<NotificationsNoneOutlinedIcon />}
              badgedCount={2}
              tooltipTitle="Notificaciones"
              onClick={() => {}}
            />
            <NavbarIconButton
              icon={<ShoppingCartOutlinedIcon />}
              badgedCount={3}
              tooltipTitle="Carrito de compras"
              onClick={() => {}}
            />
            <NavbarIconButton
              icon={<ChatBubbleOutlineOutlinedIcon />}
              badgedCount={1}
              tooltipTitle="Mensajes"
              onClick={() => {}}
            />
            <NavbarIconButton
              icon={<AccountCircleOutlinedIcon />}
              badgedCount={0}
              tooltipTitle="Cuenta de usuario"
              onClick={() => auth.signinRedirect()}
            />
          </NavbarChildContainer>
        </RowStack>
      )}

      {isMobile && (
        <RowStack
          sx={{
            width: "100%",
            padding: "8px",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <IconButton aria-label="menu">
            <MenuIcon sx={{ color: "#000000" }} />
          </IconButton>
        </RowStack>
      )}
    </RowStack>
  );
}

const NavbarChildContainer = styled(RowStack)<{}>(() => ({
  width: "100%",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "8px",
  gap: "8px",
}));
