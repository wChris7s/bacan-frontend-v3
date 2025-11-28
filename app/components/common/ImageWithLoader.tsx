import { useState } from "react";
import { Box, CircularProgress, Skeleton } from "@mui/material";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  height?: number | string;
  width?: number | string;
  borderRadius?: number | string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  className?: string;
  onClick?: () => void;
}

export function ImageWithLoader({
  src,
  alt,
  height = 200,
  width = "100%",
  borderRadius = 0,
  objectFit = "cover",
  className,
  onClick,
}: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width,
        height,
        borderRadius,
        overflow: "hidden",
        bgcolor: "grey.100",
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.100",
            zIndex: 1,
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            sx={{
              position: "absolute",
              inset: 0,
            }}
          />
          <CircularProgress
            size={32}
            sx={{
              color: "primary.main",
              position: "relative",
              zIndex: 2,
            }}
          />
        </Box>
      )}

      {hasError ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.200",
            color: "grey.500",
            fontSize: "0.875rem",
            textAlign: "center",
            p: 2,
          }}
        >
          No se pudo cargar la imagen
        </Box>
      ) : (
        <Box
          component="img"
          className={className}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          sx={{
            width: "100%",
            height: "100%",
            objectFit,
            opacity: isLoading ? 0 : 1,
            transition:
              "opacity 0.3s ease-in-out, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      )}
    </Box>
  );
}

// Variante para tarjetas de productos
interface ProductImageProps {
  src?: string;
  alt: string;
  height?: number;
}

export function ProductImage({ src, alt, height = 240 }: ProductImageProps) {
  const defaultImage = "https://via.placeholder.com/400x300?text=Sin+Imagen";

  return (
    <ImageWithLoader
      src={src || defaultImage}
      alt={alt}
      height={height}
      className="product-image"
    />
  );
}

// Variante para tarjetas de emprendimientos
interface VentureImageProps {
  src?: string;
  alt: string;
  height?: number;
}

export function VentureImage({ src, alt, height = 220 }: VentureImageProps) {
  const defaultImage =
    "https://via.placeholder.com/400x300?text=Emprendimiento";

  return (
    <ImageWithLoader
      src={src || defaultImage}
      alt={alt}
      height={height}
      className="venture-image"
    />
  );
}
