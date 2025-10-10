import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  useTheme,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useNavigate, useParams } from "react-router";

export default function AddProduct() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { storeId } = useParams();

  // Solo los campos requeridos
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<{ price?: string; name?: string; category?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "El nombre es requerido";
    const normalized = price.replace(/,/g, ".");
    if (!price || isNaN(parseFloat(normalized))) newErrors.price = "Precio inválido";
    if (!category.trim()) newErrors.category = "La categoría es requerida";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function createProduct(storeId: string | undefined, product: { name: string; price: number; stock: number; description: string, category: { name: string } }) {
    if (!storeId) throw new Error("No se encontró el storeId");
    const response = await fetch(`/bcn/api/product/store/${storeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error("Error al crear producto");
    return await response.json();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price.replace(/,/g, ".")),
      stock: Number(stock) || 0,
      category: { name: category.trim() },
    };
    try {
      await createProduct(storeId, payload);
      navigate("/entrepreneur");
    } catch (err) {
      alert("Error al crear producto");
    }
  };

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      width: "100vw",
      backgroundColor: theme.palette.grey[100],
    }}>
      <Paper elevation={6} sx={{
        width: 400,
        maxWidth: "90vw",
        p: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
        mx: "auto",
      }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
          Agregar Producto
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
          <TextField
            label="Nombre del producto"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            required
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Precio"
            value={price}
            onChange={(e) => {
              let v = e.target.value.replace(/[^0-9.,]/g, "");
              const parts = v.split(/[.,]/);
              if (parts.length > 1) {
                const whole = parts.slice(0, -1).join("");
                const decimals = parts[parts.length - 1];
                v = `${whole},${decimals}`;
              }
              setPrice(v);
              if (errors.price) setErrors((prev) => ({ ...prev, price: undefined }));
            }}
            onBlur={() => {
              if (!price) return;
              const normalized = price.replace(/,/g, ".");
              const n = parseFloat(normalized);
              if (isNaN(n)) setErrors((prev) => ({ ...prev, price: "Precio inválido" }));
              else setPrice(n.toFixed(2).replace(".", ","));
            }}
            required
            fullWidth
            error={!!errors.price}
            helperText={errors.price}
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment>, inputMode: "decimal" }}
          />
          <TextField
            label="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
            required
            type="number"
            fullWidth
            inputProps={{ min: 0 }}
          />
          <TextField
            label="Categoría"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              if (errors.category) setErrors((prev) => ({ ...prev, category: undefined }));
            }}
            required
            fullWidth
            error={!!errors.category}
            helperText={errors.category}
          />
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 1 }}>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit">
              Publicar Producto
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
