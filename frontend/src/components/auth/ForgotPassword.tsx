
interface ForgotPasswordProps {
  email: string;
  setEmail: (email: string) => void;
}

function ForgotPassword({email,setEmail}: ForgotPasswordProps) {
   return (
    <div className="flex flex-col">
      <input
        type="email"
        aria-label="email"

        placeholder="Email address"
        className="p-3 border bg-transparent border-gray-500 rounded-2xl text-white placeholder:text-gray-500 placeholder:text-sm"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        name="email"
      />
      
    </div>
  );
}

export default ForgotPassword