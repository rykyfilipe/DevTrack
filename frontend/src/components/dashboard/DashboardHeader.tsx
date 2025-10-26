import { SearchIcon } from "lucide-react"

const SearchBar = () => {
    return (
        <div className="hidden md:flex items-center space-x-2 bg-gray-700 px-2 py-2 rounded-2xl outline outline-gray-500">
            <SearchIcon className="w-5 h-5 text-gray-500"/>
            <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-none outline-none text-white placeholder-gray-500"
            />
        </div>
    )
}

function DashboardHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-b-gray-800">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <SearchBar />
    </header>
  )
}

export default DashboardHeader