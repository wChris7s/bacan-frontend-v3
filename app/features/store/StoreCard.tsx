import React from "react";

interface StoreCardProps {
  name: string;
  description?: string;
  logoUrl?: string;
  email?: string;
  phone?: string;
}

const StoreCard: React.FC<StoreCardProps> = ({
  name,
  description = "Sin descripción disponible.",
  logoUrl,
  email,
  phone,
}) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      border: "1px solid #eee",
      borderRadius: 10,
      padding: 20,
      minWidth: 270,
      background: "#fff",
      boxShadow: "0 2px 8px #0001",
      flex: 1,
      maxWidth: 350,
    }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", background: "#f3f3f3", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {logoUrl ? (
          <img src={logoUrl} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ color: "#bbb", fontSize: 32 }}>🏪</span>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: 0, fontSize: 20 }}>{name}</h3>
        <p style={{ margin: "6px 0 8px 0", color: "#555", fontSize: 15 }}>{description}</p>
        {email && <div style={{ fontSize: 13, color: "#888" }}>📧 {email}</div>}
        {phone && <div style={{ fontSize: 13, color: "#888" }}>📞 {phone}</div>}
      </div>
    </div>
  );
};

export default StoreCard;

