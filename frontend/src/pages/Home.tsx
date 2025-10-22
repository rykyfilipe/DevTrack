import { useNavigate } from "react-router-dom"


function Home() {

    const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-5">
        <header className="text-center space-y-2">
            <h1 className="text-7xl font-bold">
                Welcome to DevTrack
            </h1>
            <p className="text-black/60">
                An app for all developers
            </p>
        </header>

        <button className="px-10 py-2.5 bg-black cursor-pointer border-none hover:scale-120 text-white rounded-4xl transition-transform "
            onClick={() => navigate("/auth")}>
            Start
        </button>
    </div>
  )
}

export default Home