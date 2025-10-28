import type { Project } from "@/types/projects"
import { ChevronRight, Calendar, Zap,  Trash2, Edit2 } from "lucide-react"

interface Props {
    projects: Project[]
    startEditProject : (project : Project) => void;
    deleteProject : (id : string) => void;
}

function ProjectsList({ projects,startEditProject,deleteProject }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return "bg-green-500/20 text-green-400 border-green-500/30"
            case "COMPLETED":
                return "bg-blue-500/20 text-blue-400 border-blue-500/30"
            case "ARCHIVED":
                return "bg-gray-500/20 text-gray-400 border-gray-500/30"
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30"
        }
    }

    const formatDate = (date: any) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    if (projects.length === 0) {
        return (
            <div className="w-full p-5">
                <div className="bg-(--accent) rounded-2xl p-12 text-center border border-white/5">
                    <Zap className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No projects yet. Create one to get started!</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full p-5">
            <div className="bg-(--accent) rounded-2xl border border-white/5 overflow-hidden backdrop-blur-sm shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-linear-to-r from-white/5 to-transparent border-b border-white/10">
                                <th className="text-left text-gray-400 font-semibold text-sm px-6 py-4">PROJECT NAME</th>
                                <th className="text-left text-gray-400 font-semibold text-sm px-6 py-4">OWNER</th>
                                <th className="text-left text-gray-400 font-semibold text-sm px-6 py-4">CREATED DATE</th>
                                <th className="text-left text-gray-400 font-semibold text-sm px-6 py-4">STATUS</th>
                                <th className="text-left text-gray-400 font-semibold text-sm px-6 py-4">PROGRESS</th>
                                <th className="text-center text-gray-400 font-semibold text-sm px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr
                                    key={project.id}
                                    className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200 group"
                                >
                                    <td className="px-6 py-4">
                                        <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                            {project.name}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">
                                        {project.owner}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        {formatDate(project.createdAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                                                    style={{ width: `${project.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-gray-400 font-medium w-8">
                                                {project.progress}%
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center flex items-center justify-center gap-4">
                                        <Edit2 className="w-4 h-4 text-gray-500 hover:text-blue-400 hover:translate-x-1 transition-all hover:cursor-pointer" 
                                            onClick={() => startEditProject(project)}
                                        />
                                        <Trash2 className="w-4 h-4 text-gray-500 hover:text-blue-400 hover:translate-x-1 transition-all hover:cursor-pointer" 
                                            onClick={() => deleteProject(project.id)}
                                        />
                                        <ChevronRight className="w-4 h-4 text-gray-500 hover:text-blue-400 hover:translate-x-1 transition-all hover:cursor-pointer" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProjectsList