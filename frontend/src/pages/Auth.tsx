import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

function Auth() {
  const { user, login } = useAuth()!; // folosim non-null assertion dacă suntem siguri că AuthProvider e root

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<"ADMIN" | "MEMBER" | "VIEWER">("ADMIN");

  if(user){
      return (
          <div>
              <h1>User logged in:</h1>
              <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
      )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      login({ name, email, password, role });
  };

  return (
      <div className="w-full h-full flex justify-center items-center">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <select value={role} onChange={e => setRole(e.target.value as "ADMIN" | "MEMBER" | "VIEWER")}>
                <option value="ADMIN">ADMIN</option>
                <option value="MEMBER">MEMBER</option>
                <option value="VIEWER">VIEWER</option>
              </select>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                  LogIn
              </button>
          </form>
      </div>
  )
}

export default Auth;
