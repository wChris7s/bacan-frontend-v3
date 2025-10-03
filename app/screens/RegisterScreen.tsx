import * as React from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { RowStack } from "~/features/common/RowStack";
import { RegisterCard } from "~/features/register/RegisterCard";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Colors } from "~/enums/Colors";
import { useAuth } from "react-oidc-context";

const registerSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.enum(["user", "entrepreneur"], "Debes seleccionar un tipo"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const auth = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
  });

  // Obtenemos el role seleccionado
  const selectedRole = watch("role");

  const onSubmit = (data: RegisterFormData) => {
    console.log("Datos enviados:", data);
  };

  const handleCardSelect = (role: "user" | "entrepreneur") => {
    setValue("role", role);
  };

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
      }}
    >
      {/* Cards de selección */}
      <RowStack sx={{ gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
        <RegisterCard
          type="user"
          checked={selectedRole === "user"}
          onChange={() => handleCardSelect("user")}
        />
        <RegisterCard
          type="entrepreneur"
          checked={selectedRole === "entrepreneur"}
          onChange={() => handleCardSelect("entrepreneur")}
        />
      </RowStack>

      {/* Formulario */}
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%", maxWidth: 706, gap: 2 }}
      >
        <Typography variant="h6" textAlign="center">
          Regístrate
        </Typography>

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre completo"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Correo electrónico"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
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
              type="password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        {errors.role && (
          <Typography variant="body2" color="error">
            {errors.role.message}
          </Typography>
        )}

        <RowStack sx={{ gap: "12px" }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: Colors.BLACK,
              color: Colors.WHITE,
              fontWeight: 600,
              paddingY: "6px",
              paddingX: "8px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#1f1f23",
                transform: "translateY(-2px)",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
              },
              "&:active": {
                transform: "translateY(0)",
                boxShadow: "none",
              },
            }}
          >
            Registrarse
          </Button>

          <Button
            type="button"
            variant="contained"
            onClick={() => auth.signinRedirect()}
            fullWidth
            sx={{
              backgroundColor: Colors.BLACK,
              color: Colors.WHITE,
              fontWeight: 600,
              paddingY: "6px",
              paddingX: "8px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#1f1f23",
                transform: "translateY(-2px)",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
              },
              "&:active": {
                transform: "translateY(0)",
                boxShadow: "none",
              },
            }}
          >
            Iniciar sesión
          </Button>
        </RowStack>
      </Stack>
    </Stack>
  );
}
