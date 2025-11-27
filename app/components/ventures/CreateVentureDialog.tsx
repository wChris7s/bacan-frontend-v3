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
  Category,
  Close,
  CloudUpload,
  Delete,
  Description,
  Store,
} from "@mui/icons-material";
import { apiClient } from "~/lib/api/client";
import { useAuthStore } from "~/store/authStore";

const ventureSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  categoryExternalIds: z
    .array(z.string())
    .min(1, "Select at least one category"),
});

type VentureForm = z.infer<typeof ventureSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateVentureDialog({ open, onClose, onSuccess }: Props) {
  const user = useAuthStore((state) => state.user);
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
  } = useForm<VentureForm>({
    resolver: zodResolver(ventureSchema),
    defaultValues: {
      categoryExternalIds: [],
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
      setError("Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.");
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
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

      const response = await apiClient.uploadVentureImage(file);
      setImageUrl(response.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
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

  const onSubmit = async (data: VentureForm) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      await apiClient.createVenture({
        userExternalId: user.externalId,
        name: data.name,
        description: data.description,
        imageUrl: imageUrl || undefined,
        categoryExternalIds: data.categoryExternalIds,
      });

      handleClose();
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create venture");
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
        boxShadow: "0px 2px 8px rgba(0,0,0,0.06)",
      },
      "&.Mui-focused": {
        boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
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
          boxShadow: "0px 24px 48px rgba(0,0,0,0.2)",
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
                bgcolor: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <Store />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Create New Venture
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start selling your products
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

          <TextField
            {...register("name")}
            label="Venture Name"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Store sx={{ color: "text.secondary", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />

          <TextField
            {...register("description")}
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ alignSelf: "flex-start", mt: 1.5 }}
                >
                  <Description sx={{ color: "text.secondary", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />

          {/* Image Upload Section */}
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography sx={{ fontWeight: 600, mb: 1, fontSize: "0.9rem" }}>
              Venture Image (Optional)
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
                      bgcolor: "rgba(0,0,0,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <CircularProgress sx={{ color: "white" }} size={32} />
                    <Typography sx={{ color: "white", fontSize: "0.9rem" }}>
                      Uploading...
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
                        bgcolor: "rgba(239,68,68,0.8)",
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
                  borderColor: "divider",
                  borderRadius: 3,
                  p: 4,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "black",
                    bgcolor: "rgba(0,0,0,0.02)",
                  },
                }}
              >
                <CloudUpload
                  sx={{ fontSize: 48, color: "text.secondary", mb: 1 }}
                />
                <Typography sx={{ fontWeight: 600 }}>
                  Click to upload image
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  JPEG, PNG, GIF, WebP (max 10MB)
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
            <InputLabel>Categories</InputLabel>
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
                          bgcolor: "black",
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
                "& .MuiOutlinedInput-notchedOutline": {
                  transition: "all 0.3s ease",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.06)",
                },
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Category sx={{ color: "text.secondary", fontSize: 20 }} />
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
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || uploadingImage}
            sx={{
              px: 4,
              py: 1,
              fontWeight: 700,
              bgcolor: "black",
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
              "&:hover": {
                bgcolor: "#1a1a1a",
              },
            }}
          >
            {loading ? "Creating..." : "Create Venture"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}