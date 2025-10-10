import React from "react";
import {
  Box,
  Card,
  Button,
  Typography,
  Divider,
  Paper,
} from "@mui/material";

export default function UserScreen() {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f6fa",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Italo Denegri Kancha
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            mb: 2,
            lineHeight: 1.8,
            color: "#333",
          }}
        >
          Hola, soy Italo. Me apasiona el deporte y siempre busco zapatillas
          deportivas minimalistas para mis entrenamientos, ojalá en distintos
          colores. También disfruto coleccionar tazas de cerámica con diseños
          originales, ideales para regalar o usar en mi día a día. Me encanta
          descubrir productos nuevos que se ajusten a mi estilo y explorar
          diferentes opciones en cada compra.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 5,
            mt: 2,
          }}
        >
          <Box>
            <Typography fontWeight="bold" sx={{ fontSize: "14px" }}>
              Correo:
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              ItaloAranibarKancha@gmail.com
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight="bold" sx={{ fontSize: "14px" }}>
              Teléfono:
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>+51 942 382 301</Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2563eb",
              textTransform: "none",
              px: 4,
              borderRadius: 2,
              "&:hover": { backgroundColor: "#1d4ed8" },
            }}
          >
            Editar
          </Button>
        </Box>
      </Paper>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            flex: 0.7,
            minWidth: 260,
            p: 2,
            borderRadius: 3,
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Últimas Compras
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#2563eb",
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                fontSize: "13px",
              }}
            >
              Ver todas
            </Button>
          </Box>

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ fontSize: "28px" }}>🎧</Typography>
                <Box>
                  <Typography fontWeight="bold">Auriculares Inalámbricos</Typography>
                  <Typography sx={{ fontSize: "13px" }}>Cantidad: 1 • S/. 150.00</Typography>
                  <Typography sx={{ fontSize: "12px", color: "gray" }}>
                    Comprado hace 2 días
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#e0e7ff",
                  color: "#1e3a8a",
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2,
                  fontSize: "12px",
                }}
              >
                Detalles
              </Button>
            </Box>
            <Divider />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ fontSize: "28px" }}>👕</Typography>
                <Box>
                  <Typography fontWeight="bold">Polo Algodón Premium</Typography>
                  <Typography sx={{ fontSize: "13px" }}>Cantidad: 2 • S/. 80.00</Typography>
                  <Typography sx={{ fontSize: "12px", color: "gray" }}>
                    Comprado hace 5 días
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#e0e7ff",
                  color: "#1e3a8a",
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2,
                  fontSize: "12px",
                }}
              >
                Detalles
              </Button>
            </Box>
            <Divider />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ fontSize: "28px" }}>📚</Typography>
                <Box>
                  <Typography fontWeight="bold">Libro: "Aprendiendo Angular"</Typography>
                  <Typography sx={{ fontSize: "13px" }}>Cantidad: 1 • S/. 55.00</Typography>
                  <Typography sx={{ fontSize: "12px", color: "gray" }}>
                    Comprado hace 1 semana
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#e0e7ff",
                  color: "#1e3a8a",
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2,
                  fontSize: "12px",
                }}
              >
                Detalles
              </Button>
            </Box>
          </Box>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            flex: 0.8,
            minWidth: 260,
            p: 2,
            borderRadius: 3,
            backgroundColor: "#fff",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="h6" fontWeight="bold">Carrito de Compras</Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#10b981", textTransform: "none", borderRadius: 2, px: 2 }}
            >
              Pagar
            </Button>
          </Box>

          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ fontSize: "28px" }}>🧸</Typography>
                <Box>
                  <Typography fontWeight="bold">Juguete Artesanal</Typography>
                  <Typography sx={{ fontSize: "13px" }}>Cantidad: 1</Typography>
                  <Typography sx={{ fontSize: "12px", color: "gray" }}>S/. 23.99</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="contained" sx={{ backgroundColor: "#fee2e2", color: "#b91c1c", textTransform: "none", borderRadius: 2, px: 1, fontSize: "12px" }}>
                  Eliminar
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "#e0e7ff", color: "#1e3a8a", textTransform: "none", borderRadius: 2, px: 1, fontSize: "12px" }}>
                  Editar
                </Button>
              </Box>
            </Box>
            <Divider />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ fontSize: "28px" }}>👟</Typography>
                <Box>
                  <Typography fontWeight="bold">Zapatillas Minimal</Typography>
                  <Typography sx={{ fontSize: "13px" }}>Cantidad: 1</Typography>
                  <Typography sx={{ fontSize: "12px", color: "gray" }}>S/. 199.00</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="contained" sx={{ backgroundColor: "#fee2e2", color: "#b91c1c", textTransform: "none", borderRadius: 2, px: 1, fontSize: "12px" }}>
                  Eliminar
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "#e0e7ff", color: "#1e3a8a", textTransform: "none", borderRadius: 2, px: 1, fontSize: "12px" }}>
                  Editar
                </Button>
              </Box>
            </Box>
            <Divider />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ fontSize: "28px" }}>☕</Typography>
                <Box>
                  <Typography fontWeight="bold">Taza Cerámica Diseño</Typography>
                  <Typography sx={{ fontSize: "13px" }}>Cantidad: 2</Typography>
                  <Typography sx={{ fontSize: "12px", color: "gray" }}>S/. 70.00</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="contained" sx={{ backgroundColor: "#fee2e2", color: "#b91c1c", textTransform: "none", borderRadius: 2, px: 1, fontSize: "12px" }}>
                  Eliminar
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "#e0e7ff", color: "#1e3a8a", textTransform: "none", borderRadius: 2, px: 1, fontSize: "12px" }}>
                  Editar
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            flex: 0.6,
            minWidth: 320,
            p: 2,
            borderRadius: 3,
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Finanzas
          </Typography>

          <Card
            sx={{
              backgroundColor: "#d1fadf",
              p: 2,
              mt: 2,
              borderRadius: 2,
            }}
          >
            <Typography fontWeight="bold" sx={{ color: "#14532d" }}>
              Cartera: S/. 1,245.80
            </Typography>
          </Card>

          <Typography sx={{ mt: 2, fontSize: "14px" }}>💳 Visa **** 4532</Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#2563eb",
              textTransform: "none",
              borderRadius: 2,
              mt: 2,
              "&:hover": { backgroundColor: "#1d4ed8" },
            }}
          >
            + Añadir Método de Pago
          </Button>
        </Paper>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          mt: 0,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            flex: 2,
            p: 2,
            borderRadius: 3,
            backgroundColor: "#fff",
            minWidth: 320,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              sx={{
                backgroundColor: "#2563eb",
                color: "#fff",
                minWidth: "35px",
                height: "35px",
                borderRadius: "50%",
                fontSize: "18px",
                "&:hover": { backgroundColor: "#1d4ed8" },
              }}
            >
              &gt;
            </Button>
            <Typography variant="h6" fontWeight="bold">
              Productos Favoritos
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
              justifyContent: "flex-start",
              mt: 2,
            }}
          >
            <Card
              sx={{
                backgroundColor: "#e8f0ff",
                width: 200,
                borderRadius: 3,
                textAlign: "center",
                p: 2,
              }}
            >
              <Typography sx={{ fontSize: "40px" }}>🎨</Typography>
              <Typography fontWeight="bold">Artesanía Premium</Typography>
              <Typography sx={{ fontSize: "14px" }}>Stock: 12</Typography>
              <Typography sx={{ color: "green", fontSize: "14px" }}>
                Disponible
              </Typography>
              <Typography fontWeight="bold" sx={{ mt: 1 }}>
                S/. 121.50
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 1,
                  backgroundColor: "#2563eb",
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                Comprar
              </Button>
            </Card>
            <Card
              sx={{
                backgroundColor: "#f3e8ff",
                width: 200,
                borderRadius: 3,
                textAlign: "center",
                p: 2,
              }}
            >
              <Typography sx={{ fontSize: "40px" }}>🧸</Typography>
              <Typography fontWeight="bold">Juguete Artesanal</Typography>
              <Typography sx={{ fontSize: "14px" }}>Stock: 9</Typography>
              <Typography sx={{ color: "green", fontSize: "14px" }}>
                Disponible
              </Typography>
              <Typography fontWeight="bold" sx={{ mt: 1 }}>
                S/. 23.99
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 1,
                  backgroundColor: "#2563eb",
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                Comprar
              </Button>
            </Card>
            <Card
              sx={{
                backgroundColor: "#fff4e6",
                width: 200,
                borderRadius: 3,
                textAlign: "center",
                p: 2,
              }}
            >
              <Typography sx={{ fontSize: "40px" }}>🏺</Typography>
              <Typography fontWeight="bold">Cerámica Tradicional</Typography>
              <Typography sx={{ fontSize: "14px" }}>Stock: 1</Typography>
              <Typography sx={{ color: "red", fontSize: "14px" }}>
                Último
              </Typography>
              <Typography fontWeight="bold" sx={{ mt: 1 }}>
                S/. 11.50
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 1,
                  backgroundColor: "#2563eb",
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                Comprar
              </Button>
            </Card>
            <Card
              sx={{
                backgroundColor: "#e6fff4",
                width: 200,
                borderRadius: 3,
                textAlign: "center",
                p: 2,
              }}
            >
              <Typography sx={{ fontSize: "40px" }}>👟</Typography>
              <Typography fontWeight="bold">Zapatillas Minimal</Typography>
              <Typography sx={{ fontSize: "14px" }}>Stock: 6</Typography>
              <Typography sx={{ color: "green", fontSize: "14px" }}>
                Disponible
              </Typography>
              <Typography fontWeight="bold" sx={{ mt: 1 }}>
                S/. 199.00
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 1, backgroundColor: "#2563eb", textTransform: "none", borderRadius: 2 }}
              >
                Comprar
              </Button>
            </Card>
            <Card
              sx={{
                backgroundColor: "#fff0f6",
                width: 200,
                borderRadius: 3,
                textAlign: "center",
                p: 2,
              }}
            >
              <Typography sx={{ fontSize: "40px" }}>☕</Typography>
              <Typography fontWeight="bold">Taza Cerámica Diseño</Typography>
              <Typography sx={{ fontSize: "14px" }}>Stock: 5</Typography>
              <Typography sx={{ color: "green", fontSize: "14px" }}>
                Disponible
              </Typography>
              <Typography fontWeight="bold" sx={{ mt: 1 }}>
                S/. 35.00
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 1, backgroundColor: "#2563eb", textTransform: "none", borderRadius: 2 }}
              >
                Comprar
              </Button>
            </Card>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            p: 2,
            borderRadius: 3,
            backgroundColor: "#fff",
            minWidth: 260,
            maxWidth: 340,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            Editar perfil
          </Typography>
          <Divider sx={{ width: "100%", mb: 1 }} />
          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography fontWeight="bold" sx={{ fontSize: "15px", mb: 0.5 }}>
              Información personal
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              Nombre: Italo Denegri Kancha
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              Correo: ItaloAranibarKancha@gmail.com
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              Teléfono: +51 942 382 301
            </Typography>
          </Box>
          <Divider sx={{ width: "100%", mb: 1 }} />
          <Box sx={{ width: "100%" }}>
            <Typography fontWeight="bold" sx={{ fontSize: "15px", mb: 0.5 }}>
              Direcciones registradas
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              Calle Mercaderes #45, Pueblo Paleta
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              Av. Principal 123, Lima
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2563eb",
              textTransform: "none",
              borderRadius: 2,
              mt: 2,
              alignSelf: "center",
              px: 4,
              fontSize: "15px",
              "&:hover": { backgroundColor: "#1d4ed8" },
            }}
          >
            Editar información
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
