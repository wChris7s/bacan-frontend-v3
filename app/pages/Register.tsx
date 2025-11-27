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
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowForward,
  Email,
  LocationOn,
  Lock,
  Person,
  ShoppingBag,
  Store,
  Storefront,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useAuthStore } from "~/store/authStore";
import { apiClient } from "~/lib/api/client";
import { UserRole } from "~/lib/api/types";

const registerSchema = z
  .object({
    role: z.enum(["ENTREPRENEUR", "CUSTOMER"]),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
    address: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const loginWithResponse = useAuthStore((state) => state.loginWithResponse);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "CUSTOMER",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);
      setError(null);

      // Register the user
      await apiClient.register({
        role: data.role as UserRole,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        address: data.address,
      });

      // Auto-login after registration
      const loginResponse = await apiClient.login({
        email: data.email,
        password: data.password,
      });

      loginWithResponse(loginResponse);

      // Redirect based on role
      if (loginResponse.role === UserRole.ENTREPRENEUR) {
        navigate("/dashboard");
      } else {
        navigate("/products");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
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
        background: "linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)",
        py: 4,
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-30%",
          left: "-10%",
          width: "60%",
          height: "120%",
          background:
            "radial-gradient(ellipse, rgba(0,0,0,0.03) 0%, transparent 70%)",
          transform: "rotate(15deg)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-30%",
          right: "-10%",
          width: "50%",
          height: "100%",
          background:
            "radial-gradient(ellipse, rgba(0,0,0,0.02) 0%, transparent 70%)",
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
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
            {/* Left side - decorative */}
            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            >
              <Box
                sx={{
                  bgcolor: "black",
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
                <Box
                  sx={{
                    position: "absolute",
                    top: "20%",
                    right: "-20%",
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
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
                    Join Bacan Today
                  </Typography>
                  <Typography
                    sx={{
                      opacity: 0.7,
                      fontSize: "1.05rem",
                      lineHeight: 1.7,
                      mb: 4,
                    }}
                  >
                    Create your account and start your journey in the modern
                    marketplace.
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {[
                      "Zero commission fees",
                      "Instant account setup",
                      "24/7 customer support",
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
                            bgcolor: "rgba(255,255,255,0.2)",
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

            {/* Right side - form */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ p: { xs: 4, sm: 5 } }}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      mb: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Create Account
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: "1rem" }}>
                    Fill in your details to get started
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
                  {/* Role Selection */}
                  <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        mb: 1.5,
                        fontSize: "0.9rem",
                      }}
                    >
                      I want to:
                    </Typography>
                    <RadioGroup
                      row
                      value={selectedRole}
                      onChange={(e) =>
                        setValue(
                          "role",
                          e.target.value as "ENTREPRENEUR" | "CUSTOMER"
                        )
                      }
                    >
                      <Box
                        onClick={() => setValue("role", "CUSTOMER")}
                        sx={{
                          flex: 1,
                          mr: 1.5,
                          p: 2,
                          border: "2px solid",
                          borderColor:
                            selectedRole === "CUSTOMER" ? "black" : "divider",
                          borderRadius: 3,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          bgcolor:
                            selectedRole === "CUSTOMER"
                              ? "rgba(0,0,0,0.02)"
                              : "transparent",
                          "&:hover": {
                            borderColor:
                              selectedRole === "CUSTOMER"
                                ? "black"
                                : "rgba(0,0,0,0.3)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <ShoppingBag
                            sx={{
                              fontSize: 28,
                              color:
                                selectedRole === "CUSTOMER"
                                  ? "black"
                                  : "text.secondary",
                            }}
                          />
                          <Box>
                            <Typography
                              sx={{ fontWeight: 600, fontSize: "0.95rem" }}
                            >
                              Buy Products
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.75rem",
                                color: "text.secondary",
                              }}
                            >
                              Shop from entrepreneurs
                            </Typography>
                          </Box>
                        </Box>
                        <FormControlLabel
                          value="CUSTOMER"
                          control={
                            <Radio
                              {...register("role")}
                              sx={{ display: "none" }}
                            />
                          }
                          label=""
                          sx={{ display: "none" }}
                        />
                      </Box>

                      <Box
                        onClick={() => setValue("role", "ENTREPRENEUR")}
                        sx={{
                          flex: 1,
                          p: 2,
                          border: "2px solid",
                          borderColor:
                            selectedRole === "ENTREPRENEUR"
                              ? "black"
                              : "divider",
                          borderRadius: 3,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          bgcolor:
                            selectedRole === "ENTREPRENEUR"
                              ? "rgba(0,0,0,0.02)"
                              : "transparent",
                          "&:hover": {
                            borderColor:
                              selectedRole === "ENTREPRENEUR"
                                ? "black"
                                : "rgba(0,0,0,0.3)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Store
                            sx={{
                              fontSize: 28,
                              color:
                                selectedRole === "ENTREPRENEUR"
                                  ? "black"
                                  : "text.secondary",
                            }}
                          />
                          <Box>
                            <Typography
                              sx={{ fontWeight: 600, fontSize: "0.95rem" }}
                            >
                              Sell Products
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.75rem",
                                color: "text.secondary",
                              }}
                            >
                              Start your venture
                            </Typography>
                          </Box>
                        </Box>
                        <FormControlLabel
                          value="ENTREPRENEUR"
                          control={
                            <Radio
                              {...register("role")}
                              sx={{ display: "none" }}
                            />
                          }
                          label=""
                          sx={{ display: "none" }}
                        />
                      </Box>
                    </RadioGroup>
                  </FormControl>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        {...register("firstName")}
                        label="First Name"
                        fullWidth
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person
                                sx={{ color: "text.secondary", fontSize: 20 }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        sx={textFieldStyles}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        {...register("lastName")}
                        label="Last Name"
                        fullWidth
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person
                                sx={{ color: "text.secondary", fontSize: 20 }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        sx={textFieldStyles}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    {...register("email")}
                    label="Email Address"
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

                  <TextField
                    {...register("password")}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={
                      errors.password?.message ||
                      "Min 8 chars, uppercase, lowercase, number, special char"
                    }
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
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={textFieldStyles}
                  />

                  <TextField
                    {...register("confirmPassword")}
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
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

                  <TextField
                    {...register("address")}
                    label="Address (Optional)"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={2}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ alignSelf: "flex-start", mt: 1.5 }}
                        >
                          <LocationOn
                            sx={{ color: "text.secondary", fontSize: 20 }}
                          />
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
                      mt: 3,
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
                      "&:active": {
                        transform: "translateY(0)",
                      },
                    }}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>

                  <Box sx={{ mt: 3, textAlign: "center" }}>
                    <Typography
                      color="text.secondary"
                      sx={{ fontSize: "0.95rem" }}
                    >
                      Already have an account?{" "}
                      <Box
                        component={Link}
                        to="/login"
                        sx={{
                          color: "black",
                          fontWeight: 600,
                          textDecoration: "none",
                          transition: "opacity 0.2s ease",
                          "&:hover": {
                            opacity: 0.7,
                          },
                        }}
                      >
                        Sign In
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
