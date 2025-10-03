import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Chip,
  Rating,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  TrendingUp,
  ShoppingCart,
  Today,
  Star,
  Email,
  Phone,
  Settings,
  AttachMoney,
  Inventory,
  Reviews,
  Edit,
  Visibility,
  Add,
} from "@mui/icons-material";

// 🔹 Tipos TypeScript
interface MetricCardProps {
  icon: React.ReactElement;
  value: number;
  label: string;
  color: string;
  bgcolor: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
}

interface ProductItemProps {
  product: Product;
}

interface FinanceCardProps {
  value: number;
  label: string;
  color: string;
  bgcolor: string;
}

// 🔹 Datos de ejemplo
const dashboardData = {
  metrics: {
    totalProducts: 156,
    totalSales: 2847,
    todayOrders: 23,
    averageRating: 4.6,
  },
  storeInfo: {
    logo: "/logo.png",
    name: "Mi Tienda Emprendedora",
    description:
      "Productos artesanales de calidad premium hechos con amor y dedicación para toda la familia.",
    email: "contacto@mitienda.com",
    phone: "+56 9 1234 5678",
  },
  recentReviews: [
    {
      id: 1,
      customer: "María González",
      rating: 5,
      comment: "Excelente producto, muy buena calidad",
      date: "2025-01-03",
    },
    {
      id: 2,
      customer: "Juan Pérez",
      rating: 4,
      comment: "Muy satisfecho con la compra",
      date: "2025-01-02",
    },
    {
      id: 3,
      customer: "Ana López",
      rating: 5,
      comment: "Superó mis expectativas",
      date: "2025-01-01",
    },
  ],
  recentProducts: [
    {
      id: 1,
      name: "Producto Artesanal 1",
      price: 15990,
      stock: 25,
      image: "/logo.png",
    },
    {
      id: 2,
      name: "Producto Premium 2",
      price: 29990,
      stock: 12,
      image: "/logo.png",
    },
    {
      id: 3,
      name: "Producto Especial 3",
      price: 45990,
      stock: 8,
      image: "/logo.png",
    },
  ],
  finances: {
    totalRevenue: 1254000,
    monthlyRevenue: 156000,
    pendingPayments: 45000,
    profit: 89000,
  },
};

// 🔹 Componente reutilizable para métricas
const MetricCard: React.FC<MetricCardProps> = ({ icon, value, label, color, bgcolor }) => (
  <Card
    sx={{
      bgcolor,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      transition: "0.3s",
      "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
    }}
  >
    <CardContent
      sx={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
        minHeight: 120,
      }}
    >
      <Box sx={{ fontSize: 40, color, mr: 2, display: 'flex', alignItems: 'center' }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold", color }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

// 🔹 Componente para productos
const ProductItem: React.FC<ProductItemProps> = ({ product }) => (
  <ListItem sx={{ px: 0 }}>
    <ListItemAvatar>
      <Avatar src={product.image} variant="rounded" />
    </ListItemAvatar>
    <ListItemText
      primary={product.name}
      secondary={
        <Box>
          <Typography
            variant="body2"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            ${product.price.toLocaleString()}
          </Typography>
          <Chip
            label={`Stock: ${product.stock}`}
            size="small"
            color={product.stock > 10 ? "success" : "warning"}
          />
        </Box>
      }
    />
    <IconButton>
      <Visibility />
    </IconButton>
  </ListItem>
);

// 🔹 Componente para tarjetas de finanzas
const FinanceCard: React.FC<FinanceCardProps> = ({ value, label, color, bgcolor }) => (
  <Paper
    sx={{
      p: 2,
      bgcolor,
      textAlign: "center",
      borderRadius: 2,
      transition: "0.3s",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: 80,
      "&:hover": { boxShadow: 4 },
    }}
  >
    <Typography variant="h6" sx={{ color, fontWeight: "bold" }}>
      ${value.toLocaleString()}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
  </Paper>
);

export default function EmprendedorScreen() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: theme.palette.grey[100],
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 3, color: theme.palette.primary.main, fontWeight: "bold" }}
      >
        Dashboard del Emprendedor
      </Typography>

      {/* Métricas Principales */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        <MetricCard
          icon={<Inventory sx={{ fontSize: 40, color: theme.palette.primary.main }} />}
          value={dashboardData.metrics.totalProducts}
          label="Productos Totales"
          color={theme.palette.primary.main}
          bgcolor={theme.palette.primary.light + "33"}
        />
        <MetricCard
          icon={<TrendingUp sx={{ fontSize: 40, color: theme.palette.success.main }} />}
          value={dashboardData.metrics.totalSales}
          label="Ventas Totales"
          color={theme.palette.success.main}
          bgcolor={theme.palette.success.light + "33"}
        />
        <MetricCard
          icon={<Today sx={{ fontSize: 40, color: theme.palette.warning.main }} />}
          value={dashboardData.metrics.todayOrders}
          label="Pedidos Hoy"
          color={theme.palette.warning.main}
          bgcolor={theme.palette.warning.light + "33"}
        />
        <MetricCard
          icon={<Star sx={{ fontSize: 40, color: theme.palette.error.main }} />}
          value={dashboardData.metrics.averageRating}
          label="Rating Promedio"
          color={theme.palette.error.main}
          bgcolor={theme.palette.error.light + "33"}
        />
      </Box>

      {/* Información de la Tienda y Reseñas */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        {/* Información de la Tienda */}
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                mb: 2,
                height: "100%",
              }}
            >
              <Avatar
                src={dashboardData.storeInfo.logo}
                sx={{
                  width: 80,
                  height: 80,
                  mr: 3,
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flexGrow: 1, minHeight: 150 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                  {dashboardData.storeInfo.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {dashboardData.storeInfo.description}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Email sx={{ fontSize: 16, mr: 1, color: "#666" }} />
                  <Typography variant="body2">
                    {dashboardData.storeInfo.email}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Phone sx={{ fontSize: 16, mr: 1, color: "#666" }} />
                  <Typography variant="body2">
                    {dashboardData.storeInfo.phone}
                  </Typography>
                </Box>
              </Box>
              <IconButton sx={{ alignSelf: "flex-start" }}>
                <Edit />
              </IconButton>
            </Box>
          </CardContent>
        </Card>

        {/* Reseñas */}
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Reseñas Recientes
              </Typography>
              <Reviews color="primary" />
            </Box>
            <List sx={{ flexGrow: 1, overflow: "auto" }}>
              {dashboardData.recentReviews.map((review, index) => (
                <React.Fragment key={review.id}>
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        {review.customer.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="subtitle2">{review.customer}</Typography>
                          <Rating value={review.rating} size="small" readOnly />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 0.5 }}
                          >
                            {review.comment}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {review.date}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < dashboardData.recentReviews.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      {/* Productos Recientes y Finanzas */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        {/* Productos */}
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Productos Recientes
              </Typography>
              <Button startIcon={<Add />} variant="outlined" size="small">
                Agregar
              </Button>
            </Box>
            <List sx={{ flexGrow: 1 }}>
              {dashboardData.recentProducts.map((product, index) => (
                <React.Fragment key={product.id}>
                  <ProductItem product={product} />
                  {index < dashboardData.recentProducts.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Finanzas */}
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Finanzas
              </Typography>
              <AttachMoney sx={{ color: theme.palette.success.main }} />
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
                flexGrow: 1,
              }}
            >
              <FinanceCard
                value={dashboardData.finances.totalRevenue}
                label="Ingresos Totales"
                color={theme.palette.success.main}
                bgcolor={theme.palette.success.light + "33"}
              />
              <FinanceCard
                value={dashboardData.finances.monthlyRevenue}
                label="Este Mes"
                color={theme.palette.primary.main}
                bgcolor={theme.palette.primary.light + "33"}
              />
              <FinanceCard
                value={dashboardData.finances.pendingPayments}
                label="Pagos Pendientes"
                color={theme.palette.warning.main}
                bgcolor={theme.palette.warning.light + "33"}
              />
              <FinanceCard
                value={dashboardData.finances.profit}
                label="Ganancia"
                color={theme.palette.success.dark}
                bgcolor={theme.palette.success.light + "33"}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Configuración */}
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Configuración de la Tienda
            </Typography>
            <Settings sx={{ color: "#666" }} />
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              fullWidth
              sx={{ py: 2 }}
              startIcon={<Edit />}
            >
              Editar Perfil
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ py: 2 }}
              startIcon={<Inventory />}
            >
              Gestionar Productos
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ py: 2 }}
              startIcon={<ShoppingCart />}
            >
              Ver Pedidos
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ py: 2 }}
              startIcon={<AttachMoney />}
            >
              Configurar Pagos
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
