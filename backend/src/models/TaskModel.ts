import { Priority, PrismaClient, TaskStatus } from "../generated/prisma";

const prisma = new PrismaClient();

interface ITaskInput{
    title:string;
    description:string;
    projectId:string;
    assignedToId :string;
    priority:Priority;
    status:TaskStatus;
    dueDate : Date;
}


export class TaskModel{

    private prisma: PrismaClient;

    constructor(){
        this.prisma = prisma;
    }

    async createTask({title,description,priority,status,dueDate,projectId,assignedToId}:ITaskInput){
        return await this.prisma.task.create({
            data:{
                title,
                description,
                priority,
                status,
                dueDate,
                projectId,
                assignedToId
            }
        });
    }

    async getById(taskId:string){
        return await this.prisma.task.findUnique({
            where:{
                id:taskId
            }
        });
    }

    async getAll(){
        return await this.prisma.task.findMany();
    }

}