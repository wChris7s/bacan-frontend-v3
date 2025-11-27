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

  const { user, logout, isEntrepreneur, isCustomer, isAuthenticated } =
    useAuthStore();
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
    color: "black",
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
      bgcolor: "black",
      borderRadius: 1,
      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    "&:hover": {
      bgcolor: "rgba(0,0,0,0.04)",
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
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          BACAN
        </Typography>
        <IconButton onClick={() => setMobileOpen(false)}>
          <Close />
        </IconButton>
      </Box>

      {user && (
        <Box
          sx={{
            p: 2,
            m: 2,
            bgcolor: "black",
            color: "white",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="body2"
            sx={{ opacity: 0.7, fontSize: "0.75rem" }}
          >
            Signed in as
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
              bgcolor: isActive("/") ? "rgba(0,0,0,0.05)" : "transparent",
            }}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigate("/products")}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              bgcolor: isActive("/products")
                ? "rgba(0,0,0,0.05)"
                : "transparent",
            }}
          >
            <ListItemIcon>
              <Store />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>

        {user && isEntrepreneur() && (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigate("/dashboard")}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                bgcolor: isActive("/dashboard")
                  ? "rgba(0,0,0,0.05)"
                  : "transparent",
              }}
            >
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        )}

        {user && isCustomer() && (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigate("/cart")}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                bgcolor: isActive("/cart") ? "rgba(0,0,0,0.05)" : "transparent",
              }}
            >
              <ListItemIcon>
                <Badge badgeContent={cart?.totalItems || 0} color="primary">
                  <ShoppingCart />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItemButton>
          </ListItem>
        )}
      </List>

      <Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
        {user ? (
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{
              borderColor: "black",
              color: "black",
              borderRadius: 2,
              py: 1.2,
              "&:hover": {
                bgcolor: "black",
                color: "white",
                borderColor: "black",
              },
            }}
          >
            Sign Out
          </Button>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleNavigate("/login")}
              sx={{
                bgcolor: "black",
                borderRadius: 2,
                py: 1.2,
                "&:hover": {
                  bgcolor: "#333",
                },
              }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleNavigate("/register")}
              sx={{
                borderColor: "black",
                color: "black",
                borderRadius: 2,
                py: 1.2,
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.05)",
                },
              }}
            >
              Register
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
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid",
          borderColor: "rgba(0,0,0,0.08)",
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
              color: "black",
              letterSpacing: "-0.04em",
              fontSize: { xs: "1.5rem", md: "1.75rem" },
              transition: "all 0.3s ease",
              "&:hover": {
                opacity: 0.7,
              },
            }}
            onClick={() => navigate("/")}
          >
            BACAN
          </Typography>

          {isMobile ? (
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{
                color: "black",
                border: "2px solid",
                borderColor: "rgba(0,0,0,0.1)",
                borderRadius: 2,
                p: 1,
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : isAuthenticated && user ? (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2.5,
                  py: 1,
                  bgcolor: "black",
                  color: "white",
                  borderRadius: 3,
                  mr: 2,
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
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
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {user.firstName} {user.lastName}
                </Typography>
              </Box>

              <Button
                color="inherit"
                startIcon={<Store />}
                onClick={() => navigate("/products")}
                sx={navButtonStyles("/products")}
              >
                Products
              </Button>

              {isEntrepreneur() && (
                <Button
                  color="inherit"
                  startIcon={<Dashboard />}
                  onClick={() => navigate("/dashboard")}
                  sx={navButtonStyles("/dashboard")}
                >
                  Dashboard
                </Button>
              )}

              {isCustomer() && (
                <IconButton
                  onClick={() => navigate("/cart")}
                  sx={{
                    color: "black",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.05)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Badge
                    badgeContent={cart?.totalItems || 0}
                    sx={{
                      "& .MuiBadge-badge": {
                        bgcolor: "black",
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
                  color: "black",
                  ml: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(239,68,68,0.1)",
                    color: "#ef4444",
                  },
                }}
              >
                <Logout />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                color="inherit"
                startIcon={<LoginIcon />}
                onClick={() => navigate("/login")}
                sx={{
                  color: "black",
                  fontWeight: 600,
                  px: 3,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.05)",
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/register")}
                sx={{
                  bgcolor: "black",
                  color: "white",
                  fontWeight: 600,
                  px: 3,
                  borderRadius: 2,
                  boxShadow: "0px 4px 14px rgba(0,0,0,0.25)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "#1a1a1a",
                    transform: "translateY(-2px)",
                    boxShadow: "0px 6px 20px rgba(0,0,0,0.3)",
                  },
                }}
              >
                Get Started
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
