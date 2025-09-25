import React from "react";
import Button from "@mui/joy/Button";
import SidebarItem from "~/features/sidebar/SidebarItem";

const sidebarStyle: React.CSSProperties = {
  width: "220px",
  minWidth: "180px",
  height: "100vh",
  background: "#1e1414",
  color: "#ffffff",
  display: "flex",
  flexDirection: "column",
  padding: "0",
  boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
  borderRight: "1px solid #333",
  overflowY: "auto",
};

const logoStyle: React.CSSProperties = {
  width: "120px",
  margin: "32px auto 24px auto",
  display: "block",
};

const navStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const footerStyle: React.CSSProperties = {
  borderTop: "1px solid #333",
  background: "#1a1a1a",
  position: "sticky",
  bottom: 0,
  width: "100%",
  zIndex: 1,
  display: "flex",
  justifyContent: "center",
};

const Sidebar: React.FC = () => (
  <aside style={sidebarStyle} role="navigation" aria-label="Sidebar navigation">
    <img src="/assets/logo.svg" alt="Logo" style={logoStyle} />
    <nav style={navStyle} aria-label="Main menu">
      <SidebarItem />
    </nav>
    <div style={footerStyle}>
      <Button
        component="a"
        href="/"
        color="primary"
        variant="solid"
        sx={{ width: "100%", maxWidth: 160 }} // Ocupa solo el espacio disponible y se centra
      >
        Volver a inicio
      </Button>
    </div>
  </aside>
);

export default Sidebar;
