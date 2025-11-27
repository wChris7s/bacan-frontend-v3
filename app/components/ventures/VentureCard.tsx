import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { ArrowForward, Storefront } from "@mui/icons-material";
import { Venture } from "~/lib/api/types";

interface VentureCardProps {
  venture: Venture;
  onSelect: () => void;
}

export function VentureCard({ venture, onSelect }: VentureCardProps) {
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
          transform: "translateY(-8px)",
          boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.12)",
          "& .venture-image": {
            transform: "scale(1.08)",
          },
          "& .venture-overlay": {
            opacity: 1,
          },
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          className="venture-image"
          component="img"
          height="220"
          image={
            venture.imageUrl ||
            "https://via.placeholder.com/400x300?text=Venture"
          }
          alt={venture.name}
          sx={{
            objectFit: "cover",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <Box
          className="venture-overlay"
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
            opacity: 0,
            transition: "opacity 0.4s ease",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            width: 44,
            height: 44,
            borderRadius: 2,
            bgcolor: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Storefront fontSize="small" />
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3.5 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            mb: 1.5,
            letterSpacing: "-0.02em",
          }}
        >
          {venture.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
            lineHeight: 1.7,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 48,
          }}
        >
          {venture.description || "No description provided"}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
          {venture.categories.map((category) => (
            <Chip
              key={category.externalId}
              label={category.name}
              size="small"
              sx={{
                bgcolor: "black",
                color: "white",
                fontWeight: 600,
                fontSize: "0.7rem",
                height: 26,
                borderRadius: 1.5,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "#333",
                },
              }}
            />
          ))}
        </Box>
      </CardContent>

      <Box sx={{ p: 3, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          endIcon={<ArrowForward />}
          onClick={onSelect}
          sx={{
            py: 1.5,
            fontWeight: 700,
            fontSize: "0.95rem",
            bgcolor: "black",
            borderRadius: 3,
            boxShadow: "0px 4px 14px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "#1a1a1a",
              transform: "translateY(-2px)",
              boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
            },
          }}
        >
          View Products
        </Button>
      </Box>
    </Card>
  );
}
