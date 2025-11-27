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
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Create New Venture</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
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
          />

          <TextField
            {...register("imageUrl")}
            label="Image URL (Optional)"
            fullWidth
            margin="normal"
            error={!!errors.imageUrl}
            helperText={errors.imageUrl?.message}
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
                      <Chip key={value} label={category?.name} size="small" />
                    );
                  })}
                </Box>
              )}
            >
              {categories.map((category) => (
                <MenuItem key={category.externalId} value={category.externalId}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {errors.categoryExternalIds && (
              <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: 0.5 }}>
                {errors.categoryExternalIds.message}
              </Box>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Creating..." : "Create Venture"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
