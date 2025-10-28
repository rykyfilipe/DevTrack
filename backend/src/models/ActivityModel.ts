import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();


export class ActivityModel {

    private prisma: PrismaClient;

    constructor(){
        this.prisma = prisma;
    }

    async getRecentActivities(userId:string){
        return await this.prisma.activityLog.findMany({
            where:{
                userId
            },
            orderBy:{
                createdAt:'desc'
            },
            take:10
        });
    }

}