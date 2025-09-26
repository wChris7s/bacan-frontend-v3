import { IconButton, styled, SvgIcon, Typography } from "@mui/material";
import * as React from "react";
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
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type Anchor = "top" | "left" | "bottom" | "right";

type CartItem = {
  name: string;
  price: string;
  quantity: number;
  image: string;
};

export function Navbar(): ReactNode {
  const { isMobile } = useBreakpointData();
  const auth = useAuth();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    { name: "Computadora", price: "$3000.00", quantity: 2, image: "https://cdn.thewirecutter.com/wp-content/media/2024/11/cheapgaminglaptops-2048px-7981.jpg" },
    { name: "Toca discos", price: "$20.00", quantity: 1, image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Tocadiscos.JPG" },
    { name: "Escultura", price: "$60.00", quantity: 3, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Nike_of_Samothrake_Louvre_Ma2369_n4.jpg/250px-Nike_of_Samothrake_Louvre_Ma2369_n4.jpg" },
    { name: "Chompa", price: "$10.00", quantity: 5, image: "https://www.perumarketplace.com/cmm/getImage.do?atchFileId=FILE_c925ea21-267f-44cb-bcf7-3647fd4e2286&fileSn=1&thumb=600" },
    { name: "Polo", price: "$300.00", quantity: 1, image: "https://i.etsystatic.com/26348635/c/1169/1169/455/578/il/38ff5f/6905504950/il_300x300.6905504950_bmfs.jpg" },
    { name: "Rompero", price: "$200.00", quantity: 2, image: "https://promart.vteximg.com.br/arquivos/roperos_de_maderanatural_boton_80x80.jpg" },
  ]);


  const parseCurrencyToCents = (value: string): number => {
    const normalized = value.replace(/[^0-9.,-]/g, "").replace(",", ".");
    const num = parseFloat(normalized || "0");
    return Math.round(num * 100);
  };
  const formatCents = (cents: number): string => `$${(cents / 100).toFixed(2)}`;


  const handleIncrement = (index: number) => {
    setCartItems((prev) => prev.map((it, i) => i === index ? { ...it, quantity: it.quantity + 1 } : it));
  };
  const handleDecrement = (index: number) => {
    setCartItems((prev) => prev.map((it, i) => i === index ? { ...it, quantity: Math.max(1, it.quantity - 1) } : it));
  };


  const grandTotal = (() => {
    let sum = 0;
    for (const item of cartItems) {
      sum += parseCurrencyToCents(item.price) * item.quantity;
    }
    return formatCents(sum);
  })();

  const toggleDrawer = (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 500, bgcolor: Colors.WHITE }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Encabezado */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
        <ShoppingCartIcon />
        <Typography variant="subtitle1" fontWeight={600}>Carrito de compras</Typography>
      </Box>

      <List>
        {cartItems.map((item, index) => (
          <ListItem key={`${item.name}-${index}`} disableGutters sx={{ px: 2, py: 1.5 }}>
            <Box sx={{ width: '100%', bgcolor: '#fafafa', borderRadius: 2, boxShadow: 1, p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{ width: 56, height: 56, borderRadius: 1, objectFit: "cover", border: "1px solid", borderColor: "divider" }}
              />

              {/* Nombre y precio unitario */}
              <Box sx={{ ml: 1, flexGrow: 1, minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">{item.price} c/u</Typography>
              </Box>

              {/* Cantidad */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDecrement(index); }} aria-label={`Disminuir cantidad de ${item.name}`}>
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2" sx={{ minWidth: 16, textAlign: "center" }}>{item.quantity}</Typography>
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleIncrement(index); }} aria-label={`Aumentar cantidad de ${item.name}`}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Total del ítem: price * quantity */}
              <Typography variant="subtitle2" sx={{ ml: 1, minWidth: 64, textAlign: "right" }}>
                {formatCents(parseCurrencyToCents(item.price) * item.quantity)}
              </Typography>

              {/* Botón eliminar producto (sin funcionalidad) */}
              <IconButton size="small" aria-label={`Eliminar ${item.name}`} sx={{ ml: 1 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z" stroke="#d32f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 11v6M14 11v6" stroke="#d32f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </IconButton>
            </Box>
          </ListItem>
        ))}

        <Divider sx={{ my: 1 }} />

        {/* Total general */}
        <ListItem sx={{ px: 2, py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 2 }}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>Total</Typography>
            <Typography variant="h6">{grandTotal}</Typography>
            {/* Botón comprar (sin funcionalidad) con icono verde de continuar */}
            <IconButton size="medium" aria-label="Continuar compra" sx={{ ml: 2, bgcolor: '#43a047', color: '#fff', '&:hover': { bgcolor: '#2e7031' } }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#43a047" />
                <path d="M10 8l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </IconButton>
          </Box>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
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
                onClick={() => {
                }}
                starIcon={<StoreOutlinedIcon />}
              />
              <NavbarButton
                title={"Categorías"}
                onClick={() => {
                }}
                starIcon={<CategoryOutlinedIcon />}
              />
              <NavbarButton
                title={"Reseñas"}
                onClick={() => {
                }}
                starIcon={<ReviewsOutlinedIcon />}
              />
            </NavbarChildContainer>
            <NavbarChildContainer>
              <NavbarSearchFilter onChange={() => {
              }} />
            </NavbarChildContainer>
            <NavbarChildContainer>
              <NavbarIconButton
                icon={<NotificationsNoneOutlinedIcon />}
                badgedCount={2}
                tooltipTitle="Notificaciones"
                onClick={() => {
                }}
              />
              <NavbarIconButton
                icon={<ShoppingCartOutlinedIcon />}
                badgedCount={3}
                tooltipTitle="Carrito de compras"
                onClick={toggleDrawer("right", true)}
              />
              <NavbarIconButton
                icon={<ChatBubbleOutlineOutlinedIcon />}
                badgedCount={1}
                tooltipTitle="Mensajes"
                onClick={() => {
                }}
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

      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
        PaperProps={{ sx: { backgroundColor: Colors.WHITE } }}
      >
        {list("right")}
      </SwipeableDrawer>
    </>
  );
}

const NavbarChildContainer = styled(RowStack)<{}>(() => ({
  width: "100%",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "8px",
  gap: "8px",
}));