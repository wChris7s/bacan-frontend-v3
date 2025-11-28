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
  email: z.string().email("Invalid email address"),
});

const confirmPasswordSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    confirmationCode: z.string().min(1, "Confirmation code is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
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
      setSuccess("A verification code has been sent to your email.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send reset code"
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

      setSuccess("Password reset successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/ingresar");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
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
        background: "linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)",
      }}
    >
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 5,
            boxShadow: "0px 24px 80px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(0,0,0,0.05)",
            p: { xs: 4, sm: 6 },
          }}
        >
          <Button
            component={Link}
            to="/ingresar"
            startIcon={<ArrowBack />}
            sx={{
              mb: 3,
              color: "text.secondary",
              "&:hover": {
                bgcolor: "transparent",
                color: "black",
              },
            }}
          >
            Back to Login
          </Button>

          {step === "email" ? (
            <>
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, mb: 1, letterSpacing: "-0.02em" }}
              >
                Forgot Password?
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ mb: 4, fontSize: "1rem" }}
              >
                Enter your email and we'll send you a verification code to reset
                your password.
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
                  label="Email Address"
                  type="email"
                  fullWidth
                  error={!!forgotForm.formState.errors.email}
                  helperText={forgotForm.formState.errors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: "text.secondary", fontSize: 20 }} />
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
                    bgcolor: "black",
                    borderRadius: 3,
                    boxShadow: "0px 8px 24px rgba(0,0,0,0.25)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#1a1a1a",
                      transform: "translateY(-2px)",
                      boxShadow: "0px 12px 32px rgba(0,0,0,0.3)",
                    },
                  }}
                >
                  {loading ? "Sending..." : "Send Reset Code"}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, mb: 1, letterSpacing: "-0.02em" }}
              >
                Reset Password
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ mb: 4, fontSize: "1rem" }}
              >
                Enter the verification code sent to <strong>{email}</strong> and
                your new password.
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
                  label="Verification Code"
                  fullWidth
                  margin="normal"
                  error={!!confirmForm.formState.errors.confirmationCode}
                  helperText={
                    confirmForm.formState.errors.confirmationCode?.message
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Numbers
                          sx={{ color: "text.secondary", fontSize: 20 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={textFieldStyles}
                />

                <TextField
                  {...confirmForm.register("newPassword")}
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  error={!!confirmForm.formState.errors.newPassword}
                  helperText={
                    confirmForm.formState.errors.newPassword?.message ||
                    "Min 8 chars, uppercase, lowercase, number, special char"
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "text.secondary", fontSize: 20 }} />
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
                  label="Confirm New Password"
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
                        <Lock sx={{ color: "text.secondary", fontSize: 20 }} />
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
                    bgcolor: "black",
                    borderRadius: 3,
                    boxShadow: "0px 8px 24px rgba(0,0,0,0.25)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#1a1a1a",
                      transform: "translateY(-2px)",
                      boxShadow: "0px 12px 32px rgba(0,0,0,0.3)",
                    },
                  }}
                >
                  {loading ? "Resetting..." : "Reset Password"}
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
                      color: "black",
                    },
                  }}
                >
                  Use a different email
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}
