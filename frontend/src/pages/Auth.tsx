import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Props pentru Login
interface LoginProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  role: "ADMIN" | "MEMBER" | "VIEWER";
  setRole: (role: "ADMIN" | "MEMBER" | "VIEWER") => void;
}

// Componenta Login
const Login = ({ email, setEmail, password, setPassword, role, setRole }: LoginProps) => {
  return (
    <div className="flex flex-col">
      <input
        type="email"
        placeholder="Email address"
        className="p-3 border-1 bg-transparent border-gray-500 rounded-tl-2xl rounded-tr-2xl text-white placeholder:text-gray-500 placeholder:text-sm"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        name="email"
      />
      <input
        type="password"
        placeholder="Password"
        className="p-3 border-1 border-gray-500 rounded-bl-2xl bg-transparent rounded-br-2xl text-white border-t-0 placeholder:text-gray-500 placeholder:text-sm"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        name="password"
      />
      <div className="flex justify-between items-center">
        <select
          value={role}
          onChange={e => setRole(e.target.value as "ADMIN" | "MEMBER" | "VIEWER")}
          className="mt-4 max-w-fit bg-background-dark text-white p-2 rounded-2xl border border-gray-500"
        >
          <option value="ADMIN">ADMIN</option>
          <option value="MEMBER">MEMBER</option>
          <option value="VIEWER">VIEWER</option>
        </select>

        <a href="/forgot-password" className="text-sm text-blue-500 hover:underline mt-2">
          Forgot password?
        </a>
      </div>
    </div>
  );
};

// Props pentru SignUp
interface SignUpProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  role: "ADMIN" | "MEMBER" | "VIEWER";
  setRole: (role: "ADMIN" | "MEMBER" | "VIEWER") => void;
}

// Componenta SignUp
const SignUp = ({ name, setName, email, setEmail, password, setPassword, role, setRole }: SignUpProps) => {
  return (
    <div className="flex flex-col">
      <input
        type="text"
        placeholder="Name"
        className="p-3 border-1 border-gray-500 bg-transparent rounded-tl-2xl rounded-tr-2xl text-white placeholder:text-gray-500 placeholder:text-sm"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        name="name"
      />
      <input
        type="email"
        placeholder="Email address"
        className="p-3 border-1 border-gray-500 bg-transparent border-t-0 text-white placeholder:text-gray-500 placeholder:text-sm"
        value={email}
        name="email"
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="p-3 border-1 border-gray-500 bg-transparent rounded-bl-2xl rounded-br-2xl text-white border-t-0 placeholder:text-gray-500 placeholder:text-sm"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <div className="flex justify-between items-center">
        <select
          value={role}
          onChange={e => setRole(e.target.value as "ADMIN" | "MEMBER" | "VIEWER")}
          className="mt-4 max-w-fit bg-background-dark text-white p-2 rounded-2xl border border-gray-500"
        >
          <option value="ADMIN">ADMIN</option>
          <option value="MEMBER">MEMBER</option>
          <option value="VIEWER">VIEWER</option>
        </select>

        <a href="/forgot-password" className="text-sm text-blue-500 hover:underline mt-2">
          Forgot password?
        </a>
      </div>
    </div>
  );
};

// Componenta principală Auth
function Auth() {
  const auth = useAuth();
  if (!auth) return null;

  const { login, signup } = auth;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<"ADMIN" | "MEMBER" | "VIEWER">("ADMIN");

  const [tabs, setTabs] = useState<"LOGIN" | "SIGNUP">("LOGIN");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tabs === "LOGIN") {
      const result = await login({ email, password, role });
      if (!result) alert("Login failed. Please check your credentials.");
      else navigate("/dashboard");
    } else {
      const result = await signup({ name, email, password, role });
      if (!result) alert("Signup failed. Server error or user with that email exists already.");
      else navigate("/dashboard");
    }
  };


  return (
    <div className="w-full h-full flex justify-center items-center bg-background-dark">
      <form
        className="min-w-[350px] max-w-[450px] w-full min-h-fit flex flex-col justify-between gap-2 bg-white/5 bg-background-dark p-10 rounded-2xl"
        onSubmit={handleSubmit}
      >
        <header className="flex flex-col items-center mb-4">
          <svg
            className="mx-auto h-12 w-auto text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12M3.75 3h16.5M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12M12 21.75l-3.75-3.75M12 21.75l3.75-3.75M12 21.75v-9"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <h1 className="text-color font-bold text-3xl mt-5">DevTrack</h1>
          <p className="text-gray-500 text-sm mt-2">Sign in to your account</p>
        </header>

        <div className="flex justify-center gap-4 mb-4">
          <button
            type="button"
            onClick={() => setTabs("LOGIN")}
            className={`px-4 py-2 rounded-2xl font-semibold ${
              tabs === "LOGIN"
                ? "bg-[#2071f3] text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setTabs("SIGNUP")}
            className={`px-4 py-2 rounded-2xl font-semibold ${
              tabs === "SIGNUP"
                ? "bg-[#2071f3] text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
            }`}
          >
            Sign Up
          </button>
        </div>

        {tabs === "LOGIN" && (
          <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} role={role} setRole={setRole} />
        )}
        {tabs === "SIGNUP" && (
          <SignUp
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            role={role}
            setRole={setRole}
          />
        )}

        <button
          type="submit"
          className="mt-5 bg-[#2071f3] font-semibold text-white text-sm p-2 rounded-2xl hover:bg-blue-600 transition-colors hover:cursor-pointer"
        >
          {tabs === "LOGIN" ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Auth;
