import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  keyframes,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ArrowForward, FilterList, Storefront } from "@mui/icons-material";
import { apiClient } from "~/lib/api/client";
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

export default function Ventures() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam || "all"
  );

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiClient.getCategories(),
  });

  const { data: ventures = [], isLoading: venturesLoading } = useQuery({
    queryKey: ["ventures", selectedCategory],
    queryFn: () =>
      apiClient.getVentures(
        selectedCategory !== "all"
          ? { categoryExternalId: selectedCategory }
          : undefined
      ),
  });

  if (categoriesLoading || venturesLoading) {
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
            Cargando emprendimientos...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{ bgcolor: "background.default", minHeight: "calc(100vh - 70px)" }}
    >
      {/* Header Section */}
      <Box
        sx={{
          background:
            "linear-gradient(160deg, #1e3a5f 0%, #2d5a87 40%, #3d7ab7 100%)",
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
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
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
              fontSize: { xs: "2rem", md: "3rem" },
              letterSpacing: "-0.03em",
              animation: `${fadeInUp} 0.6s ease-out`,
            }}
          >
            Emprendimientos
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.2rem" },
              opacity: 0.9,
              maxWidth: 600,
              animation: `${fadeInUp} 0.6s ease-out 0.1s both`,
            }}
          >
            Descubre emprendimientos locales con productos únicos y de calidad.
            Apoya el comercio local y encuentra lo que necesitas.
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
            <FilterList sx={{ color: "primary.main" }} />
            <Typography sx={{ fontWeight: 600, color: "primary.main" }}>
              Filtrar:
            </Typography>
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
            <InputLabel>Categoría</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Categoría"
            >
              <MenuItem value="all">Todas las Categorías</MenuItem>
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
              {ventures.length} emprendimiento{ventures.length !== 1 ? "s" : ""}{" "}
              encontrado{ventures.length !== 1 ? "s" : ""}
            </Typography>
          </Box>
        </Box>

        {ventures.length === 0 ? (
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
                width: 100,
                height: 100,
                borderRadius: "50%",
                bgcolor: "rgba(30,58,95,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <Storefront sx={{ fontSize: 50, color: "primary.main" }} />
            </Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 1, color: "primary.main" }}
            >
              No hay emprendimientos disponibles
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: "1.1rem" }}>
              Intenta seleccionar otra categoría
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {ventures.map((venture, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={venture.externalId}
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
                      boxShadow: "0px 20px 40px rgba(30,58,95,0.15)",
                      "& .venture-image": {
                        transform: "scale(1.08)",
                      },
                      "& .venture-overlay": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <ImageWithLoader
                      src={
                        venture.imageUrl ||
                        "https://via.placeholder.com/400x250?text=Emprendimiento"
                      }
                      alt={venture.name}
                      height={220}
                      className="venture-image"
                    />
                    <Box
                      className="venture-overlay"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(30,58,95,0.8) 0%, transparent 60%)",
                        opacity: 0,
                        transition: "opacity 0.4s ease",
                        display: "flex",
                        alignItems: "flex-end",
                        p: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                        }}
                      >
                        Ver productos →
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        bgcolor: "rgba(30,58,95,0.9)",
                        backdropFilter: "blur(10px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      <Storefront fontSize="small" />
                    </Box>
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 1.5,
                        color: "primary.main",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {venture.name}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        lineHeight: 1.7,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: 48,
                      }}
                    >
                      {venture.description || "Sin descripción disponible"}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                      {venture.categories.slice(0, 3).map((category) => (
                        <Chip
                          key={category.externalId}
                          label={category.name}
                          size="small"
                          sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                            height: 26,
                            borderRadius: 1.5,
                          }}
                        />
                      ))}
                      {venture.categories.length > 3 && (
                        <Chip
                          label={`+${venture.categories.length - 3}`}
                          size="small"
                          sx={{
                            bgcolor: "secondary.main",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                            height: 26,
                            borderRadius: 1.5,
                          }}
                        />
                      )}
                    </Box>
                  </CardContent>

                  <Box sx={{ p: 3, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      endIcon={<ArrowForward />}
                      onClick={() =>
                        navigate(`/ventures/${venture.externalId}`)
                      }
                      sx={{
                        py: 1.5,
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        bgcolor: "primary.main",
                        borderRadius: 3,
                        boxShadow: "0px 4px 14px rgba(30,58,95,0.25)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "primary.dark",
                          transform: "translateY(-2px)",
                          boxShadow: "0px 8px 20px rgba(30,58,95,0.35)",
                        },
                      }}
                    >
                      Ver Productos
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
