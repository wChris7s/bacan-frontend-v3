import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { CheckCircle, Inventory } from "@mui/icons-material";
import { Product } from "~/lib/api/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        border: "1px solid rgba(0,0,0,0.06)",
        borderRadius: 4,
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0px 16px 32px rgba(30,58,95,0.12)",
          "& .product-image": {
            transform: "scale(1.06)",
          },
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          className="product-image"
          component="img"
          height="200"
          image={
            product.imageUrl ||
            "https://via.placeholder.com/400x300?text=Producto"
          }
          alt={product.name}
          sx={{
            objectFit: "cover",
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor:
              product.stock > 0 ? "rgba(34,197,94,0.9)" : "rgba(239,68,68,0.9)",
            color: "white",
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            fontSize: "0.75rem",
            fontWeight: 600,
            backdropFilter: "blur(8px)",
          }}
        >
          {product.stock > 0 ? `${product.stock} en stock` : "Agotado"}
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            width: 36,
            height: 36,
            borderRadius: 2,
            bgcolor: "rgba(30,58,95,0.85)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Inventory fontSize="small" />
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          noWrap
          sx={{
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: "primary.main",
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2.5,
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 40,
          }}
        >
          {product.description?.substring(0, 80) || "Sin descripción"}
          {product.description && product.description.length > 80 && "..."}
        </Typography>

        <Box sx={{ mb: 2.5, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {product.categories.slice(0, 2).map((category) => (
            <Chip
              key={category.externalId}
              label={category.name}
              size="small"
              sx={{
                bgcolor: "rgba(30,58,95,0.1)",
                color: "primary.main",
                fontWeight: 600,
                fontSize: "0.7rem",
                height: 24,
                borderRadius: 1.5,
              }}
            />
          ))}
          {product.categories.length > 2 && (
            <Chip
              label={`+${product.categories.length - 2}`}
              size="small"
              sx={{
                bgcolor: "secondary.main",
                color: "white",
                fontWeight: 600,
                fontSize: "0.7rem",
                height: 24,
                borderRadius: 1.5,
              }}
            />
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 2,
            borderTop: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "secondary.main",
              letterSpacing: "-0.02em",
            }}
          >
            ${product.price.toFixed(2)}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: product.stock > 0 ? "success.main" : "error.main",
            }}
          >
            {product.stock > 0 && <CheckCircle sx={{ fontSize: 18 }} />}
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {product.stock > 0 ? "Disponible" : "No disponible"}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
