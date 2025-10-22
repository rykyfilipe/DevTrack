import type { ReactNode } from "react";
import "./App.css";

interface AppProps {
  children: ReactNode;
}

function App({ children }: AppProps) {
  return <main className="h-screen w-screen overflow-hidden">
    {children}</main>;
}

export default App;
