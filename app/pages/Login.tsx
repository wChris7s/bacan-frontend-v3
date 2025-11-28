import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowForward,
  Email,
  Lock,
  Storefront,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useAuthStore } from "~/store/authStore";
import { apiClient } from "~/lib/api/client";
import { UserRole } from "~/lib/api/types";

const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const loginWithResponse = useAuthStore((state) => state.loginWithResponse);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.login({
        email: data.email,
        password: data.password,
      });

      loginWithResponse(response);

      // Redirigir según el rol
      if (response.role === UserRole.ENTREPRENEUR) {
        navigate("/dashboard");
      } else {
        navigate("/products");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
      },
      "&.Mui-focused": {
        boxShadow: "0px 4px 16px rgba(0,0,0,0.12)",
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 70px)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      <Container maxWidth="md" sx={{ py: 6, position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 5,
            boxShadow: "0px 24px 80px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          <Grid container>
            {/* Lado izquierdo - decorativo */}
            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(160deg, #1e3a5f 0%, #2d5a87 100%)",
                  color: "white",
                  p: 5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />

                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 3,
                      bgcolor: "rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 4,
                    }}
                  >
                    <Storefront sx={{ fontSize: 32 }} />
                  </Box>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    ¡Bienvenido de Nuevo!
                  </Typography>
                  <Typography
                    sx={{
                      opacity: 0.8,
                      fontSize: "1.05rem",
                      lineHeight: 1.7,
                      mb: 4,
                    }}
                  >
                    Inicia sesión para administrar tu emprendimiento o explorar
                    productos increíbles.
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {[
                      "Autenticación segura",
                      "Acceso rápido a tu cuenta",
                      "Gestiona tu negocio fácilmente",
                    ].map((text, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            bgcolor: "rgba(255,152,0,0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.7rem",
                          }}
                        >
                          ✓
                        </Box>
                        <Typography sx={{ fontSize: "0.95rem", opacity: 0.9 }}>
                          {text}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Lado derecho - formulario */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ p: { xs: 4, sm: 6 } }}>
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      mb: 1,
                      letterSpacing: "-0.02em",
                      color: "primary.main",
                    }}
                  >
                    Iniciar Sesión
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: "1rem" }}>
                    Ingresa tus credenciales para acceder a tu cuenta
                  </Typography>
                </Box>

                {error && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "error.light",
                    }}
                  >
                    {error}
                  </Alert>
                )}

                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Correo Electrónico"
                        type="email"
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email
                                sx={{ color: "text.secondary", fontSize: 20 }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        sx={textFieldStyles}
                      />
                    )}
                  />

                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Contraseña"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock
                                sx={{ color: "text.secondary", fontSize: 20 }}
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={textFieldStyles}
                      />
                    )}
                  />

                  <Box sx={{ mt: 1, mb: 3, textAlign: "right" }}>
                    <Typography
                      component={Link}
                      to="/forgot-password"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.9rem",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: "primary.main",
                        },
                      }}
                    >
                      ¿Olvidaste tu contraseña?
                    </Typography>
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading}
                    endIcon={!loading && <ArrowForward />}
                    sx={{
                      mt: 2,
                      py: 1.8,
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      bgcolor: "primary.main",
                      borderRadius: 3,
                      boxShadow: "0px 8px 24px rgba(30,58,95,0.35)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "primary.dark",
                        transform: "translateY(-2px)",
                        boxShadow: "0px 12px 32px rgba(30,58,95,0.45)",
                      },
                    }}
                  >
                    {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>

                  <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Typography
                      color="text.secondary"
                      sx={{ fontSize: "0.95rem" }}
                    >
                      ¿No tienes una cuenta?{" "}
                      <Box
                        component={Link}
                        to="/register"
                        sx={{
                          color: "primary.main",
                          fontWeight: 600,
                          textDecoration: "none",
                          transition: "opacity 0.2s ease",
                          "&:hover": {
                            opacity: 0.7,
                          },
                        }}
                      >
                        Crear Cuenta
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
