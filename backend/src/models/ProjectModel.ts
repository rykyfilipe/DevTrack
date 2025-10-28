import { PrismaClient, ProjectStatus, TaskStatus } from "../generated/prisma";

const prisma = new PrismaClient();


export interface IProjectInput {
  name: string;
  description: string;
  status : ProjectStatus;
  ownerId:string;
}


export class ProjectModel{

    private prisma : PrismaClient;

    constructor(){
        this.prisma = prisma;
    }

    async createProject({name,description,status,ownerId}:IProjectInput){
        return await this.prisma.project.create({
            data:{
                name,
                description,
                status,
                ownerId,
            }
        });
    }

    async editProject({name,description,status,projectId}:Omit<IProjectInput,"ownerId"> & {projectId : string}){
        return await this.prisma.project.update({
            where:{
                id:projectId
            },
            data:{
                name,
                description,
                status
            }
        });
    }

    async countProjects(userId : string){
        return await this.prisma.project.count(
            {
                where:{
                    ownerId : userId
                }
            }
        );
    }

    async getById(projectId : string){
        return await this.prisma.project.findUnique({
            where:{
                id:projectId
            }
        })
    }

    async getAll(userId : string){
        return await this.prisma.project.findMany({
            where:{
               ownerId:userId
            }
        });
    }

    async deleteProject(id : string){
        return await this.prisma.project.delete({
            where:{
                id
            }
        })
    }
}