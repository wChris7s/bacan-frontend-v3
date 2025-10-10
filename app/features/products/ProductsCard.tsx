import React from "react";

interface ProductsCardProps {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
  category?: string;
  storeName?: string;
  rating?: number;
  inStock?: boolean;
  onClick?: () => void;
}

const ProductsCard: React.FC<ProductsCardProps> = ({
  id,
  name,
  description = "Sin descripción disponible.",
  imageUrl,
  price,
  category,
  storeName,
  rating,
  inStock = true,
  onClick,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} style={{ color: "#ffc107" }}>★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" style={{ color: "#ffc107" }}>☆</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} style={{ color: "#e0e0e0" }}>★</span>);
    }

    return stars;
  };

  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #eee",
        borderRadius: 12,
        padding: 16,
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.2s ease",
        maxWidth: 320,
        minHeight: 380,
        position: "relative",
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
        }
      }}
    >
      {/* Imagen del producto */}
      <div style={{
        width: "100%",
        height: 200,
        borderRadius: 8,
        overflow: "hidden",
        background: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
        position: "relative"
      }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        ) : (
          <span style={{ color: "#bbb", fontSize: 48 }}>📦</span>
        )}

        {/* Badge de stock */}
        {!inStock && (
          <div style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "#dc3545",
            color: "white",
            padding: "4px 8px",
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 600
          }}>
            Agotado
          </div>
        )}

        {/* Badge de categoría */}
        {category && (
          <div style={{
            position: "absolute",
            top: 8,
            left: 8,
            background: "rgba(0,123,255,0.9)",
            color: "white",
            padding: "4px 8px",
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 500
          }}>
            {category}
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{
          margin: "0 0 8px 0",
          fontSize: 18,
          fontWeight: 600,
          color: "#333",
          lineHeight: 1.3,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical"
        }}>
          {name}
        </h3>

        <p style={{
          margin: "0 0 12px 0",
          color: "#666",
          fontSize: 14,
          lineHeight: 1.4,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          flex: 1
        }}>
          {description}
        </p>

        {/* Rating */}
        {rating && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 8
          }}>
            <div style={{ display: "flex" }}>
              {renderStars(rating)}
            </div>
            <span style={{ fontSize: 13, color: "#666" }}>
              ({rating.toFixed(1)})
            </span>
          </div>
        )}

        {/* Tienda */}
        {storeName && (
          <div style={{
            fontSize: 13,
            color: "#888",
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 4
          }}>
            <span>🏪</span>
            {storeName}
          </div>
        )}

        {/* Precio */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "auto"
        }}>
          <div style={{
            fontSize: 20,
            fontWeight: 700,
            color: inStock ? "#28a745" : "#6c757d"
          }}>
            {formatPrice(price)}
          </div>

          {inStock && (
            <div style={{
              background: "#28a745",
              color: "white",
              padding: "6px 12px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#218838";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#28a745";
            }}
            onClick={(e) => {
              e.stopPropagation();
              // Aquí puedes agregar la lógica para añadir al carrito
            }}
            >
              + Carrito
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
