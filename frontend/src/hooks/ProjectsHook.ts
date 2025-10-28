import axiosClient from "@/api/AxiosClient";
import { useAuth } from "@/contexts/AuthContext";
import type { Project } from "@/types/projects";
import { useEffect, useState } from "react";

interface ProjectInput {
  name: string;
  description: string;
  status:  "ACTIVE" | "COMPLETED" | "ARCHIVED";
}

const useProjects = () => {

    const {user} = useAuth();

    const [projects, setProjects] = useState<Project[]>([]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);

    useEffect(() => {

      const fetchProjects = async () =>{

        try {

          const response = await axiosClient.get("/api/projects")

          if(response.status === 200){
            console.log(response.data);
            setProjects(response.data);
            console.log(response.data);
          }
          
        } catch (error : any) {
          console.error(error.message);
        }
      }

      fetchProjects();

    },[]);


    const handleAddProject = async (payload: ProjectInput) => {

        try {
          const response = await axiosClient.post("api/projects",{
            ...payload,
            ownerId : user?.id
          });

          if(response.status === 201){
               
              setProjects([...projects, response.data]);
          }
          
        } catch (error : any) {
          console.error(error.message) 
        }

       
  };

  const handleEditProject = async (payload: ProjectInput) => {
  if (!currentProject) return;

  try {
    const response = await axiosClient.put(`/api/projects/${currentProject.id}`, {
      name: payload.name,
      description: payload.description,
      status: payload.status,
    });

    if (response.status === 200) {
      setProjects(
        projects.map(pr =>
          pr.id === currentProject.id
            ? {
                ...pr,
                name: payload.name,
                description: payload.description,
                status: payload.status,
              }
            : pr
        )
      );
    }

  } catch (error: any) {
    console.error("Error editing project:", error.message);
    alert("Failed to edit project");
  } finally {
    setCurrentProject(null);
  }
};

  const handleDeleteProject = async (id: string) => {
     try {
          const response = await axiosClient.delete(`api/projects/${id}`);

          if (response.status === 200) {
            setProjects(projects.filter(pr => pr.id !== id));
          }
          
        } catch (error : any) {
          console.error(error.message) 
        }
  };

  const handleStartEdit = (project: Project) => {
    setCurrentProject(project);
    setShowEditModal(true);
  };



    return{
        projects,
        handleAddProject,
        handleDeleteProject,
        handleEditProject,
        handleStartEdit,
        currentProject,
        showAddModal,
        showEditModal,
        setShowAddModal,
        setShowEditModal
    }

}

export default useProjects;