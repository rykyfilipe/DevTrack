import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.tsx";
import Auth from "@/pages/Auth.tsx";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
