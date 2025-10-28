import { Request, Response } from "express";
import { ProjectService } from "../services/ProjectService";
import { verifyJwt } from "../utils/auth";
import { IProjectInput } from "../models/ProjectModel";


export class ProjectController{
    private projectService : ProjectService;

    constructor(){
        this.projectService = new ProjectService();
    }

   getProjects =  async (req:Request,res:Response) => {
        try {
            const token : any = req.headers.authorization?.split(" ")[1];
            
            const decodedToken : any = verifyJwt(token);
            const userId = decodedToken.id;

            const projects = await this.projectService.getAllProjectById(userId);

            res.status(200).json(projects);
            
        } catch (error : any) {
            console.error(error);
            res.status(500).json({error : error.message})
        }
    }

     createProject = async (req:Request,res:Response) => {
        try {
            const token : any = req.headers.authorization?.split(" ")[1];
            
            const decodedToken : any = verifyJwt(token);
            const userId = decodedToken.id;

            const body : IProjectInput = await req.body;
            console.log(body);

            if (!body.name || !body.description || !body.status) {
                return res.status(400).json({ error: "Missing required fields" });
                }

            const project = await this.projectService.createProject({name:body.name,
                description:body.description,status:body.status,ownerId:body.ownerId})

            res.status(201).json(project);
            
        } catch (error : any) {
            console.error(error);
            res.status(500).json({error : error.message})
        }
    }

     editProject = async (req:Request,res:Response) => {
        try {
            const token : any = req.headers.authorization?.split(" ")[1];
            
            const decodedToken : any = verifyJwt(token);
            const userId = decodedToken.id;

           const { id: projectId } = req.params;  // ← Correto!

            if (!projectId) {
                return res.status(400).json({ error: "Project ID is required" });
            }       
            const body : Omit<IProjectInput,"ownerId">  = await req.body;

            console.log(projectId);

            const project = await this.projectService.editProject({name:body.name,
                description:body.description,status:body.status,projectId})

            res.status(200).json(project);
            
        } catch (error : any) {
            console.error(error);
            res.status(500).json({error : error.message})
        }
    }
    deleteProject = async (req:Request,res:Response) =>{
        try {
            const token : any = req.headers.authorization?.split(" ")[1];
            
            const decodedToken : any = verifyJwt(token);
            const userId = decodedToken.id;

            const { id: projectId } = req.params;  // ← Correto!

            if (!projectId) {
                return res.status(400).json({ error: "Project ID is required" });
            }

            const result =  await this.projectService.deleteProject(projectId);

            res.status(200);
            
        } catch (error : any) {
            console.error(error);
            res.status(500).json({error : error.message})
        }
    }
}