import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
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
        border: "1px solid #f0f0f0",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={
          venture.imageUrl || "https://via.placeholder.com/400x300?text=Venture"
        }
        alt={venture.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          {venture.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, lineHeight: 1.6 }}
        >
          {venture.description || "No description provided"}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {venture.categories.map((category) => (
            <Chip
              key={category.externalId}
              label={category.name}
              size="small"
              sx={{
                bgcolor: "black",
                color: "white",
                fontWeight: 500,
              }}
            />
          ))}
        </Box>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          endIcon={<ArrowForward />}
          onClick={onSelect}
          sx={{
            py: 1.2,
            fontWeight: 600,
            bgcolor: "black",
            "&:hover": {
              bgcolor: "#333",
            },
          }}
        >
          View Products
        </Button>
      </Box>
    </Card>
  );
}
