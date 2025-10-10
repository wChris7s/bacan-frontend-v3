import React, { useState, useEffect } from "react";
import ProductsCard from "~/features/products/ProductsCard";

interface Product {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
  category?: string;
  storeName?: string;
  rating?: number;
  inStock?: boolean;
}

export default function ProductsScreen() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [categories, setCategories] = useState<string[]>([]);

  // 🔥 Cargar productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulando datos mientras no tengas backend
        const mockProducts: Product[] = [
          {
            id: 1,
            name: "Laptop Gaming MSI",
            description: "Laptop para gaming con tarjeta gráfica RTX 4060, 16GB RAM y 512GB SSD",
            imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2024/11/cheapgaminglaptops-2048px-7981.jpg",
            price: 2500,
            category: "Electrónicos",
            storeName: "TechStore Lima",
            rating: 4.5,
            inStock: true
          },
          {
            id: 2,
            name: "Toca Discos Vintage",
            description: "Toca discos retro con excelente calidad de sonido para los amantes del vinilo",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Tocadiscos.JPG",
            price: 450,
            category: "Música",
            storeName: "Vinyl Paradise",
            rating: 4.2,
            inStock: true
          },
          {
            id: 3,
            name: "Escultura Decorativa",
            description: "Hermosa escultura artesanal perfecta para decorar tu hogar u oficina",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Nike_of_Samothrake_Louvre_Ma2369_n4.jpg/250px-Nike_of_Samothrake_Louvre_Ma2369_n4.jpg",
            price: 180,
            category: "Arte y Decoración",
            storeName: "Arte Peruano",
            rating: 4.8,
            inStock: false
          },
          {
            id: 4,
            name: "Chompa Alpaca Premium",
            description: "Chompa de alta calidad confeccionada con lana de alpaca 100% peruana",
            imageUrl: "https://www.perumarketplace.com/cmm/getImage.do?atchFileId=FILE_c925ea21-267f-44cb-bcf7-3647fd4e2286&fileSn=1&thumb=600",
            price: 150,
            category: "Ropa",
            storeName: "Textiles Andinos",
            rating: 4.6,
            inStock: true
          },
          {
            id: 5,
            name: "Polo Orgánico",
            description: "Polo 100% algodón orgánico, cómodo y resistente para uso diario",
            imageUrl: "https://i.etsystatic.com/26348635/c/1169/1169/455/578/il/38ff5f/6905504950/il_300x300.6905504950_bmfs.jpg",
            price: 45,
            category: "Ropa",
            storeName: "EcoFashion",
            rating: 4.3,
            inStock: true
          },
          {
            id: 6,
            name: "Ropero de Madera",
            description: "Ropero espacioso de madera natural con diseño moderno y funcional",
            imageUrl: "https://promart.vteximg.com.br/arquivos/roperos_de_maderanatural_boton_80x80.jpg",
            price: 680,
            category: "Muebles",
            storeName: "Mueblería San Juan",
            rating: 4.4,
            inStock: true
          },
          {
            id: 7,
            name: "Smartphone Android",
            description: "Teléfono inteligente con cámara de 48MP, 128GB de almacenamiento y batería de larga duración",
            imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
            price: 850,
            category: "Electrónicos",
            storeName: "Mobile World",
            rating: 4.1,
            inStock: true
          },
          {
            id: 8,
            name: "Café Orgánico Premium",
            description: "Café de grano entero cultivado en las montañas del Cusco, tostado artesanalmente",
            imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
            price: 35,
            category: "Alimentos",
            storeName: "Café de los Andes",
            rating: 4.9,
            inStock: true
          },
          {
            id: 9,
            name: "Zapatillas Running",
            description: "Zapatillas deportivas con tecnología de amortiguación avanzada para corredores",
            imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
            price: 220,
            category: "Deportes",
            storeName: "SportZone",
            rating: 4.7,
            inStock: true
          },
          {
            id: 10,
            name: "Libro de Cocina Peruana",
            description: "Recetario completo con los platos más tradicionales y modernos de la gastronomía peruana",
            imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
            price: 65,
            category: "Libros",
            storeName: "Librería Cultural",
            rating: 4.5,
            inStock: true
          }
        ];

        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));

        setProducts(mockProducts);

        // Extraer categorías únicas dinámicamente
        const uniqueCategories = Array.from(
          new Set(mockProducts.map((product: Product) => product.category || "Sin categoría"))
        );
        setCategories(["Todas", ...uniqueCategories]);
      } catch (err) {
        console.error("Error al obtener productos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🔍 Filtrado dinámico por nombre y categoría
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todas" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        maxWidth: 1300,
        margin: "0 auto",
        padding: "48px 24px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* 🧭 Sidebar de categorías */}
      <aside
        style={{
          width: 240,
          background: "#fff",
          border: "1px solid #eee",
          borderRadius: 10,
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          padding: 20,
          height: "fit-content",
          position: "sticky",
          top: 40,
        }}
      >
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
          🗂 Categorías
        </h3>
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "8px 10px",
              marginBottom: 6,
              borderRadius: 6,
              cursor: "pointer",
              background:
                selectedCategory === cat ? "#007bff" : "transparent",
              color: selectedCategory === cat ? "#fff" : "#333",
              transition: "all 0.2s",
            }}
          >
            {cat}
          </div>
        ))}
      </aside>

      {/* 🛍️ Contenido principal */}
      <main style={{ flex: 1 }}>
        {/* Título */}
        <h1
          style={{
            fontWeight: 700,
            fontSize: 28,
            marginBottom: 8,
            color: "#333",
          }}
        >
          🛒 Productos Destacados
        </h1>
        <p style={{ color: "#666", marginBottom: 24, fontSize: 16 }}>
          Descubre una amplia variedad de productos de calidad de emprendedores locales.
        </p>

        {/* 🔎 Barra de búsqueda */}
        <div style={{ marginBottom: 32 }}>
          <input
            type="text"
            placeholder="🔍 Buscar productos por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: 16,
              borderRadius: 8,
              border: "1px solid #ccc",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              transition: "all 0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#007bff")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
          />
        </div>

        {/* 📦 Lista de productos */}
        {loading ? (
          <div style={{
            textAlign: "center",
            color: "#888",
            padding: "60px 0",
            background: "#f9f9f9",
            borderRadius: 10,
            fontSize: 18
          }}>
            <div style={{ marginBottom: 16, fontSize: 48 }}>⏳</div>
            Cargando productos...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#777",
              fontSize: 16,
              background: "#f9f9f9",
              padding: 40,
              borderRadius: 10,
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h3 style={{ margin: "0 0 8px 0", color: "#555" }}>No se encontraron productos</h3>
            <p style={{ margin: 0 }}>
              Intenta con otros términos de búsqueda o selecciona una categoría diferente.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {filteredProducts.map((product) => (
              <ProductsCard
                key={product.id}
                {...product}
                onClick={() => {
                  // Aquí puedes agregar navegación a detalle del producto
                  console.log(`Clicked on product ${product.id}: ${product.name}`);
                }}
              />
            ))}
          </div>
        )}

        {/* 📊 Información adicional */}
        {!loading && filteredProducts.length > 0 && (
          <div style={{
            marginTop: 40,
            padding: 20,
            background: "#f8f9fa",
            borderRadius: 10,
            textAlign: "center",
            color: "#666"
          }}>
            <p style={{ margin: 0, fontSize: 14 }}>
              Mostrando {filteredProducts.length} de {products.length} productos
              {selectedCategory !== "Todas" && ` en la categoría "${selectedCategory}"`}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
