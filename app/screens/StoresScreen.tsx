import React, { useState, useEffect } from "react";
import StoreCard from "~/features/store/StoreCard";

interface Store {
  id: number;
  name: string;
  description?: string;
  logoUrl?: string;
  email?: string;
  phone?: string;
  category?: string;
}

export default function StoresScreen() {
  const [search, setSearch] = useState("");
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [categories, setCategories] = useState<string[]>([]);

  // 🔥 Cargar tiendas desde el backend
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tiendas", {
          credentials: "include",
        });
        const data = await res.json();
        setStores(data);

        // Extraer categorías únicas dinámicamente
        const uniqueCategories = Array.from(
          new Set(data.map((store: Store) => store.category || "Sin categoría"))
        );
        // @ts-ignore
        setCategories(["Todas", ...uniqueCategories]);
      } catch (err) {
        console.error("Error al obtener tiendas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  // 🔍 Filtrado dinámico por nombre y categoría
  const filteredStores = stores.filter((store) => {
    const matchesSearch = store.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todas" || store.category === selectedCategory;
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

      {/* 🏪 Contenido principal */}
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
          🌱 Emprendimientos que transforman tu comunidad
        </h1>
        <p style={{ color: "#666", marginBottom: 24, fontSize: 16 }}>
          Descubre proyectos locales e innovadores que promueven el cambio.
        </p>

        {/* 🔎 Barra de búsqueda */}
        <div style={{ marginBottom: 32 }}>
          <input
            type="text"
            placeholder="🔍 Buscar por nombre del emprendimiento..."
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

        {/* 🛒 Lista de tiendas */}
        {loading ? (
          <p style={{ textAlign: "center", color: "#888" }}>Cargando tiendas...</p>
        ) : filteredStores.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#777",
              fontSize: 16,
              background: "#f9f9f9",
              padding: 24,
              borderRadius: 10,
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            ❌ No se encontraron emprendimientos en esta categoría o búsqueda.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {filteredStores.map((store) => (
              <div
                key={store.id}
                style={{
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <StoreCard {...store} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
