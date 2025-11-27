import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Dashboard, Logout, ShoppingCart, Store } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useAuthStore } from "~/store/authStore";
import { useCartStore } from "~/store/cartStore";

export function Navbar() {
  const navigate = useNavigate();
  const { user, logout, isEntrepreneur, isCustomer } = useAuthStore();
  const cart = useCartStore((state) => state.cart);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: "white",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            fontWeight: 800,
            color: "black",
            letterSpacing: "-0.02em",
          }}
          onClick={() => navigate("/")}
        >
          BACAN
        </Typography>

        {user ? (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                bgcolor: "black",
                color: "white",
                borderRadius: 2,
                mr: 2,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {user.firstName} {user.lastName}
              </Typography>
            </Box>

            <Button
              color="inherit"
              startIcon={<Store />}
              onClick={() => navigate("/products")}
              sx={{
                color: "black",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.05)",
                },
              }}
            >
              Products
            </Button>

            {isEntrepreneur() && (
              <Button
                color="inherit"
                startIcon={<Dashboard />}
                onClick={() => navigate("/dashboard")}
                sx={{
                  color: "black",
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.05)",
                  },
                }}
              >
                Dashboard
              </Button>
            )}

            {isCustomer() && (
              <IconButton
                color="inherit"
                onClick={() => navigate("/cart")}
                sx={{
                  color: "black",
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.05)",
                  },
                }}
              >
                <Badge
                  badgeContent={cart?.totalItems || 0}
                  sx={{
                    "& .MuiBadge-badge": {
                      bgcolor: "black",
                      color: "white",
                    },
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            )}

            <IconButton
              color="inherit"
              onClick={handleLogout}
              sx={{
                color: "black",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.05)",
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
              onClick={() => navigate("/login")}
              sx={{
                color: "black",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.05)",
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/register")}
              sx={{
                bgcolor: "black",
                color: "white",
                "&:hover": {
                  bgcolor: "#333",
                },
              }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
