import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  keyframes,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import {
  CheckCircle,
  FilterList,
  ShoppingCart,
  Store,
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

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const user = useAuthStore((state) => state.user);
  const isCustomer = useAuthStore((state) => state.isCustomer);
  const setCart = useCartStore((state) => state.setCart);

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiClient.getCategories(),
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      apiClient.getProducts(
        selectedCategory !== "all"
          ? { categoryExternalId: selectedCategory, available: true }
          : { available: true }
      ),
  });

  const handleAddToCart = async (productExternalId: string) => {
    if (!user || !isCustomer()) {
      setSnackbar({
        open: true,
        message: "Please login as a customer to add items to cart",
        severity: "error",
      });
      return;
    }

    try {
      const updatedCart = await apiClient.addToCart(user.externalId, {
        productExternalId,
        quantity: 1,
      });
      setCart(updatedCart);
      setSnackbar({
        open: true,
        message: "Product added to cart!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to add product to cart",
        severity: "error",
      });
    }
  };

  if (categoriesLoading || productsLoading) {
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
          <Typography color="text.secondary">Loading products...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#fafafa", minHeight: "calc(100vh - 70px)" }}>
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: "black",
          color: "white",
          py: { xs: 6, md: 8 },
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
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              letterSpacing: "-0.03em",
              animation: `${fadeInUp} 0.6s ease-out`,
            }}
          >
            Browse Products
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              opacity: 0.8,
              maxWidth: 500,
              animation: `${fadeInUp} 0.6s ease-out 0.1s both`,
            }}
          >
            Discover unique products from passionate entrepreneurs around the
            world
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Filter Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 5,
            p: 3,
            bgcolor: "white",
            borderRadius: 3,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.06)",
            flexWrap: "wrap",
            animation: `${fadeInUp} 0.6s ease-out 0.2s both`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 2 }}>
            <FilterList sx={{ color: "text.secondary" }} />
            <Typography sx={{ fontWeight: 600 }}>Filter:</Typography>
          </Box>

          <FormControl
            sx={{
              minWidth: 220,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                },
                "&.Mui-focused": {
                  boxShadow: "0px 4px 16px rgba(0,0,0,0.1)",
                },
              },
            }}
          >
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.externalId} value={category.externalId}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box
            sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}
          >
            <Typography color="text.secondary" sx={{ fontSize: "0.9rem" }}>
              {products.length} product{products.length !== 1 ? "s" : ""} found
            </Typography>
          </Box>
        </Box>

        {products.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 12,
              bgcolor: "white",
              borderRadius: 4,
              border: "1px solid rgba(0,0,0,0.06)",
              animation: `${fadeInUp} 0.6s ease-out`,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: "rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <Store sx={{ fontSize: 40, color: "text.secondary" }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              No products found
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: "1.1rem" }}>
              Try selecting a different category
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {products.map((product, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={product.externalId}
                sx={{
                  animation: `${fadeInUp} 0.5s ease-out ${0.1 * (index % 6)}s both`,
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "white",
                    borderRadius: 4,
                    border: "1px solid rgba(0,0,0,0.06)",
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.12)",
                      "& .product-image": {
                        transform: "scale(1.08)",
                      },
                      "& .product-overlay": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <CardMedia
                      className="product-image"
                      component="img"
                      height="240"
                      image={
                        product.imageUrl ||
                        "https://via.placeholder.com/400x300?text=No+Image"
                      }
                      alt={product.name}
                      sx={{
                        objectFit: "cover",
                        transition:
                          "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    />
                    <Box
                      className="product-overlay"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
                        opacity: 0,
                        transition: "opacity 0.4s ease",
                      }}
                    />
                    {product.stock === 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          bgcolor: "rgba(239,68,68,0.9)",
                          color: "white",
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        Out of Stock
                      </Box>
                    )}
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      noWrap
                      sx={{ fontWeight: 700, letterSpacing: "-0.02em" }}
                    >
                      {product.name}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                        py: 1,
                        px: 1.5,
                        bgcolor: "rgba(0,0,0,0.03)",
                        borderRadius: 2,
                        width: "fit-content",
                      }}
                    >
                      <Store
                        fontSize="small"
                        sx={{ color: "text.secondary", fontSize: 16 }}
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: 500, fontSize: "0.85rem" }}
                      >
                        {product.ventureName}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2.5,
                        lineHeight: 1.7,
                        minHeight: 48,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {product.description || "No description available"}
                    </Typography>

                    <Box
                      sx={{
                        mb: 3,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.75,
                      }}
                    >
                      {product.categories.slice(0, 3).map((category) => (
                        <Chip
                          key={category.externalId}
                          label={category.name}
                          size="small"
                          sx={{
                            bgcolor: "black",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                            height: 26,
                            borderRadius: 1.5,
                          }}
                        />
                      ))}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 800,
                            color: "black",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          ${product.price.toFixed(2)}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              product.stock > 0 ? "success.main" : "error.main",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          {product.stock > 0 && (
                            <CheckCircle sx={{ fontSize: 16 }} />
                          )}
                          {product.stock > 0
                            ? `${product.stock} in stock`
                            : "Out of stock"}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>

                  <Box sx={{ p: 3, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(product.externalId)}
                      disabled={product.stock === 0 || !isCustomer()}
                      sx={{
                        py: 1.5,
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        bgcolor: "black",
                        borderRadius: 3,
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "#1a1a1a",
                          transform: "translateY(-2px)",
                          boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
                        },
                        "&:disabled": {
                          bgcolor: "#e0e0e0",
                          color: "#999",
                        },
                      }}
                    >
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                    {!isCustomer() && user && (
                      <Typography
                        sx={{
                          mt: 1,
                          textAlign: "center",
                          fontSize: "0.75rem",
                          color: "text.secondary",
                        }}
                      >
                        Switch to customer account to purchase
                      </Typography>
                    )}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            borderRadius: 3,
            boxShadow: "0px 8px 24px rgba(0,0,0,0.15)",
            fontWeight: 500,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}