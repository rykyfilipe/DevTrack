interface LoginProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  role: "ADMIN" | "MEMBER" | "VIEWER";
  setRole: (role: "ADMIN" | "MEMBER" | "VIEWER") => void;
}

// Componenta Login
export const Login = ({ email, setEmail, password, setPassword, role, setRole }: LoginProps) => {
  return (
    <div className="flex flex-col">
      <input
        type="email"
        aria-label="email"

        placeholder="Email address"
        className="p-3 border bg-transparent border-gray-500 rounded-tl-2xl rounded-tr-2xl text-white placeholder:text-gray-500 placeholder:text-sm"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        name="email"
      />
      <input
        type="password"
        aria-label="password"
        placeholder="Password"
        className="p-3 border border-gray-500 rounded-bl-2xl bg-transparent rounded-br-2xl text-white border-t-0 placeholder:text-gray-500 placeholder:text-sm"
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