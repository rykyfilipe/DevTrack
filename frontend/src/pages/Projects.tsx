import AddProjectModal from "@/components/projects/AddProjectModal";
import EditProjectModal from "@/components/projects/EditProjectModal";
import ProjectsHeader from "@/components/projects/ProjectsHeader"
import ProjectsList from "@/components/projects/ProjectsList";
import useProjects from "@/hooks/ProjectsHook";


function Projects() {

  const {projects,handleAddProject,handleDeleteProject,handleEditProject,handleStartEdit,showAddModal,showEditModal,setShowAddModal,setShowEditModal,currentProject} = useProjects();


  return (
    <div className="w-full h-full">
      <ProjectsHeader setShowModal={setShowAddModal} />
      
      <ProjectsList
        projects={projects}
        deleteProject={handleDeleteProject}
        startEditProject={handleStartEdit}
      />

      {showAddModal && (
        <AddProjectModal
          onClose={setShowAddModal}
          addProject={handleAddProject}
        />
      )}

      {showEditModal && currentProject && (
        <EditProjectModal
          onClose={setShowEditModal}
          editProject={handleEditProject}
          project={currentProject}
        />
      )}
    </div>
  );
}

export default Projects;