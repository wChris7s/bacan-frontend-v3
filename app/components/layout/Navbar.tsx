import { useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Close,
  Dashboard,
  Home,
  Login as LoginIcon,
  Logout,
  Menu as MenuIcon,
  ShoppingCart,
  Store,
  Storefront,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { useAuthStore } from "~/store/authStore";
import { useCartStore } from "~/store/cartStore";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const {
    user,
    logout,
    isEntrepreneur,
    isCustomer,
    isAuthenticated,
    isHydrated,
  } = useAuthStore();
  const cart = useCartStore((state) => state.cart);
  const clearLocalCart = useCartStore((state) => state.clearLocalCart);

  const handleLogout = async () => {
    await logout();
    clearLocalCart();
    navigate("/");
    setMobileOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const navButtonStyles = (path: string) => ({
    color: "white",
    fontWeight: isActive(path) ? 700 : 500,
    position: "relative",
    px: 2.5,
    py: 1,
    borderRadius: 2,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 4,
      left: "50%",
      transform: isActive(path)
        ? "translateX(-50%) scaleX(1)"
        : "translateX(-50%) scaleX(0)",
      width: "60%",
      height: "2px",
      bgcolor: "secondary.main",
      borderRadius: 1,
      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    "&:hover": {
      bgcolor: "rgba(255,255,255,0.1)",
      "&::after": {
        transform: "translateX(-50%) scaleX(1)",
      },
    },
  });

  const mobileDrawer = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "divider",
          background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)",
          color: "white",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          BACAN
        </Typography>
        <IconButton
          onClick={() => setMobileOpen(false)}
          sx={{ color: "white" }}
        >
          <Close />
        </IconButton>
      </Box>

      {isHydrated && user && (
        <Box
          sx={{
            p: 2,
            m: 2,
            background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)",
            color: "white",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="body2"
            sx={{ opacity: 0.7, fontSize: "0.75rem" }}
          >
            Conectado como
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography
            variant="body2"
            sx={{ opacity: 0.7, fontSize: "0.75rem" }}
          >
            {user.email}
          </Typography>
        </Box>
      )}

      <List sx={{ flex: 1, px: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigate("/")}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              bgcolor: isActive("/") ? "rgba(30,58,95,0.1)" : "transparent",
            }}
          >
            <ListItemIcon>
              <Home sx={{ color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigate("/ventures")}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              bgcolor: isActive("/ventures")
                ? "rgba(30,58,95,0.1)"
                : "transparent",
            }}
          >
            <ListItemIcon>
              <Storefront sx={{ color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText primary="Emprendimientos" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigate("/products")}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              bgcolor: isActive("/products")
                ? "rgba(30,58,95,0.1)"
                : "transparent",
            }}
          >
            <ListItemIcon>
              <Store sx={{ color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText primary="Productos" />
          </ListItemButton>
        </ListItem>

        {isHydrated && user && isEntrepreneur() && (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigate("/dashboard")}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                bgcolor: isActive("/dashboard")
                  ? "rgba(30,58,95,0.1)"
                  : "transparent",
              }}
            >
              <ListItemIcon>
                <Dashboard sx={{ color: "primary.main" }} />
              </ListItemIcon>
              <ListItemText primary="Mi Panel" />
            </ListItemButton>
          </ListItem>
        )}

        {isHydrated && user && isCustomer() && (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigate("/cart")}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                bgcolor: isActive("/cart")
                  ? "rgba(30,58,95,0.1)"
                  : "transparent",
              }}
            >
              <ListItemIcon>
                <Badge badgeContent={cart?.totalItems || 0} color="secondary">
                  <ShoppingCart sx={{ color: "primary.main" }} />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Carrito" />
            </ListItemButton>
          </ListItem>
        )}
      </List>

      <Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
        {isHydrated && user ? (
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{
              borderColor: "primary.main",
              color: "primary.main",
              borderRadius: 2,
              py: 1.2,
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
                borderColor: "primary.main",
              },
            }}
          >
            Cerrar Sesión
          </Button>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleNavigate("/login")}
              sx={{
                bgcolor: "primary.main",
                borderRadius: 2,
                py: 1.2,
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              Iniciar Sesión
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleNavigate("/register")}
              sx={{
                borderColor: "primary.main",
                color: "primary.main",
                borderRadius: 2,
                py: 1.2,
                "&:hover": {
                  bgcolor: "rgba(30,58,95,0.05)",
                },
              }}
            >
              Registrarse
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Toolbar sx={{ py: 1.5, px: { xs: 2, md: 4 } }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.04em",
              fontSize: { xs: "1.5rem", md: "1.75rem" },
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&:hover": {
                opacity: 0.9,
              },
            }}
            onClick={() => navigate("/")}
          >
            <Storefront sx={{ fontSize: 32 }} />
            BACAN
          </Typography>

          {isMobile ? (
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{
                color: "white",
                border: "2px solid",
                borderColor: "rgba(255,255,255,0.3)",
                borderRadius: 2,
                p: 1,
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : isHydrated && isAuthenticated && user ? (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2.5,
                  py: 1,
                  bgcolor: "rgba(255,255,255,0.15)",
                  borderRadius: 3,
                  mr: 2,
                  backdropFilter: "blur(10px)",
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#4ade80",
                    boxShadow: "0 0 8px #4ade80",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "white" }}
                >
                  {user.firstName} {user.lastName}
                </Typography>
              </Box>

              <Button
                color="inherit"
                startIcon={<Storefront />}
                onClick={() => navigate("/ventures")}
                sx={navButtonStyles("/ventures")}
              >
                Emprendimientos
              </Button>

              <Button
                color="inherit"
                startIcon={<Store />}
                onClick={() => navigate("/products")}
                sx={navButtonStyles("/products")}
              >
                Productos
              </Button>

              {isEntrepreneur() && (
                <Button
                  color="inherit"
                  startIcon={<Dashboard />}
                  onClick={() => navigate("/dashboard")}
                  sx={navButtonStyles("/dashboard")}
                >
                  Mi Panel
                </Button>
              )}

              {isCustomer() && (
                <IconButton
                  onClick={() => navigate("/cart")}
                  sx={{
                    color: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.1)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Badge
                    badgeContent={cart?.totalItems || 0}
                    sx={{
                      "& .MuiBadge-badge": {
                        bgcolor: "secondary.main",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "0.7rem",
                      },
                    }}
                  >
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              )}

              <IconButton
                onClick={handleLogout}
                sx={{
                  color: "white",
                  ml: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(239,68,68,0.2)",
                    color: "#fca5a5",
                  },
                }}
              >
                <Logout />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Button
                color="inherit"
                startIcon={<Storefront />}
                onClick={() => navigate("/ventures")}
                sx={navButtonStyles("/ventures")}
              >
                Emprendimientos
              </Button>

              <Button
                color="inherit"
                startIcon={<LoginIcon />}
                onClick={() => navigate("/login")}
                sx={{
                  color: "white",
                  fontWeight: 600,
                  px: 3,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Iniciar Sesión
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/register")}
                sx={{
                  bgcolor: "secondary.main",
                  color: "white",
                  fontWeight: 600,
                  px: 3,
                  borderRadius: 2,
                  boxShadow: "0px 4px 14px rgba(255,152,0,0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "secondary.dark",
                    transform: "translateY(-2px)",
                    boxShadow: "0px 6px 20px rgba(255,152,0,0.5)",
                  },
                }}
              >
                Comenzar
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            boxShadow: "-10px 0 40px rgba(0,0,0,0.1)",
          },
        }}
      >
        {mobileDrawer}
      </Drawer>
    </>
  );
}
