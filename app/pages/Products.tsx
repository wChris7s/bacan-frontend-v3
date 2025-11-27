import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
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
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ShoppingCart, Store } from "@mui/icons-material";
import { apiClient } from "~/lib/api/client";
import { useAuthStore } from "~/store/authStore";
import { useCartStore } from "~/store/cartStore";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const user = useAuthStore((state) => state.user);
  const isCustomer = useAuthStore((state) => state.isCustomer);
  const setCart = useCartStore((state) => state.setCart);

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiClient.getCategories(),
  });

  const {
    data: products = [],
    isLoading: productsLoading,
    refetch,
  } = useQuery({
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
      alert("Please login as a customer to add items to cart");
      return;
    }

    try {
      const updatedCart = await apiClient.addToCart(user.externalId, {
        productExternalId,
        quantity: 1,
      });
      setCart(updatedCart);
      alert("Product added to cart!");
    } catch (error) {
      alert("Failed to add product to cart");
    }
  };

  if (categoriesLoading || productsLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#fafafa", minHeight: "calc(100vh - 70px)" }}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Browse Products
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              mb: 4,
            }}
          >
            Discover amazing products from local entrepreneurs
          </Typography>

          <FormControl
            sx={{
              minWidth: 250,
              bgcolor: "white",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          >
            <InputLabel>Filter by Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Filter by Category"
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.externalId} value={category.externalId}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {products.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              bgcolor: "white",
              borderRadius: 3,
              border: "1px solid #f0f0f0",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No products found. Try selecting a different category.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.externalId}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image={
                      product.imageUrl ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={product.name}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      noWrap
                      sx={{ fontWeight: 600 }}
                    >
                      {product.name}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <Store
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {product.ventureName}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, lineHeight: 1.6 }}
                    >
                      {product.description?.substring(0, 100)}
                      {product.description &&
                        product.description.length > 100 &&
                        "..."}
                    </Typography>

                    <Box
                      sx={{
                        mb: 2,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                    >
                      {product.categories.slice(0, 2).map((category) => (
                        <Chip
                          key={category.externalId}
                          label={category.name}
                          size="small"
                          sx={{
                            bgcolor: "black",
                            color: "white",
                            fontWeight: 500,
                            fontSize: "0.75rem",
                          }}
                        />
                      ))}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: "black",
                        }}
                      >
                        ${product.price.toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            product.stock > 0 ? "success.main" : "error.main",
                          fontWeight: 600,
                        }}
                      >
                        Stock: {product.stock}
                      </Typography>
                    </Box>
                  </CardContent>

                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(product.externalId)}
                      disabled={product.stock === 0 || !isCustomer()}
                      sx={{
                        py: 1.2,
                        fontWeight: 600,
                        bgcolor: "black",
                        "&:hover": {
                          bgcolor: "#333",
                        },
                        "&:disabled": {
                          bgcolor: "#e0e0e0",
                        },
                      }}
                    >
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
