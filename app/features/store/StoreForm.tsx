import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Fade,
} from "@mui/material";
import { Storefront } from "@mui/icons-material";

interface CreateStoreFormProps {
  documentId: string;
}

const CreateStoreForm: React.FC<CreateStoreFormProps> = ({ documentId }) => {
  const [formData, setFormData] = useState({
    name: "",
    open: "",
    close: "",
    story: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | ""; text: string }>({
    type: "",
    text: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(
        `http://localhost:8991/bcn/api/store/user/99999999`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 201) {
        setMessage({ type: "success", text: "Tienda creada exitosamente 🎉" });
        setFormData({ name: "", open: "", close: "", story: "" });
      } else {
        const data = await response.json();
        setMessage({
          type: "error",
          text:
            data.message || "Error al crear la tienda. Por favor, inténtalo nuevamente.",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Error al crear la tienda. Por favor, inténtalo nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        maxWidth: 520,
        mx: "auto",
        mt: 6,
        p: 4,
        borderRadius: 4,
        background: "linear-gradient(145deg, #ffffff, #f9fafc)",
      }}
    >
      <Box textAlign="center" mb={3}>
        <Box
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            background: "linear-gradient(90deg, #1976d2, #42a5f5)",
            borderRadius: "50%",
            width: 64,
            height: 64,
            color: "white",
            mb: 1,
          }}
        >
          <Storefront fontSize="large" />
        </Box>
        <Typography
          variant="h5"
          fontWeight={700}
          color="primary"
          sx={{ mb: 1 }}
        >
          Crear nueva tienda
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Completa los datos para registrar tu tienda en el sistema.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nombre de la tienda"
            name="name"
            placeholder="Ej: Tienda Bacán"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
          />

          <Box display="flex" gap={2}>
            <TextField
              label="Hora de apertura"
              name="open"
              type="time"
              value={formData.open}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Hora de cierre"
              name="close"
              type="time"
              value={formData.close}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          <TextField
            label="Historia o descripción"
            name="story"
            placeholder="Cuenta la historia de tu tienda..."
            value={formData.story}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />

          <Fade in={!!message.text}>
            <Box>
              {message.text && (
                <Alert
                  severity={message.type === "success" ? "success" : "error"}
                  sx={{ mt: 1 }}
                >
                  {message.text}
                </Alert>
              )}
            </Box>
          </Fade>

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: 700,
              borderRadius: 3,
              background: "linear-gradient(90deg, #1976d2, #42a5f5)",
              boxShadow: "0 4px 14px rgba(25, 118, 210, 0.4)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(90deg, #1565c0, #1e88e5)",
                transform: "translateY(-2px)",
              },
            }}
            startIcon={loading ? <CircularProgress size={22} color="inherit" /> : null}
          >
            {loading ? "Creando tienda..." : "Crear tienda"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CreateStoreForm;
