import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "@/pages/Auth.tsx";
import Dashboard from "@/pages/Dashboard";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
