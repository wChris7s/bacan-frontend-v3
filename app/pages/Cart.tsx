import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove, ShoppingBag } from "@mui/icons-material";
import { apiClient } from "~/lib/api/client";
import { useAuthStore } from "~/store/authStore";
import { useCartStore } from "~/store/cartStore";

export default function Cart() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const isCustomer = useAuthStore((state) => state.isCustomer);
  const setCart = useCartStore((state) => state.setCart);

  useEffect(() => {
    if (!user || !isCustomer()) {
      navigate("/products");
    }
  }, [user, isCustomer, navigate]);

  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart", user?.externalId],
    queryFn: () => apiClient.getCart(user!.externalId),
    enabled: !!user && isCustomer(),
  });

  useEffect(() => {
    if (cart) {
      setCart(cart);
    }
  }, [cart, setCart]);

  const updateQuantityMutation = useMutation({
    mutationFn: ({
      itemExternalId,
      quantity,
    }: {
      itemExternalId: string;
      quantity: number;
    }) => apiClient.updateCartItem(itemExternalId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (itemExternalId: string) =>
      apiClient.removeFromCart(itemExternalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: () => apiClient.clearCart(user!.externalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleUpdateQuantity = (
    itemExternalId: string,
    currentQuantity: number,
    change: number
  ) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantityMutation.mutate({ itemExternalId, quantity: newQuantity });
    }
  };

  const handleCheckout = () => {
    alert(
      "Checkout functionality would be implemented here with payment gateway"
    );
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Box sx={{ bgcolor: "#fafafa", minHeight: "calc(100vh - 70px)" }}>
        <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
          <Box
            sx={{
              bgcolor: "white",
              p: 6,
              borderRadius: 3,
              border: "1px solid #f0f0f0",
            }}
          >
            <ShoppingBag
              sx={{ fontSize: 100, color: "text.secondary", mb: 3 }}
            />
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              Your cart is empty
            </Typography>
            <Typography
              color="text.secondary"
              paragraph
              sx={{ fontSize: "1.1rem", mb: 4 }}
            >
              Start shopping to add items to your cart
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/products")}
              sx={{
                px: 5,
                py: 1.5,
                fontSize: "1rem",
                bgcolor: "black",
                "&:hover": {
                  bgcolor: "#333",
                },
              }}
            >
              Browse Products
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#fafafa", minHeight: "calc(100vh - 70px)" }}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 4,
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Shopping Cart
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            {cart.items.map((item) => (
              <Card
                key={item.externalId}
                sx={{
                  mb: 2,
                  bgcolor: "white",
                  border: "1px solid #f0f0f0",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <Box
                        component="img"
                        src={
                          item.product.imageUrl ||
                          "https://via.placeholder.com/150"
                        }
                        alt={item.product.name}
                        sx={{
                          width: "100%",
                          height: 120,
                          objectFit: "cover",
                          borderRadius: 2,
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 5 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      >
                        {item.product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {item.product.ventureName}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "black" }}
                      >
                        ${item.product.price.toFixed(2)}
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px solid #f0f0f0",
                          borderRadius: 2,
                          p: 0.5,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.externalId,
                              item.quantity,
                              -1
                            )
                          }
                          disabled={updateQuantityMutation.isPending}
                        >
                          <Remove />
                        </IconButton>
                        <Typography
                          sx={{
                            mx: 3,
                            minWidth: 40,
                            textAlign: "center",
                            fontWeight: 600,
                            fontSize: "1.1rem",
                          }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.externalId,
                              item.quantity,
                              1
                            )
                          }
                          disabled={
                            updateQuantityMutation.isPending ||
                            item.quantity >= item.product.stock
                          }
                        >
                          <Add />
                        </IconButton>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                        sx={{ mt: 1, fontWeight: 600 }}
                      >
                        Subtotal: ${item.subtotal.toFixed(2)}
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 1 }}>
                      <IconButton
                        sx={{
                          color: "error.main",
                          "&:hover": {
                            bgcolor: "error.light",
                            color: "error.dark",
                          },
                        }}
                        onClick={() =>
                          removeItemMutation.mutate(item.externalId)
                        }
                        disabled={removeItemMutation.isPending}
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outlined"
              onClick={() => clearCartMutation.mutate()}
              disabled={clearCartMutation.isPending}
              sx={{
                mt: 2,
                color: "error.main",
                borderColor: "error.main",
                "&:hover": {
                  borderColor: "error.dark",
                  bgcolor: "error.light",
                },
              }}
            >
              Clear Cart
            </Button>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                position: "sticky",
                top: 90,
                bgcolor: "white",
                border: "1px solid #f0f0f0",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                  Order Summary
                </Typography>
                <Divider sx={{ my: 3 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>
                    Items ({cart.totalItems}):
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    ${cart.total.toFixed(2)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>Shipping:</Typography>
                  <Typography sx={{ fontWeight: 600, color: "success.main" }}>
                    Free
                  </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 4,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Total:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "black",
                    }}
                  >
                    ${cart.total.toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleCheckout}
                  sx={{
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    bgcolor: "black",
                    "&:hover": {
                      bgcolor: "#333",
                    },
                  }}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
