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
import { Venture } from "~/lib/api/types";

const productSchema = z.object({
  ventureExternalId: z.string().min(1, "Select a venture"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  price: z.number().min(0.01, "Price must be greater than 0"),
  stock: z.number().int().min(0, "Stock must be 0 or greater"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  categoryExternalIds: z
    .array(z.string())
    .min(1, "Select at least one category"),
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
        imageUrl: data.imageUrl,
        categoryExternalIds: data.categoryExternalIds,
      });

      reset();
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create product");
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
        <DialogTitle>Create New Product</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.ventureExternalId}
          >
            <InputLabel>Venture</InputLabel>
            <Select {...register("ventureExternalId")} label="Venture">
              {ventures.map((venture) => (
                <MenuItem key={venture.externalId} value={venture.externalId}>
                  {venture.name}
                </MenuItem>
              ))}
            </Select>
            {errors.ventureExternalId && (
              <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: 0.5 }}>
                {errors.ventureExternalId.message}
              </Box>
            )}
          </FormControl>

          <TextField
            {...register("name")}
            label="Product Name"
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
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              {...register("price", { valueAsNumber: true })}
              label="Price"
              type="number"
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={errors.price?.message}
              inputProps={{ step: "0.01", min: "0" }}
            />

            <TextField
              {...register("stock", { valueAsNumber: true })}
              label="Stock"
              type="number"
              fullWidth
              margin="normal"
              error={!!errors.stock}
              helperText={errors.stock?.message}
              inputProps={{ min: "0" }}
            />
          </Box>

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
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
