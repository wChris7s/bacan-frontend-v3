import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  Email,
  Lock,
  Numbers,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { apiClient } from "~/lib/api/client";

const forgotPasswordSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
});

const confirmPasswordSchema = z
  .object({
    email: z.string().email("Correo electrónico inválido"),
    confirmationCode: z
      .string()
      .min(1, "El código de confirmación es requerido"),
    newPassword: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "La contraseña debe contener al menos una mayúscula")
      .regex(/[a-z]/, "La contraseña debe contener al menos una minúscula")
      .regex(/[0-9]/, "La contraseña debe contener al menos un número")
      .regex(
        /[^A-Za-z0-9]/,
        "La contraseña debe contener al menos un carácter especial"
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmNewPassword"],
  });

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
type ConfirmPasswordForm = z.infer<typeof confirmPasswordSchema>;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "confirm">("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const forgotForm = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const confirmForm = useForm<ConfirmPasswordForm>({
    resolver: zodResolver(confirmPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPassword = async (data: ForgotPasswordForm) => {
    try {
      setLoading(true);
      setError(null);

      await apiClient.forgotPassword({ email: data.email });

      setEmail(data.email);
      confirmForm.setValue("email", data.email);
      setStep("confirm");
      setSuccess(
        "Se ha enviado un código de verificación a tu correo electrónico."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al enviar el código de recuperación"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPassword = async (data: ConfirmPasswordForm) => {
    try {
      setLoading(true);
      setError(null);

      await apiClient.confirmForgotPassword({
        email: data.email,
        confirmationCode: data.confirmationCode,
        newPassword: data.newPassword,
      });

      setSuccess(
        "¡Contraseña restablecida exitosamente! Redirigiendo al inicio de sesión..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al restablecer la contraseña"
      );
    } finally {
      setLoading(false);
    }
  };

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0px 4px 12px rgba(30,58,95,0.1)",
      },
      "&.Mui-focused": {
        boxShadow: "0px 4px 16px rgba(30,58,95,0.15)",
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 70px)",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 5,
            boxShadow: "0px 24px 80px rgba(30, 58, 95, 0.12)",
            border: "1px solid rgba(30,58,95,0.08)",
            p: { xs: 4, sm: 6 },
          }}
        >
          <Button
            component={Link}
            to="/login"
            startIcon={<ArrowBack />}
            sx={{
              mb: 3,
              color: "text.secondary",
              "&:hover": {
                bgcolor: "transparent",
                color: "primary.main",
              },
            }}
          >
            Volver al Inicio de Sesión
          </Button>

          {step === "email" ? (
            <>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  letterSpacing: "-0.02em",
                  color: "primary.main",
                }}
              >
                ¿Olvidaste tu Contraseña?
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ mb: 4, fontSize: "1rem" }}
              >
                Ingresa tu correo electrónico y te enviaremos un código de
                verificación para restablecer tu contraseña.
              </Typography>

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
                onSubmit={forgotForm.handleSubmit(handleForgotPassword)}
                noValidate
              >
                <TextField
                  {...forgotForm.register("email")}
                  label="Correo Electrónico"
                  type="email"
                  fullWidth
                  error={!!forgotForm.formState.errors.email}
                  helperText={forgotForm.formState.errors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: "primary.main", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={textFieldStyles}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  endIcon={!loading && <ArrowForward />}
                  sx={{
                    mt: 4,
                    py: 1.8,
                    fontSize: "1.05rem",
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
                  {loading ? "Enviando..." : "Enviar Código de Recuperación"}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  letterSpacing: "-0.02em",
                  color: "primary.main",
                }}
              >
                Restablecer Contraseña
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ mb: 4, fontSize: "1rem" }}
              >
                Ingresa el código de verificación enviado a{" "}
                <strong>{email}</strong> y tu nueva contraseña.
              </Typography>

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

              {success && (
                <Alert
                  severity="success"
                  sx={{
                    mb: 3,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "success.light",
                  }}
                >
                  {success}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={confirmForm.handleSubmit(handleConfirmPassword)}
                noValidate
              >
                <TextField
                  {...confirmForm.register("confirmationCode")}
                  label="Código de Verificación"
                  fullWidth
                  margin="normal"
                  error={!!confirmForm.formState.errors.confirmationCode}
                  helperText={
                    confirmForm.formState.errors.confirmationCode?.message
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Numbers sx={{ color: "primary.main", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={textFieldStyles}
                />

                <TextField
                  {...confirmForm.register("newPassword")}
                  label="Nueva Contraseña"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  error={!!confirmForm.formState.errors.newPassword}
                  helperText={
                    confirmForm.formState.errors.newPassword?.message ||
                    "Mín. 8 caracteres, mayúscula, minúscula, número, carácter especial"
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "primary.main", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={textFieldStyles}
                />

                <TextField
                  {...confirmForm.register("confirmNewPassword")}
                  label="Confirmar Nueva Contraseña"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  error={!!confirmForm.formState.errors.confirmNewPassword}
                  helperText={
                    confirmForm.formState.errors.confirmNewPassword?.message
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "primary.main", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
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

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  endIcon={!loading && <ArrowForward />}
                  sx={{
                    mt: 4,
                    py: 1.8,
                    fontSize: "1.05rem",
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
                  {loading ? "Restableciendo..." : "Restablecer Contraseña"}
                </Button>

                <Button
                  onClick={() => {
                    setStep("email");
                    setError(null);
                    setSuccess(null);
                  }}
                  sx={{
                    mt: 2,
                    color: "text.secondary",
                    width: "100%",
                    "&:hover": {
                      bgcolor: "transparent",
                      color: "primary.main",
                    },
                  }}
                >
                  Usar un correo diferente
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}
