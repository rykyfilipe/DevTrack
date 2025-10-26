import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "@/pages/Auth.tsx";
import Dashboard from "@/pages/Dashboard";
import Layout from "@/components/Layout";
import Projects from "@/pages/Projects";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />

        </Route>
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
