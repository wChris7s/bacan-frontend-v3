import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  keyframes,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {
  Add,
  Inventory,
  ShoppingCart,
  Store,
  TrendingUp,
} from "@mui/icons-material";
import { apiClient } from "../lib/api/client";
import { useAuthStore } from "../store/authStore";
import { CreateVentureDialog } from "../components/ventures/CreateVentureDialog";
import { CreateProductDialog } from "../components/products/CreateProductDialog";
import { VentureCard } from "../components/ventures/VentureCard";
import { ProductCard } from "../components/products/ProductCard";

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

export default function Dashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [ventureDialogOpen, setVentureDialogOpen] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [selectedVenture, setSelectedVenture] = useState<string | null>(null);

  const user = useAuthStore((state) => state.user);
  const isEntrepreneur = useAuthStore((state) => state.isEntrepreneur);

  const {
    data: ventures = [],
    isLoading: venturesLoading,
    refetch: refetchVentures,
  } = useQuery({
    queryKey: ["ventures", user?.externalId],
    queryFn: () => apiClient.getVentures({ userExternalId: user!.externalId }),
    enabled: !!user && isEntrepreneur(),
  });

  const {
    data: products = [],
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products", selectedVenture],
    queryFn: () =>
      selectedVenture
        ? apiClient.getProducts({ ventureExternalId: selectedVenture })
        : Promise.resolve([]),
    enabled: !!selectedVenture,
  });

  if (!user || !isEntrepreneur()) {
    return (
      <Box
        sx={{ bgcolor: "background.default", minHeight: "calc(100vh - 70px)" }}
      >
        <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
          <Box
            sx={{
              bgcolor: "white",
              p: 8,
              borderRadius: 5,
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0px 12px 40px rgba(0,0,0,0.06)",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}
            >
              Acceso Denegado
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: "1.1rem" }}>
              Esta página solo es accesible para emprendedores
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  if (venturesLoading) {
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
          <Typography color="text.secondary">Cargando panel...</Typography>
        </Box>
      </Box>
    );
  }

  // Calculate stats
  const stats = [
    {
      label: "Emprendimientos",
      value: ventures.length,
      icon: <Store />,
      color: "#1e3a5f",
    },
    {
      label: "Productos",
      value: products.length,
      icon: <Inventory />,
      color: "#2d5a87",
    },
    {
      label: "Categorías",
      value: ventures.flatMap((v) => v.categories).length,
      icon: <TrendingUp />,
      color: "#3d7ab7",
    },
  ];

  return (
    <Box
      sx={{ bgcolor: "background.default", minHeight: "calc(100vh - 70px)" }}
    >
      {/* Header */}
      <Box
        sx={{
          background:
            "linear-gradient(160deg, #1e3a5f 0%, #2d5a87 40%, #3d7ab7 100%)",
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
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2rem", md: "2.75rem" },
                  letterSpacing: "-0.03em",
                  animation: `${fadeInUp} 0.6s ease-out`,
                }}
              >
                ¡Bienvenido, {user.firstName}!
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  opacity: 0.7,
                  fontSize: "1.1rem",
                  animation: `${fadeInUp} 0.6s ease-out 0.1s both`,
                }}
              >
                Administra tus emprendimientos y productos
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 4 }} key={index}>
              <Card
                sx={{
                  bgcolor: "white",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 4,
                  p: 3,
                  transition: "all 0.3s ease",
                  animation: `${fadeInUp} 0.5s ease-out ${0.1 * index}s both`,
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 12px 32px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      color="text.secondary"
                      sx={{ fontSize: "0.9rem", fontWeight: 500 }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        mt: 0.5,
                        letterSpacing: "-0.02em",
                        color: "primary.main",
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      bgcolor: stat.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Tabs */}
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 4,
            border: "1px solid rgba(0,0,0,0.06)",
            mb: 4,
            overflow: "hidden",
            animation: `${fadeInUp} 0.6s ease-out 0.3s both`,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={(_, v) => setTabValue(v)}
            sx={{
              "& .MuiTabs-indicator": {
                bgcolor: "primary.main",
                height: 3,
              },
              "& .MuiTab-root": {
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
                minHeight: 64,
                px: 4,
                transition: "all 0.3s ease",
                "&.Mui-selected": {
                  color: "primary.main",
                },
              },
            }}
          >
            <Tab
              icon={<Store />}
              label="Mis Emprendimientos"
              iconPosition="start"
            />
            <Tab
              icon={<Inventory />}
              label="Mis Productos"
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Ventures Tab */}
        {tabValue === 0 && (
          <Box sx={{ animation: `${fadeInUp} 0.5s ease-out` }}>
            <Box sx={{ mb: 4 }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setVentureDialogOpen(true)}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  bgcolor: "primary.main",
                  borderRadius: 3,
                  boxShadow: "0px 8px 24px rgba(30,58,95,0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "primary.dark",
                    transform: "translateY(-2px)",
                    boxShadow: "0px 12px 32px rgba(30,58,95,0.4)",
                  },
                }}
              >
                Crear Nuevo Emprendimiento
              </Button>
            </Box>

            {ventures.length === 0 ? (
              <Card
                sx={{
                  bgcolor: "white",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 4,
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 10 }}>
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      bgcolor: "rgba(30,58,95,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                    }}
                  >
                    <Store sx={{ fontSize: 50, color: "primary.main" }} />
                  </Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 700, color: "primary.main" }}
                  >
                    Aún no tienes emprendimientos
                  </Typography>
                  <Typography
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 4, maxWidth: 400, mx: "auto" }}
                  >
                    Crea tu primer emprendimiento para comenzar a vender y hacer
                    crecer tu negocio
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setVentureDialogOpen(true)}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontWeight: 700,
                      bgcolor: "primary.main",
                      borderRadius: 3,
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    }}
                  >
                    Crear Emprendimiento
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Grid container spacing={3}>
                {ventures.map((venture, index) => (
                  <Grid
                    size={{ xs: 12, md: 6 }}
                    key={venture.externalId}
                    sx={{
                      animation: `${fadeInUp} 0.5s ease-out ${0.1 * index}s both`,
                    }}
                  >
                    <VentureCard
                      venture={venture}
                      onSelect={() => {
                        setSelectedVenture(venture.externalId);
                        setTabValue(1);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* Products Tab */}
        {tabValue === 1 && (
          <Box sx={{ animation: `${fadeInUp} 0.5s ease-out` }}>
            <Box
              sx={{
                mb: 4,
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setProductDialogOpen(true)}
                disabled={ventures.length === 0}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  bgcolor: "primary.main",
                  borderRadius: 3,
                  boxShadow: "0px 8px 24px rgba(30,58,95,0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "primary.dark",
                    transform: "translateY(-2px)",
                    boxShadow: "0px 12px 32px rgba(30,58,95,0.4)",
                  },
                  "&:disabled": {
                    bgcolor: "#e0e0e0",
                  },
                }}
              >
                Crear Nuevo Producto
              </Button>
              {ventures.length === 0 && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ fontWeight: 500 }}
                >
                  Crea un emprendimiento primero antes de agregar productos
                </Typography>
              )}
            </Box>

            {selectedVenture ? (
              productsLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                  <CircularProgress sx={{ color: "primary.main" }} size={48} />
                </Box>
              ) : products.length === 0 ? (
                <Card
                  sx={{
                    bgcolor: "white",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: 4,
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 10 }}>
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        bgcolor: "rgba(30,58,95,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                      }}
                    >
                      <Inventory sx={{ fontSize: 50, color: "primary.main" }} />
                    </Box>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 700, color: "primary.main" }}
                    >
                      No hay productos en este emprendimiento
                    </Typography>
                    <Typography
                      color="text.secondary"
                      paragraph
                      sx={{ mb: 4, maxWidth: 400, mx: "auto" }}
                    >
                      Agrega tu primer producto para comenzar a vender
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() => setProductDialogOpen(true)}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontWeight: 700,
                        bgcolor: "primary.main",
                        borderRadius: 3,
                        "&:hover": {
                          bgcolor: "primary.dark",
                        },
                      }}
                    >
                      Agregar Producto
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Grid container spacing={3}>
                  {products.map((product, index) => (
                    <Grid
                      size={{ xs: 12, sm: 6, md: 4 }}
                      key={product.externalId}
                      sx={{
                        animation: `${fadeInUp} 0.5s ease-out ${0.1 * index}s both`,
                      }}
                    >
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>
              )
            ) : (
              <Card
                sx={{
                  bgcolor: "white",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 4,
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 10 }}>
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      bgcolor: "rgba(30,58,95,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                    }}
                  >
                    <ShoppingCart
                      sx={{ fontSize: 50, color: "primary.main" }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 700, color: "primary.main" }}
                  >
                    Selecciona un emprendimiento para ver productos
                  </Typography>
                  <Typography color="text.secondary">
                    Ve a la pestaña "Mis Emprendimientos" y haz clic en uno
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        )}

        <CreateVentureDialog
          open={ventureDialogOpen}
          onClose={() => setVentureDialogOpen(false)}
          onSuccess={() => {
            refetchVentures();
            setVentureDialogOpen(false);
          }}
        />

        <CreateProductDialog
          open={productDialogOpen}
          onClose={() => setProductDialogOpen(false)}
          ventures={ventures}
          onSuccess={() => {
            refetchProducts();
            setProductDialogOpen(false);
          }}
        />
      </Container>
    </Box>
  );
}