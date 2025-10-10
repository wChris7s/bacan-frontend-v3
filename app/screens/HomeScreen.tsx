import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

export default function HomeScreen() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #e0e7ff 0%, #a7c6f9 100%)",
        width: "100%",
      }}
    >
      {/* Hero Section */}
      <Container
        sx={{
          py: { xs: 6, md: 10 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 6,
        }}
      >
        <Box sx={{ flex: 1, zIndex: 1 }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#27282C", fontSize: { xs: 32, md: 48 } }}
          >
            Descubre productos únicos de emprendedores locales
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              maxWidth: 600,
              color: "#27282C",
              fontSize: { xs: 16, md: 20 },
            }}
          >
            Descubre una selección exclusiva de productos innovadores y
            creativos, hechos por emprendedores locales, solo en nuestra
            plataforma. Cada compra que haces impulsa sueños y fortalece
            negocios emergentes.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/products")}
              sx={{
                fontWeight: 700,
                fontSize: 18,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                boxShadow: 2,
                bgcolor: "#27282C",
                color: "#fff",
                ":hover": { bgcolor: "#111", color: "#fff" },
              }}
            >
              Compra Ahora
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/about")}
              sx={{
                fontWeight: 700,
                fontSize: 18,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                color: "#fff",
                borderColor: "#27282C",
                bgcolor: "#27282C",
                ":hover": {
                  borderColor: "#111",
                  bgcolor: "#111",
                  color: "#fff",
                },
              }}
            >
              Sobre Nosotros
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            minHeight: 320,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, #a7c6f9 60%, #e0e7ff 100%)",
              zIndex: 0,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              filter: "blur(10px)",
              opacity: 0.5,
            }}
          />
          <img
            src="https://img.freepik.com/foto-gratis/mujer-emprendedora-cajas_1232-456.jpg"
            alt="Emprendedora"
            style={{
              borderRadius: 24,
              maxWidth: "90%",
              boxShadow: "0 8px 32px rgba(39,40,44,0.10)",
              zIndex: 1,
            }}
          />
        </Box>
      </Container>

      {/* Productos Destacados */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#27282C" }}
        >
          Productos destacados
        </Typography>
        <Typography textAlign="center" sx={{ mb: 6, color: "#27282C" }}>
          Descubre nuestros productos más populares de emprendedores
          innovadores.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              title: "Producto 1",
              img: "https://picsum.photos/id/1011/400/300",
            },
            {
              title: "Producto 2",
              img: "https://picsum.photos/id/1020/400/300",
            },
            {
              title: "Producto 3",
              img: "https://picsum.photos/id/1035/400/300",
            },
            {
              title: "Producto 4",
              img: "https://picsum.photos/id/1042/400/300",
            },
            {
              title: "Producto 5",
              img: "https://picsum.photos/id/1050/400/300",
            },
            {
              title: "Producto 6",
              img: "https://picsum.photos/id/1062/400/300",
            },
          ].map((prod, i) => (
            <Grid key={i} display="flex" justifyContent="center">
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  ":hover": { transform: "translateY(-8px)", boxShadow: 6 },
                  width: 320,
                  maxWidth: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={prod.img}
                  alt={prod.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "#27282C", fontWeight: 700 }}
                  >
                    {prod.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                  <Typography
                    fontWeight="bold"
                    sx={{ mt: 2, color: "#1976d2", fontSize: 18 }}
                  >
                    $9.99
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      fontWeight: 600,
                      borderRadius: 2,
                      bgcolor: "#27282C",
                      color: "#fff",
                      ":hover": { bgcolor: "#111", color: "#fff" },
                    }}
                  >
                    Comprar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box textAlign="center" mt={6}>
          <Button
            variant="contained"
            size="large"
            sx={{
              fontWeight: 700,
              fontSize: 18,
              px: 4,
              py: 1.5,
              borderRadius: 3,
              bgcolor: "#27282C",
              color: "#fff",
              ":hover": { bgcolor: "#111", color: "#fff" },
            }}
          >
            Ver todos los productos
          </Button>
        </Box>
      </Container>

      {/* Newsletter */}
      <Box
        sx={{
          py: 8,
          bgcolor: "linear-gradient(90deg, #e0e7ff 0%, #f9f9f9 100%)",
        }}
      >
        <Container>
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#27282C" }}
          >
            Mantente Actualizado
          </Typography>
          <Typography textAlign="center" sx={{ mb: 4, color: "#27282C" }}>
            Suscríbete a nuestro boletín para recibir actualizaciones sobre
            nuevos productos, ofertas y más.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="Tu correo electrónico"
              variant="outlined"
              sx={{ bgcolor: "#fff", borderRadius: 2, minWidth: 260 }}
            />
            <Button
              variant="contained"
              sx={{
                fontWeight: 700,
                px: 4,
                borderRadius: 2,
                bgcolor: "#27282C",
                color: "#fff",
                ":hover": { bgcolor: "#111", color: "#fff" },
              }}
            >
              Suscribirse
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, bgcolor: "#2c2a2a", color: "#fff", mt: 8 }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            px: { xs: 2, sm: 4, md: 8 },
            maxWidth: "xl!important",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              pl: 0,
              ml: { xs: -2, sm: -4, md: -8 },
            }}
          >
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                height: 36,
                width: "auto",
                marginRight: 12,
                display: "block",
              }}
            />
            <Typography variant="body2">
              © 2025 BCN. All rights reserved.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 3 }}>
            <a
              href="#"
              style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}
            >
              Facebook
            </a>
            <a
              href="#"
              style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}
            >
              Instagram
            </a>
            <a
              href="#"
              style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}
            >
              LinkedIn
            </a>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
