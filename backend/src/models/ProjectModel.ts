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

    async getAll(){
        return await this.prisma.project.findMany();
    }
}