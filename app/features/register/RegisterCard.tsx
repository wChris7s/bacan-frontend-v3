import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as React from "react";
import { PersonType, RegisterCardData } from "~/records/PersonRegisterRecords";
import { Colors } from "~/enums/Colors";

interface RegisterCardProps {
  type: PersonType;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function RegisterCard({
  type,
  checked = false,
  onChange,
}: RegisterCardProps) {
  const { cardImage, cardImageTitle, cardTitle, cardDescription } =
    RegisterCardData[type];

  return (
    <Card
      sx={{
        maxWidth: "345px",
        borderRadius: "16px",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={cardImage}
        title={cardImageTitle}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {cardTitle}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {cardDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => onChange?.(e.target.checked)}
              sx={{
                color: Colors.BLACK,
                "&.Mui-checked": {
                  color: Colors.BLACK,
                },
                "& .MuiSvgIcon-root": {
                  fontSize: 18,
                },
              }}
            />
          }
          label="Seleccionar"
          sx={{
            marginLeft: 0,
            userSelect: "none",
            "& .MuiFormControlLabel-label": {
              fontSize: 14,
              fontWeight: 400,
            },
          }}
        />
      </CardActions>
    </Card>
  );
}
