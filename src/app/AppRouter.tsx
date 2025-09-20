"use client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "@/app/screens/HomeScreen";
import { AboutScreen } from "@/app/screens/AboutScreen";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<AboutScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
