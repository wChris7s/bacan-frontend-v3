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
      <Box sx={{ bgcolor: "#fafafa", minHeight: "calc(100vh - 70px)" }}>
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
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Access Denied
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: "1.1rem" }}>
              This page is only accessible to entrepreneurs
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
          bgcolor: "#fafafa",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress sx={{ color: "black", mb: 2 }} size={48} />
          <Typography color="text.secondary">Loading dashboard...</Typography>
        </Box>
      </Box>
    );
  }

  // Calculate stats
  const totalProducts = ventures.reduce((acc, v) => acc, 0);
  const stats = [
    {
      label: "Ventures",
      value: ventures.length,
      icon: <Store />,
      color: "#000",
    },
    {
      label: "Products",
      value: products.length,
      icon: <Inventory />,
      color: "#333",
    },
    {
      label: "Categories",
      value: ventures.flatMap((v) => v.categories).length,
      icon: <TrendingUp />,
      color: "#555",
    },
  ];

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
                Welcome back, {user.firstName}!
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  opacity: 0.7,
                  fontSize: "1.1rem",
                  animation: `${fadeInUp} 0.6s ease-out 0.1s both`,
                }}
              >
                Manage your ventures and products
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
                bgcolor: "black",
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
                  color: "black",
                },
              },
            }}
          >
            <Tab icon={<Store />} label="My Ventures" iconPosition="start" />
            <Tab
              icon={<Inventory />}
              label="My Products"
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
                Create New Venture
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
                      bgcolor: "rgba(0,0,0,0.03)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                    }}
                  >
                    <Store sx={{ fontSize: 50, color: "text.secondary" }} />
                  </Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    No ventures yet
                  </Typography>
                  <Typography
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 4, maxWidth: 400, mx: "auto" }}
                  >
                    Create your first venture to start selling and grow your
                    business
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setVentureDialogOpen(true)}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontWeight: 700,
                      bgcolor: "black",
                      borderRadius: 3,
                      "&:hover": {
                        bgcolor: "#1a1a1a",
                      },
                    }}
                  >
                    Create Venture
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
                  bgcolor: "black",
                  borderRadius: 3,
                  boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "#1a1a1a",
                    transform: "translateY(-2px)",
                    boxShadow: "0px 12px 32px rgba(0,0,0,0.25)",
                  },
                  "&:disabled": {
                    bgcolor: "#e0e0e0",
                  },
                }}
              >
                Create New Product
              </Button>
              {ventures.length === 0 && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ fontWeight: 500 }}
                >
                  Create a venture first before adding products
                </Typography>
              )}
            </Box>

            {selectedVenture ? (
              productsLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                  <CircularProgress sx={{ color: "black" }} size={48} />
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
                        bgcolor: "rgba(0,0,0,0.03)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                      }}
                    >
                      <Inventory
                        sx={{ fontSize: 50, color: "text.secondary" }}
                      />
                    </Box>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 700 }}
                    >
                      No products in this venture
                    </Typography>
                    <Typography
                      color="text.secondary"
                      paragraph
                      sx={{ mb: 4, maxWidth: 400, mx: "auto" }}
                    >
                      Add your first product to start selling
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() => setProductDialogOpen(true)}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontWeight: 700,
                        bgcolor: "black",
                        borderRadius: 3,
                        "&:hover": {
                          bgcolor: "#1a1a1a",
                        },
                      }}
                    >
                      Add Product
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
                      bgcolor: "rgba(0,0,0,0.03)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                    }}
                  >
                    <ShoppingCart
                      sx={{ fontSize: 50, color: "text.secondary" }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    Select a venture to view products
                  </Typography>
                  <Typography color="text.secondary">
                    Go to "My Ventures" tab and click on a venture
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
