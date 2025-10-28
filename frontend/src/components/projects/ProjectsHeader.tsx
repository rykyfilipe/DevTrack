import { Plus, SearchIcon } from "lucide-react"

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

interface ProjectsHeaderProps {
    setShowModal: (show: boolean) => void;
}

function ProjectsHeader({setShowModal}: ProjectsHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-b-gray-800">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <div className="flex items-center gap-4">
            <SearchBar />
            <div className="w-full justify-end mt-auto p-4 text-white">
                   <button className="w-full  bg-blue-500 py-2 font-bold rounded-4xl hover:cursor-pointer hover:scale-110 transition-all hidden md:px-3 md:flex items-center " 
                   onClick={() => setShowModal(true)}>
                    <Plus/>
                     <span>New Project</span>
                   </button>
                   <button className="w-max p-2 bg-blue-500 rounded-full font-bold  hover:cursor-pointer hover:scale-110 transition-all md:hidden block" 
                   onClick={() => setShowModal(true)}>
                     <Plus/>
                   </button>
            </div>
        </div>
    </header>
  )
}

export default ProjectsHeader