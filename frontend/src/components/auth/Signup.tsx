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
export const SignUp = ({ name, setName, email, setEmail, password, setPassword, role, setRole }: SignUpProps) => {
  return (
    <div className="flex flex-col">
      <input
        type="text"
        placeholder="Name"
        className="p-3 border border-gray-500 bg-transparent rounded-tl-2xl rounded-tr-2xl text-white placeholder:text-gray-500 placeholder:text-sm"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        name="name"
      />
      <input
        type="email"
        placeholder="Email address"
        className="p-3 border border-gray-500 bg-transparent border-t-0 text-white placeholder:text-gray-500 placeholder:text-sm"
        value={email}
        name="email"
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="p-3 border border-gray-500 bg-transparent rounded-bl-2xl rounded-br-2xl text-white border-t-0 placeholder:text-gray-500 placeholder:text-sm"
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