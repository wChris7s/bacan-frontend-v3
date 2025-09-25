import React from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Home from "@mui/icons-material/Home";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Apps from "@mui/icons-material/Apps";

const items = [
  { label: "Home", icon: <Home />, path: "/" },
  { label: "Shop", icon: <ShoppingCart />, path: "/shop" },
  { label: "Apps", icon: <Apps />, path: "/apps" },
];

const SidebarItem: React.FC = () => (
  <List>
    {items.map((item) => (
      <ListItem key={item.label}>
        <ListItemButton
          color="primary"
          variant="plain"
          component="a"
          href={item.path}
        >
          <ListItemDecorator>{item.icon}</ListItemDecorator>
          <ListItemContent>{item.label}</ListItemContent>
          <KeyboardArrowRight />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);

export default SidebarItem;
