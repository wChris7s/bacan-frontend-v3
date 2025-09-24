import { OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Colors } from "~/enums/Colors";

interface NavbarSearchFilterProps {
  onChange: () => void;
}

export function NavbarSearchFilter(props: NavbarSearchFilterProps) {
  return (
    <OutlinedInput
      sx={{
        width: "100%",
        height: "46px",
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: Colors.BLACK,
        },
      }}
      placeholder="Buscar producto"
      endAdornment={<SearchIcon />}
    />
  );
}
