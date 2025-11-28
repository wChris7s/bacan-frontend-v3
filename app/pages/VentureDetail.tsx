import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  keyframes,
  Snackbar,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  CheckCircle,
  ShoppingCart,
  Storefront,
} from "@mui/icons-material";
import { useState } from "react";
import { apiClient } from "~/lib/api/client";
import { useAuthStore } from "~/store/authStore";
import { useCartStore } from "~/store/cartStore";
import { ImageWithLoader } from "~/components/common/ImageWithLoader";

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

export default function VentureDetail() {
  const { ventureId } = useParams();
  const navigate = useNavigate();
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
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const setCart = useCartStore((state) => state.setCart);

  const {
    data: venture,
    isLoading: ventureLoading,
    error: ventureError,
  } = useQuery({
    queryKey: ["venture", ventureId],
    queryFn: () => apiClient.getVenture(ventureId!),
    enabled: !!ventureId,
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["venture-products", ventureId],
    queryFn: () => apiClient.getProducts({ ventureExternalId: ventureId }),
    enabled: !!ventureId,
  });

  const handleAddToCart = async (productExternalId: string) => {
    if (!isHydrated) return;

    if (!user || !isCustomer()) {
      setSnackbar({
        open: true,
        message:
          "Por favor, inicia sesión como cliente para agregar productos al carrito",
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
        message: "¡Producto agregado al carrito!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error al agregar el producto al carrito",
        severity: "error",
      });
    }
  };

  if (ventureLoading || productsLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 70px)",
          bgcolor: "background.default",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress sx={{ color: "primary.main", mb: 2 }} size={48} />
          <Typography color="text.secondary">
            Cargando emprendimiento...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (ventureError || !venture) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 70px)",
          bgcolor: "background.default",
          p: 4,
        }}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            bgcolor: "rgba(244,67,54,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Storefront sx={{ fontSize: 50, color: "error.main" }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Emprendimiento no encontrado
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          El emprendimiento que buscas no existe o ha sido eliminado
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/ventures")}
          sx={{
            bgcolor: "primary.main",
            px: 4,
            py: 1.5,
            borderRadius: 3,
          }}
        >
          Volver a Emprendimientos
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{ bgcolor: "background.default", minHeight: "calc(100vh - 70px)" }}
    >
      {/* Header Section with Venture Info */}
      <Box
        sx={{
          background:
            "linear-gradient(160deg, #1e3a5f 0%, #2d5a87 40%, #3d7ab7 100%)",
          color: "white",
          py: { xs: 4, md: 6 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/ventures")}
            sx={{
              color: "white",
              mb: 3,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Volver a Emprendimientos
          </Button>

          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0px 20px 40px rgba(0,0,0,0.3)",
                }}
              >
                <ImageWithLoader
                  src={
                    venture.imageUrl ||
                    "https://via.placeholder.com/400x300?text=Emprendimiento"
                  }
                  alt={venture.name}
                  height={250}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ animation: `${fadeInUp} 0.6s ease-out` }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      bgcolor: "rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Storefront sx={{ fontSize: 28 }} />
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "1.8rem", md: "2.5rem" },
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {venture.name}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    opacity: 0.9,
                    mb: 3,
                    lineHeight: 1.7,
                    maxWidth: 600,
                  }}
                >
                  {venture.description ||
                    "Este emprendimiento aún no tiene descripción."}
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {venture.categories.map((category) => (
                    <Chip
                      key={category.externalId}
                      label={category.name}
                      sx={{
                        bgcolor: "rgba(255,152,0,0.9)",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                      }}
                    />
                  ))}
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ opacity: 0.8, fontSize: "0.95rem" }}>
                    {products.length} producto{products.length !== 1 ? "s" : ""}{" "}
                    disponible{products.length !== 1 ? "s" : ""}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Products Section */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 4,
            color: "primary.main",
            animation: `${fadeInUp} 0.6s ease-out`,
          }}
        >
          Productos de {venture.name}
        </Typography>

        {products.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 10,
              bgcolor: "white",
              borderRadius: 4,
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: "rgba(30,58,95,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <ShoppingCart sx={{ fontSize: 40, color: "primary.main" }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Este emprendimiento aún no tiene productos
            </Typography>
            <Typography color="text.secondary">
              Vuelve pronto para ver las novedades
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
                    },
                  }}
                >
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <ImageWithLoader
                      src={
                        product.imageUrl ||
                        "https://via.placeholder.com/400x300?text=Producto"
                      }
                      alt={product.name}
                      height={200}
                      className="product-image"
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
                        Agotado
                      </Box>
                    )}
                    {product.stock > 0 && product.stock <= 5 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          bgcolor: "rgba(255,152,0,0.9)",
                          color: "white",
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        ¡Últimas unidades!
                      </Box>
                    )}
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      noWrap
                      sx={{ fontWeight: 700, color: "primary.main" }}
                    >
                      {product.name}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        lineHeight: 1.7,
                        minHeight: 48,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {product.description || "Sin descripción"}
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
                            bgcolor: "rgba(30,58,95,0.1)",
                            color: "primary.main",
                            fontWeight: 600,
                            fontSize: "0.7rem",
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
                            color: "secondary.main",
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
                            ? `${product.stock} disponibles`
                            : "Sin stock"}
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
                      disabled={
                        product.stock === 0 ||
                        (isHydrated && user !== null && !isCustomer())
                      }
                      sx={{
                        py: 1.5,
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        bgcolor: "primary.main",
                        borderRadius: 3,
                        boxShadow: "0px 4px 12px rgba(30,58,95,0.25)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "primary.dark",
                          transform: "translateY(-2px)",
                          boxShadow: "0px 8px 20px rgba(30,58,95,0.35)",
                        },
                        "&:disabled": {
                          bgcolor: "#e0e0e0",
                          color: "#999",
                        },
                      }}
                    >
                      {product.stock === 0 ? "Sin Stock" : "Agregar al Carrito"}
                    </Button>
                    {isHydrated && user && !isCustomer() && (
                      <Typography
                        sx={{
                          mt: 1,
                          textAlign: "center",
                          fontSize: "0.75rem",
                          color: "text.secondary",
                        }}
                      >
                        Inicia sesión como cliente para comprar
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