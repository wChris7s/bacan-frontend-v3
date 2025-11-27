import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { Product } from "~/lib/api/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="180"
        image={
          product.imageUrl || "https://via.placeholder.com/400x300?text=Product"
        }
        alt={product.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom noWrap>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description?.substring(0, 80)}
          {product.description && product.description.length > 80 && "..."}
        </Typography>
        <Box sx={{ mb: 2 }}>
          {product.categories.map((category) => (
            <Chip
              key={category.externalId}
              label={category.name}
              size="small"
              sx={{ mr: 0.5, mb: 0.5 }}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color="primary">
            ${product.price.toFixed(2)}
          </Typography>
          <Typography
            variant="body2"
            color={product.stock > 0 ? "success.main" : "error.main"}
          >
            Stock: {product.stock}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
