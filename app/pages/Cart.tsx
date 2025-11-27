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
  keyframes,
  Typography,
} from "@mui/material";
import {
  Add,
  ArrowBack,
  CreditCard,
  Delete,
  LocalShipping,
  Remove,
  Security,
  ShoppingBag,
} from "@mui/icons-material";
import { apiClient } from "~/lib/api/client";
import { useAuthStore } from "~/store/authStore";
import { useCartStore } from "~/store/cartStore";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 70px)",
          bgcolor: "#fafafa",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress sx={{ color: "black", mb: 2 }} size={48} />
          <Typography color="text.secondary">Loading cart...</Typography>
        </Box>
      </Box>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Box sx={{ bgcolor: "#fafafa", minHeight: "calc(100vh - 70px)" }}>
        <Container maxWidth="md" sx={{ py: 12 }}>
          <Box
            sx={{
              bgcolor: "white",
              p: { xs: 5, md: 8 },
              borderRadius: 5,
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0px 12px 40px rgba(0,0,0,0.06)",
              textAlign: "center",
              animation: `${fadeInUp} 0.6s ease-out`,
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                bgcolor: "rgba(0,0,0,0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 4,
              }}
            >
              <ShoppingBag sx={{ fontSize: 60, color: "text.secondary" }} />
            </Box>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              Your cart is empty
            </Typography>
            <Typography
              color="text.secondary"
              paragraph
              sx={{ fontSize: "1.15rem", mb: 5, maxWidth: 400, mx: "auto" }}
            >
              Looks like you haven't added anything to your cart yet. Start
              browsing to find great products!
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<ArrowBack />}
              onClick={() => navigate("/products")}
              sx={{
                px: 5,
                py: 1.8,
                fontSize: "1rem",
                fontWeight: 700,
                bgcolor: "black",
                borderRadius: 3,
                boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "#1a1a1a",
                  transform: "translateY(-2px)",
                  boxShadow: "0px 12px 32px rgba(0,0,0,0.25)",
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
      {/* Header */}
      <Box
        sx={{
          bgcolor: "black",
          color: "white",
          py: { xs: 5, md: 6 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.75rem" },
              letterSpacing: "-0.03em",
              animation: `${fadeInUp} 0.6s ease-out`,
            }}
          >
            Shopping Cart
          </Typography>
          <Typography
            sx={{
              mt: 1,
              opacity: 0.7,
              fontSize: "1.1rem",
              animation: `${fadeInUp} 0.6s ease-out 0.1s both`,
            }}
          >
            {cart.totalItems} item{cart.totalItems !== 1 ? "s" : ""} in your
            cart
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {cart.items.map((item, index) => (
                <Card
                  key={item.externalId}
                  sx={{
                    bgcolor: "white",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: 4,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    animation: `${fadeInUp} 0.5s ease-out ${0.1 * index}s both`,
                    "&:hover": {
                      boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
                    },
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
                            height: 130,
                            objectFit: "cover",
                            borderRadius: 3,
                          }}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 5 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            mb: 0.5,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {item.product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 1.5,
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          {item.product.ventureName}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 800, color: "black" }}
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
                            bgcolor: "rgba(0,0,0,0.03)",
                            borderRadius: 3,
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
                            disabled={
                              updateQuantityMutation.isPending ||
                              item.quantity <= 1
                            }
                            sx={{
                              bgcolor: "white",
                              boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                              "&:hover": {
                                bgcolor: "white",
                              },
                            }}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          <Typography
                            sx={{
                              mx: 3,
                              minWidth: 40,
                              textAlign: "center",
                              fontWeight: 700,
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
                            sx={{
                              bgcolor: "white",
                              boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                              "&:hover": {
                                bgcolor: "white",
                              },
                            }}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          textAlign="center"
                          sx={{ mt: 1.5, fontWeight: 600 }}
                        >
                          Subtotal:{" "}
                          <Box component="span" sx={{ color: "black" }}>
                            ${item.subtotal.toFixed(2)}
                          </Box>
                        </Typography>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 1 }}>
                        <IconButton
                          sx={{
                            color: "error.main",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              bgcolor: "rgba(239,68,68,0.1)",
                              transform: "scale(1.1)",
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
            </Box>

            <Button
              variant="outlined"
              onClick={() => clearCartMutation.mutate()}
              disabled={clearCartMutation.isPending}
              startIcon={<Delete />}
              sx={{
                mt: 3,
                color: "error.main",
                borderColor: "error.main",
                borderRadius: 3,
                px: 3,
                py: 1.2,
                fontWeight: 600,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "error.dark",
                  bgcolor: "rgba(239,68,68,0.05)",
                },
              }}
            >
              Clear Cart
            </Button>
          </Grid>

          {/* Order Summary */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card
              sx={{
                position: "sticky",
                top: 100,
                bgcolor: "white",
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: 4,
                overflow: "hidden",
                animation: `${fadeInUp} 0.6s ease-out 0.2s both`,
              }}
            >
              <Box
                sx={{
                  bgcolor: "black",
                  color: "white",
                  p: 3,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Order Summary
                </Typography>
              </Box>

              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography
                    sx={{ fontSize: "1rem", color: "text.secondary" }}
                  >
                    Subtotal ({cart.totalItems} items)
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
                  <Typography
                    sx={{ fontSize: "1rem", color: "text.secondary" }}
                  >
                    Shipping
                  </Typography>
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
                    Total
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: "black",
                      letterSpacing: "-0.02em",
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
                    py: 1.8,
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    bgcolor: "black",
                    borderRadius: 3,
                    boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#1a1a1a",
                      transform: "translateY(-2px)",
                      boxShadow: "0px 12px 32px rgba(0,0,0,0.25)",
                    },
                  }}
                >
                  Proceed to Checkout
                </Button>

                {/* Trust badges */}
                <Box
                  sx={{
                    mt: 4,
                    pt: 3,
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {[
                      { icon: <Security />, text: "Secure checkout" },
                      { icon: <LocalShipping />, text: "Free shipping" },
                      { icon: <CreditCard />, text: "Safe payment" },
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Box sx={{ color: "text.secondary" }}>{item.icon}</Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontWeight: 500 }}
                        >
                          {item.text}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}