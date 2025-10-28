import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";


const projectRoutes = Router();
const projectController = new ProjectController();

projectRoutes.get("/",projectController.getProjects);
projectRoutes.post("/",projectController.createProject);
projectRoutes.put("/:id",projectController.editProject)
projectRoutes.delete("/:id",projectController.deleteProject)

export default projectRoutes;