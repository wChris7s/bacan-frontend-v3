import {
  Button,
  CircularProgress,
  IconButton,
  Stack,
  styled,
  SvgIcon,
  Typography,
} from "@mui/material";
import * as React from "react";
import { ReactNode, useState } from "react";
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
import { Wallet } from "@mercadopago/sdk-react";

type Anchor = "top" | "left" | "bottom" | "right";

type CartItems = {
  products: CartItem[];
};

type CartItem = {
  name: string;
  price: string;
  quantity: number;
  image: string;
};

const customization = {
  theme: "dark",
  valueProp: "practicality",
  customStyle: {
    valuePropColor: "black",
    buttonHeight: "48px",
    borderRadius: "10px",
    verticalPadding: "10px",
    horizontalPadding: "10px",
  },
};

export function Navbar(): ReactNode {
  const { isMobile } = useBreakpointData();
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [categoryDrawerOpen, setCategoryDrawerOpen] = React.useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] =
    React.useState(false);
  const categories = [
    { name: "Electrónica", icon: "💻" },
    { name: "Ropa y accesorios", icon: "👗" },
    { name: "Hogar", icon: "🏠" },
    { name: "Juguetes", icon: "🧸" },
    { name: "Deportes", icon: "⚽" },
    { name: "Belleza", icon: "💄" },
    { name: "Libros", icon: "📚" },
    { name: "Automotriz", icon: "🚗" },
    { name: "Mascotas", icon: "🐶" },
    { name: "Alimentos", icon: "🍔" },
  ];

  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    {
      name: "Computadora",
      price: "$120",
      quantity: 1,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2024/11/cheapgaminglaptops-2048px-7981.jpg",
    },
    {
      name: "Toca discos",
      price: "$20.00",
      quantity: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Tocadiscos.JPG",
    },
    {
      name: "Escultura",
      price: "$60.00",
      quantity: 3,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Nike_of_Samothrake_Louvre_Ma2369_n4.jpg/250px-Nike_of_Samothrake_Louvre_Ma2369_n4.jpg",
    },
    {
      name: "Chompa",
      price: "$50.00",
      quantity: 5,
      image:
        "https://www.perumarketplace.com/cmm/getImage.do?atchFileId=FILE_c925ea21-267f-44cb-bcf7-3647fd4e2286&fileSn=1&thumb=600",
    },
    {
      name: "Polo",
      price: "$40.00",
      quantity: 1,
      image:
        "https://i.etsystatic.com/26348635/c/1169/1169/455/578/il/38ff5f/6905504950/il_300x300.6905504950_bmfs.jpg",
    },
    {
      name: "Rompero",
      price: "$35.00",
      quantity: 2,
      image:
        "https://promart.vteximg.com.br/arquivos/roperos_de_maderanatural_boton_80x80.jpg",
    },
  ]);

  const parseCurrencyToCents = (value: string): number => {
    const normalized = value.replace(/[^0-9.,-]/g, "").replace(",", ".");
    const num = parseFloat(normalized || "0");
    return Math.round(num * 100);
  };

  const formatCents = (cents: number): string => `$${(cents / 100).toFixed(2)}`;

  const handleProcessPayment = async () => {
    setLoading(true);

    let items = cartItems.map((value) => {
      return {
        ...value,
        price: String(parseCurrencyToCents(value.price)),
      };
    }) as CartItem[];

    try {
      const response = await fetch("http://localhost:9095/bcn/api/payment", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
        body: JSON.stringify({
          products: items,
        } as CartItems),
      });
      const data = await response.json();
      setPreferenceId(data.preference);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = (index: number) => {
    setCartItems((prev) =>
      prev.map((it, i) =>
        i === index ? { ...it, quantity: it.quantity + 1 } : it
      )
    );
  };
  const handleDecrement = (index: number) => {
    setCartItems((prev) =>
      prev.map((it, i) =>
        i === index ? { ...it, quantity: Math.max(1, it.quantity - 1) } : it
      )
    );
  };

  const grandTotal = (() => {
    let sum = 0;
    for (const item of cartItems) {
      sum += parseCurrencyToCents(item.price) * item.quantity;
    }
    return formatCents(sum);
  })();

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
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
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 500,
        bgcolor: Colors.WHITE,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Encabezado */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <ShoppingCartIcon />
        <Typography variant="subtitle1" fontWeight={600}>
          Carrito de compras
        </Typography>
      </Box>

      <List>
        {cartItems.map((item, index) => (
          <ListItem
            key={`${item.name}-${index}`}
            disableGutters
            sx={{ px: 2, py: 1.5 }}
          >
            <Box
              sx={{
                width: "100%",
                bgcolor: "#fafafa",
                borderRadius: 2,
                boxShadow: 1,
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 1,
                  objectFit: "cover",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              />

              {/* Nombre y precio unitario */}
              <Box sx={{ ml: 1, flexGrow: 1, minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.price} c/u
                </Typography>
              </Box>

              {/* Cantidad */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDecrement(index);
                  }}
                  aria-label={`Disminuir cantidad de ${item.name}`}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography
                  variant="body2"
                  sx={{ minWidth: 16, textAlign: "center" }}
                >
                  {item.quantity}
                </Typography>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIncrement(index);
                  }}
                  aria-label={`Aumentar cantidad de ${item.name}`}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Total del ítem: price * quantity */}
              <Typography
                variant="subtitle2"
                sx={{ ml: 1, minWidth: 64, textAlign: "right" }}
              >
                {formatCents(parseCurrencyToCents(item.price) * item.quantity)}
              </Typography>

              {/* Botón eliminar producto (sin funcionalidad) */}
              <IconButton
                size="small"
                aria-label={`Eliminar ${item.name}`}
                sx={{ ml: 1 }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z"
                    stroke="#d32f2f"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 11v6M14 11v6"
                    stroke="#d32f2f"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </IconButton>
            </Box>
          </ListItem>
        ))}

        <Divider sx={{ my: 1 }} />

        {/* Total general */}
        <ListItem sx={{ px: 2, py: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
            }}
          >
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
              Total
            </Typography>
            <Typography variant="h6">{grandTotal}</Typography>
            {/* Botón comprar (sin funcionalidad) con icono verde de continuar */}
            <IconButton
              size="medium"
              aria-label="Continuar compra"
              sx={{
                ml: 2,
                bgcolor: "#43a047",
                color: "#fff",
                "&:hover": { bgcolor: "#2e7031" },
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" fill="#43a047" />
                <path
                  d="M10 8l4 4-4 4"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconButton>
          </Box>
        </ListItem>

        <Stack spacing={2} alignItems="center">
          {!preferenceId && (
            <Button
              variant="contained"
              size="large"
              onClick={(e) => {
                e.stopPropagation();
                handleProcessPayment();
              }}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
                color: Colors.WHITE,
                backgroundColor: Colors.BLACK,
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Procesar Pago"
              )}
            </Button>
          )}

          {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </Stack>
      </List>
    </Box>
  );

  const notifications = [
    {
      title: "¡Oferta especial!",
      description: "Laptop gamer con 30% de descuento.",
      icon: "🔥",
    },
    {
      title: "Nuevo producto",
      description: "Auriculares inalámbricos disponibles.",
      icon: "🆕",
    },
    {
      title: "Descuento en ropa",
      description: "Toda la ropa de invierno con 20% off.",
      icon: "🧥",
    },
    {
      title: "Mascotas",
      description: "Nuevos juguetes para tu mascota.",
      icon: "🐾",
    },
    {
      title: "Libros recomendados",
      description: "Descubre los bestsellers de este mes.",
      icon: "📚",
    },
  ];

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
                onClick={() => {}}
                starIcon={<StoreOutlinedIcon />}
              />
              <NavbarButton
                title={"Categorías"}
                onClick={() => setCategoryDrawerOpen(true)}
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
                badgedCount={5}
                tooltipTitle="Notificaciones"
                onClick={() => setNotificationDrawerOpen(true)}
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
                onClick={() => {}}
              />

              {auth.isAuthenticated && (
                <Typography sx={{ fontSize: "14px", colors: Colors.BLACK }}>
                  Bienvenido:{" "}
                  {
                    `${auth.user?.profile.given_name} ${auth.user?.profile.family_name}`!
                  }
                </Typography>
              )}

              {!auth.isAuthenticated && (
                <NavbarIconButton
                  icon={<AccountCircleOutlinedIcon />}
                  badgedCount={0}
                  tooltipTitle="Cuenta de usuario"
                  onClick={() => auth.signinRedirect()}
                />
              )}
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
      <SwipeableDrawer
        anchor="left"
        open={categoryDrawerOpen}
        onClose={() => setCategoryDrawerOpen(false)}
        onOpen={() => setCategoryDrawerOpen(true)}
        PaperProps={{
          sx: {
            backgroundColor: Colors.WHITE,
            width: 340,
            boxShadow: 4,
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          },
        }}
      >
        <Box
          sx={{
            p: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CategoryOutlinedIcon sx={{ color: Colors.BLACK, fontSize: 28 }} />
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ color: Colors.BLACK }}
            >
              Categorías
            </Typography>
          </Box>
          <List
            sx={{
              flex: 1,
              px: 2,
              py: 2,
              overflowY: "auto",
              bgcolor: "#f7f7f7",
              borderRadius: 2,
            }}
          >
            {categories.map((cat, idx) => (
              <ListItem key={cat.name} disableGutters sx={{ mb: 1, px: 0 }}>
                <Box
                  sx={{
                    width: "100%",
                    bgcolor: "#fff",
                    borderRadius: 2,
                    boxShadow: 1,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    transition: "box-shadow 0.2s",
                    "&:hover": { boxShadow: 3, bgcolor: "#f0f0f0" },
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "#e0e0e0",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                      fontSize: 22,
                    }}
                  >
                    {cat.icon}
                  </Box>
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    sx={{ fontWeight: 500, flexGrow: 1 }}
                  >
                    {cat.name}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor="right"
        open={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
        onOpen={() => setNotificationDrawerOpen(true)}
        PaperProps={{
          sx: {
            backgroundColor: Colors.WHITE,
            width: 340,
            boxShadow: 4,
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          },
        }}
      >
        <Box
          sx={{
            p: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <NotificationsNoneOutlinedIcon
              sx={{ color: Colors.BLACK, fontSize: 28 }}
            />
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ color: Colors.BLACK }}
            >
              Notificaciones
            </Typography>
          </Box>
          <List
            sx={{
              flex: 1,
              px: 2,
              py: 2,
              overflowY: "auto",
              bgcolor: "#f7f7f7",
              borderRadius: 2,
            }}
          >
            {notifications.map((notif, idx) => (
              <ListItem
                key={notif.title + idx}
                disableGutters
                sx={{ mb: 1, px: 0 }}
              >
                <Box
                  sx={{
                    width: "100%",
                    bgcolor: "#fff",
                    borderRadius: 2,
                    boxShadow: 1,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    transition: "box-shadow 0.2s",
                    "&:hover": { boxShadow: 3, bgcolor: "#f0f0f0" },
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "#e0e0e0",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                      fontSize: 22,
                    }}
                  >
                    {notif.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle1"
                      color="text.primary"
                      sx={{ fontWeight: 500 }}
                    >
                      {notif.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {notif.description}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
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
