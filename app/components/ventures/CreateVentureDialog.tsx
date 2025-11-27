import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  Category,
  Close,
  Description,
  Image,
  Store,
} from "@mui/icons-material";
import { apiClient } from "~/lib/api/client";
import { useAuthStore } from "~/store/authStore";

const ventureSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
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

  const onSubmit = async (data: VentureForm) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      await apiClient.createVenture({
        userExternalId: user.externalId,
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        categoryExternalIds: data.categoryExternalIds,
      });

      reset();
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

          <TextField
            {...register("imageUrl")}
            label="Image URL (Optional)"
            fullWidth
            margin="normal"
            error={!!errors.imageUrl}
            helperText={errors.imageUrl?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Image sx={{ color: "text.secondary", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />

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
            disabled={loading}
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
            disabled={loading}
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
