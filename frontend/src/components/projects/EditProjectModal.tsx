import type { Project } from "@/types/projects";
import { X } from "lucide-react";
import { useState } from "react";

interface ProjectInput {
    id?:string;
    name: string
    description: string;
      status:  "ACTIVE" | "COMPLETED" | "ARCHIVED";

}

interface EditProjectModalProps {
    onClose: (x: boolean) => void;
    editProject: (payload: ProjectInput) => void;
    project : Project | null;
}

function EditProjectModal({ project,onClose, editProject }: EditProjectModalProps) {

    if(!project) return;

    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState<"ACTIVE" | "COMPLETED" | "ARCHIVED">(project.status);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name.trim() || !description.trim()) {
            alert("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            editProject({ id:project.id ,name, description, status });
            onClose(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
            <div className="bg-(--accent) rounded-2xl shadow-2xl w-full max-w-xl mx-4 border border-white/10 overflow-hidden">
                
                {/* Header */}
                <div className="bg-(--accent)  p-6 flex items-center justify-between border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">Edit Project</h2>
                    <button
                        onClick={() => onClose(false)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors hover:cursor-pointer"
                        type="button"
                    >
                        <X className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 space-y-5">
                    
                    {/* Project Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300">Project Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.currentTarget.value)}
                            placeholder="Enter project name"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.currentTarget.value)}
                            placeholder="Enter project description"
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                            required
                        />
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300 rounded-2xl">Initial Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.currentTarget.value as "ACTIVE" | "COMPLETED" | "ARCHIVED")}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                        >
                            <option className="bg-(--accent) text-white " value="ACTIVE">ACTIVE</option>
                            <option className="bg-(--accent) text-white " value="COMPLETED">COMPLETED</option>
                            <option className="bg-(--accent) text-white " value="ARCHIVED">ARCHIVED</option>
                        </select>
                    </div>

                  
                </div>
                  {/* Buttons */}
                    <div className="flex items-center justify-end border-t border-t-gray-700">
                        <div className="flex p-5 mr-2 gap-3">
                        <button
                            type="button"
                            onClick={() => onClose(false)}
                            className="hover:cursor-pointer px-4 py-1 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="hover:cursor-pointer px-4 py-1 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Updating..." : "Update Project"}
                        </button>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default EditProjectModal;