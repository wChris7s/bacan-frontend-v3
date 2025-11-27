import { useState } from "react";
import { useNavigate } from "react-router";
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
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useAuthStore } from "~/store/authStore";
import { apiClient } from "~/lib/api/client";
import { UserRole } from "~/lib/api/types";

const registerSchema = z.object({
  role: z.enum(["ENTREPRENEUR", "CUSTOMER"]),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().optional(),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "CUSTOMER",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);
      setError(null);

      const user = await apiClient.createUser({
        role: data.role as UserRole,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: data.address,
      });

      setUser(user);
      navigate(
        user.role === UserRole.ENTREPRENEUR ? "/dashboard" : "/products"
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 70px)",
        display: "flex",
        alignItems: "center",
        bgcolor: "#fafafa",
      }}
    >
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Box
          sx={{
            bgcolor: "white",
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              Create Account
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: "1.1rem" }}>
              Join our marketplace today
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "error.light",
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
              <FormLabel sx={{ fontWeight: 600, color: "black", mb: 1 }}>
                I want to:
              </FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  value="CUSTOMER"
                  control={<Radio {...register("role")} />}
                  label="Buy products"
                  sx={{
                    flex: 1,
                    m: 0,
                    mr: 1,
                    border: "2px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                  }}
                />
                <FormControlLabel
                  value="ENTREPRENEUR"
                  control={<Radio {...register("role")} />}
                  label="Sell my products"
                  sx={{
                    flex: 1,
                    m: 0,
                    border: "2px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                  }}
                />
              </RadioGroup>
            </FormControl>

            <TextField
              {...register("firstName")}
              label="First Name"
              fullWidth
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              {...register("lastName")}
              label="Last Name"
              fullWidth
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              {...register("email")}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              {...register("address")}
              label="Address (Optional)"
              fullWidth
              margin="normal"
              multiline
              rows={2}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                bgcolor: "black",
                "&:hover": {
                  bgcolor: "#333",
                },
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <Button
              variant="text"
              fullWidth
              onClick={() => navigate("/login")}
              sx={{
                mt: 2,
                color: "text.secondary",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.05)",
                },
              }}
            >
              Already have an account? Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
