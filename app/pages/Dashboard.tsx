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
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Add, Inventory, Store } from "@mui/icons-material";
import { apiClient } from "../lib/api/client";
import { useAuthStore } from "../store/authStore";
import { CreateVentureDialog } from "../components/ventures/CreateVentureDialog";
import { CreateProductDialog } from "../components/products/CreateProductDialog";
import { VentureCard } from "../components/ventures/VentureCard";
import { ProductCard } from "../components/products/ProductCard";

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
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4">Access Denied</Typography>
        <Typography color="text.secondary">
          This page is only accessible to entrepreneurs
        </Typography>
      </Container>
    );
  }

  if (venturesLoading) {
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
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            My Dashboard
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ fontSize: { xs: "1rem", md: "1.1rem" } }}
          >
            Manage your ventures and products
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            border: "1px solid #f0f0f0",
            mb: 4,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={(_, v) => setTabValue(v)}
            sx={{
              "& .MuiTab-root": {
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
                minHeight: 64,
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

        {tabValue === 0 && (
          <>
            <Box sx={{ mb: 4 }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setVentureDialogOpen(true)}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  bgcolor: "black",
                  "&:hover": {
                    bgcolor: "#333",
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
                  border: "1px solid #f0f0f0",
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 8 }}>
                  <Store
                    sx={{ fontSize: 80, color: "text.secondary", mb: 3 }}
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    No ventures yet
                  </Typography>
                  <Typography color="text.secondary" paragraph sx={{ mb: 4 }}>
                    Create your first venture to start selling
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setVentureDialogOpen(true)}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      bgcolor: "black",
                      "&:hover": {
                        bgcolor: "#333",
                      },
                    }}
                  >
                    Create Venture
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Grid container spacing={3}>
                {ventures.map((venture) => (
                  <Grid size={{ xs: 12, md: 6 }} key={venture.externalId}>
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
          </>
        )}

        {tabValue === 1 && (
          <>
            <Box sx={{ mb: 4 }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setProductDialogOpen(true)}
                disabled={ventures.length === 0}
                sx={{
                  px: 4,
                  py: 1.5,
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
                Create New Product
              </Button>
              {ventures.length === 0 && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  Create a venture first before adding products
                </Typography>
              )}
            </Box>

            {selectedVenture ? (
              productsLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                  <CircularProgress sx={{ color: "black" }} />
                </Box>
              ) : products.length === 0 ? (
                <Card
                  sx={{
                    bgcolor: "white",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 8 }}>
                    <Inventory
                      sx={{ fontSize: 80, color: "text.secondary", mb: 3 }}
                    />
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      No products in this venture
                    </Typography>
                    <Typography color="text.secondary" paragraph sx={{ mb: 4 }}>
                      Add your first product to start selling
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() => setProductDialogOpen(true)}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        bgcolor: "black",
                        "&:hover": {
                          bgcolor: "#333",
                        },
                      }}
                    >
                      Add Product
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Grid container spacing={3}>
                  {products.map((product) => (
                    <Grid
                      size={{ xs: 12, sm: 6, md: 4 }}
                      key={product.externalId}
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
                  border: "1px solid #f0f0f0",
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 8 }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Select a venture to view its products
                  </Typography>
                  <Typography color="text.secondary">
                    Go to "My Ventures" tab and click on a venture
                  </Typography>
                </CardContent>
              </Card>
            )}
          </>
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
