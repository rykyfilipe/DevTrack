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

    async countTasksByStatus(userId :string ,status:TaskStatus){
        return await this.prisma.task.count({
            where:{
                assignedToId:userId,
                status:status
            }
        });
    }

    async getCompletedTasksOverTime(userId:string){
        const result = await this.prisma.$queryRaw<
            { date: string; completedTasks: number }[]
        >`
            SELECT 
                DATE_TRUNC('month', "updatedAt") AS date,
                COUNT(*) AS "completedTasks"
            FROM 
                "Task"
            WHERE 
                "assignedToId" = ${userId} AND
                status = 'DONE'
            GROUP BY 
                DATE_TRUNC('month', "updatedAt")
            ORDER BY 
                date;
        `;

        return result;
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