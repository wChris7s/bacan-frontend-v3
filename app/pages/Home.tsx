import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  keyframes,
  Typography,
} from "@mui/material";
import {
  ArrowForward,
  Groups,
  Handshake,
  LocalShipping,
  Rocket,
  Security,
  ShoppingBag,
  Speed,
  Storefront,
  TrendingUp,
  Verified,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useAuthStore } from "~/store/authStore";
import { apiClient } from "~/lib/api/client";
import { ImageWithLoader } from "~/components/common/ImageWithLoader";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export default function Home() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isEntrepreneur, isCustomer, isHydrated } =
    useAuthStore();

  // Obtener algunos emprendimientos destacados
  const { data: ventures = [] } = useQuery({
    queryKey: ["featured-ventures"],
    queryFn: () => apiClient.getVentures(),
  });

  // Obtener algunas categorías
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiClient.getCategories(),
  });

  const featuredVentures = ventures.slice(0, 3);

  const features = [
    {
      icon: <Storefront sx={{ fontSize: 36, color: "white" }} />,
      title: "Para Emprendedores",
      description:
        "Crea tu emprendimiento, gestiona tus productos y conecta con clientes de todo el país.",
      color: "#1e3a5f",
    },
    {
      icon: <ShoppingBag sx={{ fontSize: 36, color: "white" }} />,
      title: "Para Compradores",
      description:
        "Descubre productos únicos de emprendedores locales y apoya el comercio local.",
      color: "#2d5a87",
    },
    {
      icon: <TrendingUp sx={{ fontSize: 36, color: "white" }} />,
      title: "Crece con Nosotros",
      description:
        "Desde tu primera venta hasta tu millonésima - nuestra plataforma crece contigo.",
      color: "#3d7ab7",
    },
  ];

  const benefits = [
    {
      icon: <Speed />,
      title: "Rápido y Fácil",
      desc: "Configura tu tienda en minutos",
    },
    {
      icon: <Security />,
      title: "100% Seguro",
      desc: "Transacciones protegidas",
    },
    {
      icon: <LocalShipping />,
      title: "Envíos Nacionales",
      desc: "Llega a todo el país",
    },
    {
      icon: <Handshake />,
      title: "Apoyo Local",
      desc: "Impulsa la economía local",
    },
  ];

  const stats = [
    { value: "500+", label: "Emprendimientos Activos" },
    { value: "2,000+", label: "Productos Disponibles" },
    { value: "98%", label: "Clientes Satisfechos" },
    { value: "24/7", label: "Soporte Disponible" },
  ];

  const testimonials = [
    {
      name: "María García",
      role: "Emprendedora de Artesanías",
      text: "Gracias a Bacan pude llevar mis productos artesanales a todo el país. ¡Mi negocio creció un 200%!",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Carlos Rodríguez",
      role: "Productor de Alimentos",
      text: "La plataforma es muy fácil de usar. En pocas horas ya tenía mi tienda funcionando.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Ana Martínez",
      role: "Diseñadora de Moda",
      text: "Encontré una comunidad increíble de emprendedores. El soporte es excelente.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <Box sx={{ bgcolor: "background.default", overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background:
            "linear-gradient(160deg, #1e3a5f 0%, #2d5a87 40%, #3d7ab7 100%)",
          color: "white",
          py: { xs: 10, md: 16 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background elements */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,152,0,0.2) 0%, transparent 70%)",
            animation: `${float} 8s ease-in-out infinite`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
            animation: `${float} 10s ease-in-out infinite reverse`,
          }}
        />

        {/* Grid pattern overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            opacity: 0.5,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ maxWidth: 900, mx: "auto", textAlign: "center" }}>
            <Chip
              icon={<Rocket sx={{ color: "white !important" }} />}
              label="Plataforma para Emprendedores"
              sx={{
                mb: 4,
                px: 2,
                py: 2.5,
                fontSize: "0.9rem",
                fontWeight: 600,
                bgcolor: "rgba(255,152,0,0.2)",
                color: "white",
                border: "1px solid rgba(255,152,0,0.4)",
                animation: `${fadeInUp} 0.8s ease-out`,
                "& .MuiChip-icon": {
                  color: "white",
                },
              }}
            />

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                fontWeight: 900,
                mb: 3,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                animation: `${fadeInUp} 0.8s ease-out 0.1s both`,
              }}
            >
              Impulsa tu{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(90deg, #ff9800 0%, #ffb74d 50%, #ff9800 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: `${shimmer} 3s linear infinite`,
                }}
              >
                Emprendimiento
              </Box>
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1rem", md: "1.35rem" },
                mb: 5,
                opacity: 0.9,
                fontWeight: 400,
                maxWidth: 650,
                mx: "auto",
                lineHeight: 1.7,
                animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
              }}
            >
              La plataforma que conecta emprendedores con clientes. Crea tu
              tienda, vende tus productos y haz crecer tu negocio sin
              complicaciones.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
                animation: `${fadeInUp} 0.8s ease-out 0.3s both`,
              }}
            >
              {isHydrated && isAuthenticated && user ? (
                <>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      bgcolor: "#ff9800",
                      color: "white",
                      px: 5,
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      borderRadius: 3,
                      boxShadow: "0px 8px 30px rgba(255,152,0,0.4)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        bgcolor: "#f57c00",
                        transform: "translateY(-4px)",
                        boxShadow: "0px 16px 40px rgba(255,152,0,0.5)",
                      },
                    }}
                    onClick={() => navigate("/ventures")}
                  >
                    Explorar Emprendimientos
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "rgba(255,255,255,0.5)",
                      borderWidth: 2,
                      color: "white",
                      px: 5,
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      borderRadius: 3,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        borderColor: "white",
                        borderWidth: 2,
                        bgcolor: "rgba(255,255,255,0.1)",
                        transform: "translateY(-4px)",
                      },
                    }}
                    onClick={() =>
                      navigate(isEntrepreneur() ? "/dashboard" : "/products")
                    }
                  >
                    {isEntrepreneur() ? "Ir a Mi Panel" : "Ver Productos"}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      bgcolor: "#ff9800",
                      color: "white",
                      px: 5,
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      borderRadius: 3,
                      boxShadow: "0px 8px 30px rgba(255,152,0,0.4)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        bgcolor: "#f57c00",
                        transform: "translateY(-4px)",
                        boxShadow: "0px 16px 40px rgba(255,152,0,0.5)",
                      },
                    }}
                    onClick={() => navigate("/register")}
                  >
                    Comenzar Gratis
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "rgba(255,255,255,0.5)",
                      borderWidth: 2,
                      color: "white",
                      px: 5,
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      borderRadius: 3,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        borderColor: "white",
                        borderWidth: 2,
                        bgcolor: "rgba(255,255,255,0.1)",
                        transform: "translateY(-4px)",
                      },
                    }}
                    onClick={() => navigate("/ventures")}
                  >
                    Explorar Emprendimientos
                  </Button>
                </>
              )}
            </Box>
          </Box>

          {/* Stats Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: { xs: 4, md: 8 },
              mt: 10,
              flexWrap: "wrap",
              animation: `${fadeInUp} 0.8s ease-out 0.4s both`,
            }}
          >
            {stats.map((stat, index) => (
              <Box key={index} sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "#ff9800",
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    opacity: 0.8,
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Categories Section */}
      {categories.length > 0 && (
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 2,
                color: "primary.main",
              }}
            >
              Explora por Categoría
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontSize: "1.1rem", maxWidth: 500, mx: "auto" }}
            >
              Encuentra emprendimientos y productos en las categorías que más te
              interesan
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {categories.map((category) => (
              <Chip
                key={category.externalId}
                label={category.name}
                onClick={() =>
                  navigate(`/ventures?category=${category.externalId}`)
                }
                sx={{
                  px: 3,
                  py: 3,
                  fontSize: "1rem",
                  fontWeight: 600,
                  bgcolor: "white",
                  border: "2px solid",
                  borderColor: "primary.light",
                  color: "primary.main",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "white",
                    transform: "translateY(-3px)",
                    boxShadow: "0px 8px 20px rgba(30,58,95,0.3)",
                  },
                }}
              />
            ))}
          </Box>
        </Container>
      )}

      {/* Features Section */}
      <Box sx={{ bgcolor: "white", py: { xs: 8, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip
              label="¿Por qué Bacan?"
              sx={{
                mb: 2,
                px: 2,
                bgcolor: "rgba(30,58,95,0.1)",
                color: "primary.main",
                fontWeight: 700,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 800,
                mb: 2,
                color: "primary.main",
              }}
            >
              Construido para el Éxito
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                fontSize: { xs: "1rem", md: "1.2rem" },
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              Todo lo que necesitas para lanzar, crecer y escalar tu
              emprendimiento
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    p: 4,
                    bgcolor: "white",
                    border: "1px solid",
                    borderColor: "rgba(0,0,0,0.08)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      bgcolor: feature.color,
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    },
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0px 24px 48px rgba(0, 0, 0, 0.12)",
                      "&::before": {
                        transform: "scaleX(1)",
                      },
                      "& .feature-icon": {
                        transform: "scale(1.1) rotate(5deg)",
                      },
                    },
                  }}
                >
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 3,
                      bgcolor: feature.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                      boxShadow: `0px 8px 24px ${feature.color}40`,
                      transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ lineHeight: 1.8, fontSize: "1rem" }}
                  >
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Ventures Section */}
      {featuredVentures.length > 0 && (
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Chip
              label="Destacados"
              sx={{
                mb: 2,
                px: 2,
                bgcolor: "secondary.main",
                color: "white",
                fontWeight: 700,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 800,
                mb: 2,
                color: "primary.main",
              }}
            >
              Emprendimientos Destacados
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontSize: "1.1rem", maxWidth: 500, mx: "auto" }}
            >
              Conoce algunos de los emprendimientos que están triunfando en
              nuestra plataforma
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {featuredVentures.map((venture) => (
              <Grid size={{ xs: 12, md: 4 }} key={venture.externalId}>
                <Card
                  onClick={() => navigate(`/ventures/${venture.externalId}`)}
                  sx={{
                    height: "100%",
                    cursor: "pointer",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
                      "& .venture-image": {
                        transform: "scale(1.05)",
                      },
                    },
                  }}
                >
                  <Box sx={{ overflow: "hidden" }}>
                    <ImageWithLoader
                      src={
                        venture.imageUrl ||
                        "https://via.placeholder.com/400x250?text=Emprendimiento"
                      }
                      alt={venture.name}
                      height={200}
                      className="venture-image"
                    />
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {venture.name}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {venture.description || "Sin descripción"}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {venture.categories.slice(0, 2).map((cat) => (
                        <Chip
                          key={cat.externalId}
                          label={cat.name}
                          size="small"
                          sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              variant="outlined"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate("/ventures")}
              sx={{
                px: 4,
                py: 1.5,
                borderColor: "primary.main",
                color: "primary.main",
                fontWeight: 600,
                borderWidth: 2,
                "&:hover": {
                  borderWidth: 2,
                  bgcolor: "primary.main",
                  color: "white",
                },
              }}
            >
              Ver Todos los Emprendimientos
            </Button>
          </Box>
        </Container>
      )}

      {/* Benefits Section */}
      <Box sx={{ bgcolor: "#f1f5f9", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Chip
                label="Beneficios"
                sx={{
                  mb: 2,
                  px: 2,
                  bgcolor: "secondary.main",
                  color: "white",
                  fontWeight: 700,
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  color: "primary.main",
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                }}
              >
                Todo lo que necesitas para triunfar
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ mb: 4, fontSize: "1.1rem", lineHeight: 1.8 }}
              >
                Desde pagos seguros hasta envíos nacionales, tenemos todas las
                herramientas que necesitas para llevar tu emprendimiento al
                siguiente nivel.
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {benefits.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2.5,
                      p: 2.5,
                      bgcolor: "white",
                      borderRadius: 3,
                      border: "1px solid rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateX(8px)",
                        boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontWeight: 700, mb: 0.5, color: "primary.main" }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{ fontSize: "0.95rem" }}
                      >
                        {item.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: -20,
                    background:
                      "linear-gradient(135deg, rgba(30,58,95,0.1) 0%, transparent 50%)",
                    borderRadius: 6,
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    background:
                      "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)",
                    borderRadius: 5,
                    p: 6,
                    color: "white",
                    textAlign: "center",
                    boxShadow: "0px 32px 64px rgba(30,58,95,0.3)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "4rem",
                      fontWeight: 900,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      mb: 2,
                      color: "#ff9800",
                    }}
                  >
                    0%
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.5rem",
                      opacity: 0.9,
                      mb: 1,
                      fontWeight: 700,
                    }}
                  >
                    Comisión
                  </Typography>
                  <Typography sx={{ fontSize: "1rem", opacity: 0.7 }}>
                    Quédate con el 100% de tus ganancias
                  </Typography>

                  <Box
                    sx={{
                      mt: 4,
                      pt: 4,
                      borderTop: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", justifyContent: "center", gap: 4 }}
                    >
                      <Box sx={{ textAlign: "center" }}>
                        <Verified
                          sx={{ fontSize: 32, color: "#4ade80", mb: 1 }}
                        />
                        <Typography sx={{ fontSize: "0.85rem", opacity: 0.8 }}>
                          Verificado
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Groups
                          sx={{ fontSize: 32, color: "#60a5fa", mb: 1 }}
                        />
                        <Typography sx={{ fontSize: "0.85rem", opacity: 0.8 }}>
                          Comunidad
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <TrendingUp
                          sx={{ fontSize: 32, color: "#fbbf24", mb: 1 }}
                        />
                        <Typography sx={{ fontSize: "0.85rem", opacity: 0.8 }}>
                          Crecimiento
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Chip
            label="Testimonios"
            sx={{
              mb: 2,
              px: 2,
              bgcolor: "rgba(30,58,95,0.1)",
              color: "primary.main",
              fontWeight: 700,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 800,
              mb: 2,
              color: "primary.main",
            }}
          >
            Lo que Dicen Nuestros Emprendedores
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  p: 4,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0px 16px 32px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    lineHeight: 1.8,
                    mb: 3,
                    color: "text.secondary",
                    fontStyle: "italic",
                  }}
                >
                  "{testimonial.text}"
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <ImageWithLoader
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    borderRadius="50%"
                  />
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: "primary.main" }}>
                      {testimonial.name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "0.85rem", color: "text.secondary" }}
                    >
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background:
            "linear-gradient(160deg, #1e3a5f 0%, #2d5a87 40%, #3d7ab7 100%)",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "150%",
            height: "150%",
            background:
              "radial-gradient(ellipse at center, rgba(255,152,0,0.1) 0%, transparent 50%)",
          }}
        />

        <Container
          maxWidth="md"
          sx={{ textAlign: "center", position: "relative", zIndex: 1 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3.5rem" },
              fontWeight: 800,
              mb: 3,
              color: "white",
            }}
          >
            ¿Listo para Emprender?
          </Typography>
          <Typography
            sx={{
              mb: 5,
              fontSize: { xs: "1rem", md: "1.25rem" },
              color: "rgba(255,255,255,0.8)",
              maxWidth: 500,
              mx: "auto",
            }}
          >
            Únete a cientos de emprendedores que ya están construyendo sus
            sueños en Bacan
          </Typography>
          {(!isHydrated || !isAuthenticated) && (
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: "#ff9800",
                color: "white",
                px: 6,
                py: 2,
                fontSize: "1.15rem",
                fontWeight: 700,
                borderRadius: 3,
                boxShadow: "0px 8px 30px rgba(255,152,0,0.4)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  bgcolor: "#f57c00",
                  transform: "translateY(-4px) scale(1.02)",
                  boxShadow: "0px 16px 40px rgba(255,152,0,0.5)",
                },
              }}
              onClick={() => navigate("/register")}
            >
              Crear Mi Cuenta Gratis
            </Button>
          )}
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#0d2840", py: 4 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Storefront sx={{ color: "white", fontSize: 28 }} />
              <Typography
                sx={{ color: "white", fontWeight: 800, fontSize: "1.25rem" }}
              >
                BACAN
              </Typography>
            </Box>
            <Typography
              sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}
            >
              © 2025 Bacan. Todos los derechos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
