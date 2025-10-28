import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Login } from "@/components/auth/Login";
import { SignUp } from "@/components/auth/Signup";
import ForgotPassword from "@/components/auth/ForgotPassword";

// Componenta principală Auth
function Auth() {
  const auth = useAuth();
  if (!auth) return null;

  const { login, signup,user } = auth;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<"ADMIN" | "MEMBER" | "VIEWER">("ADMIN");

  const [tabs, setTabs] = useState<"LOGIN" | "SIGNUP" | "FORGOT_PASSWORD">("LOGIN");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tabs === "LOGIN") {
      const result = await login({  email, password, role });
      if (!result) alert("Login failed. Please check your credentials.");
      else navigate("/dashboard");
    } else if(tabs === "SIGNUP") {
      const result = await signup({ name, email, password, role });
      if (!result) alert("Signup failed. Server error or user with that email exists already.");
      else navigate("/dashboard");
    }
    else if(tabs === "FORGOT_PASSWORD") {
      alert("If an account with that email exists, a password reset link has been sent.");
      setTabs("LOGIN");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);


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

        {tabs === "FORGOT_PASSWORD" && (
          <ForgotPassword email={email} setEmail={setEmail}/>
        )}
        {tabs !== "FORGOT_PASSWORD" &&
        <div className="w-full flex justify-end">
          <button 
            type="button"
            className=" bg-transparent  w-max h-min text-blue-600 hover:border-b-blue-800 hover:cursor-pointer text-sm "
            onClick={() => setTabs("FORGOT_PASSWORD")}>
            
            Forgot password?
          </button>
        </div>
      }
        <button
          type="submit"
          className="mt-5 bg-[#2071f3] font-semibold text-white text-sm p-2 rounded-2xl hover:bg-blue-600 transition-colors hover:cursor-pointer"
        >
          {tabs === "LOGIN" &&"Login" }
          {tabs === "SIGNUP" && "Sign Up"}
          {tabs === "FORGOT_PASSWORD" && "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Auth;
