import { IProjectInput, ProjectModel } from "../models/ProjectModel";



export class ProjectService{
    private projectModel : ProjectModel;

    constructor(projectModel? : ProjectModel){
        this.projectModel = projectModel || new ProjectModel();
    }

    async getAllProjectById(userId : string){
        return await this.projectModel.getAll(userId);
    }

    async createProject(payload : IProjectInput){
        return await this.projectModel.createProject(payload);
    }

    async editProject(payload : Omit<IProjectInput,"ownerId"> & {projectId : string}){
        return await this.projectModel.editProject(payload);
    }

    async deleteProject(id : string){
        return await this.projectModel.deleteProject(id);
    }
}