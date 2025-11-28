import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  AttachMoney,
  Category,
  Close,
  CloudUpload,
  Delete,
  Description,
  Inventory,
  Numbers,
  Store,
} from "@mui/icons-material";
import { apiClient } from "~/lib/api/client";
import { Venture } from "~/lib/api/types";

const productSchema = z.object({
  ventureExternalId: z.string().min(1, "Selecciona un emprendimiento"),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().optional(),
  price: z.number().min(0.01, "El precio debe ser mayor a 0"),
  stock: z.number().int().min(0, "El stock debe ser 0 o mayor"),
  categoryExternalIds: z
    .array(z.string())
    .min(1, "Selecciona al menos una categoría"),
});

type ProductForm = z.infer<typeof productSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  ventures: Venture[];
  onSuccess: () => void;
}

export function CreateProductDialog({
  open,
  onClose,
  ventures,
  onSuccess,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiClient.getCategories(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      categoryExternalIds: [],
      stock: 0,
    },
  });

  const selectedCategories = watch("categoryExternalIds");

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError(
        "Tipo de archivo inválido. Solo se permiten JPEG, PNG, GIF y WebP."
      );
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("El archivo excede el límite de 10MB.");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      setUploadingImage(true);
      setError(null);

      const response = await apiClient.uploadProductImage(file);
      setImageUrl(response.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir la imagen");
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: ProductForm) => {
    try {
      setLoading(true);
      setError(null);

      await apiClient.createProduct({
        ventureExternalId: data.ventureExternalId,
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        imageUrl: imageUrl || undefined,
        categoryExternalIds: data.categoryExternalIds,
      });

      handleClose();
      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al crear el producto"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setError(null);
    setImageUrl(null);
    setImagePreview(null);
    onClose();
  };

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2.5,
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0px 2px 8px rgba(30,58,95,0.08)",
      },
      "&.Mui-focused": {
        boxShadow: "0px 4px 12px rgba(30,58,95,0.12)",
      },
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: "0px 24px 48px rgba(30,58,95,0.2)",
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <Inventory />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                Crear Nuevo Producto
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Agrega un producto a tu emprendimiento
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
              }}
            >
              {error}
            </Alert>
          )}

          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.ventureExternalId}
          >
            <InputLabel>Emprendimiento</InputLabel>
            <Select
              {...register("ventureExternalId")}
              label="Emprendimiento"
              sx={{
                borderRadius: 2.5,
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Store sx={{ color: "primary.main", fontSize: 20 }} />
                </InputAdornment>
              }
            >
              {ventures.map((venture) => (
                <MenuItem key={venture.externalId} value={venture.externalId}>
                  {venture.name}
                </MenuItem>
              ))}
            </Select>
            {errors.ventureExternalId && (
              <Typography
                sx={{
                  color: "error.main",
                  fontSize: "0.75rem",
                  mt: 0.5,
                  ml: 1.5,
                }}
              >
                {errors.ventureExternalId.message}
              </Typography>
            )}
          </FormControl>

          <TextField
            {...register("name")}
            label="Nombre del Producto"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Inventory sx={{ color: "primary.main", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />

          <TextField
            {...register("description")}
            label="Descripción"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ alignSelf: "flex-start", mt: 1.5 }}
                >
                  <Description sx={{ color: "primary.main", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />

          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("price", { valueAsNumber: true })}
                label="Precio"
                type="number"
                fullWidth
                error={!!errors.price}
                helperText={errors.price?.message}
                inputProps={{ step: "0.01", min: "0" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney
                        sx={{ color: "secondary.main", fontSize: 20 }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register("stock", { valueAsNumber: true })}
                label="Stock"
                type="number"
                fullWidth
                error={!!errors.stock}
                helperText={errors.stock?.message}
                inputProps={{ min: "0" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Numbers sx={{ color: "primary.main", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
            </Grid>
          </Grid>

          {/* Image Upload Section */}
          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography
              sx={{
                fontWeight: 600,
                mb: 1,
                fontSize: "0.9rem",
                color: "primary.main",
              }}
            >
              Imagen del Producto (Opcional)
            </Typography>

            {imagePreview ? (
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 3,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Preview"
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                  }}
                />
                {uploadingImage && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      bgcolor: "rgba(30,58,95,0.7)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <CircularProgress sx={{ color: "white" }} size={32} />
                    <Typography sx={{ color: "white", fontSize: "0.9rem" }}>
                      Subiendo...
                    </Typography>
                  </Box>
                )}
                {!uploadingImage && (
                  <IconButton
                    onClick={handleRemoveImage}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "white",
                      "&:hover": {
                        bgcolor: "error.main",
                      },
                    }}
                  >
                    <Delete />
                  </IconButton>
                )}
                {uploadingImage && (
                  <LinearProgress
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                    }}
                  />
                )}
              </Box>
            ) : (
              <Box
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  border: "2px dashed",
                  borderColor: "primary.light",
                  borderRadius: 3,
                  p: 4,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "rgba(30,58,95,0.03)",
                  },
                }}
              >
                <CloudUpload
                  sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
                />
                <Typography sx={{ fontWeight: 600, color: "primary.main" }}>
                  Haz clic para subir una imagen
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  JPEG, PNG, GIF, WebP (máx. 10MB)
                </Typography>
              </Box>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </Box>

          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.categoryExternalIds}
          >
            <InputLabel>Categorías</InputLabel>
            <Select
              multiple
              value={selectedCategories}
              onChange={(e) =>
                setValue("categoryExternalIds", e.target.value as string[])
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => {
                    const category = categories.find(
                      (c) => c.externalId === value
                    );
                    return (
                      <Chip
                        key={value}
                        label={category?.name}
                        size="small"
                        sx={{
                          bgcolor: "primary.main",
                          color: "white",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                        }}
                      />
                    );
                  })}
                </Box>
              )}
              sx={{
                borderRadius: 2.5,
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Category sx={{ color: "primary.main", fontSize: 20 }} />
                </InputAdornment>
              }
            >
              {categories.map((category) => (
                <MenuItem key={category.externalId} value={category.externalId}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {errors.categoryExternalIds && (
              <Typography
                sx={{
                  color: "error.main",
                  fontSize: "0.75rem",
                  mt: 0.5,
                  ml: 1.5,
                }}
              >
                {errors.categoryExternalIds.message}
              </Typography>
            )}
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1, gap: 1.5 }}>
          <Button
            onClick={handleClose}
            disabled={loading || uploadingImage}
            sx={{
              px: 3,
              py: 1,
              fontWeight: 600,
              borderRadius: 2,
              color: "text.secondary",
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || uploadingImage}
            sx={{
              px: 4,
              py: 1,
              fontWeight: 700,
              bgcolor: "primary.main",
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(30,58,95,0.25)",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            {loading ? "Creando..." : "Crear Producto"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
