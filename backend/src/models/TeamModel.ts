import { Priority, PrismaClient, TaskStatus } from "../generated/prisma";

const prisma = new PrismaClient();

interface ITeamInput{
    name:string;
    projectId:string;
}


export class TeamModel{

    private prisma: PrismaClient;

    constructor(){
        this.prisma = prisma;
    }

    async createTeam({name,projectId}:ITeamInput){
        return await this.prisma.team.create({
            data:{
               name,
               projectId
            }
        });
    }

    async getById(teamId:string){
        return await this.prisma.team.findUnique({
            where:{
                id:teamId
            }
        });
    }

    async countTeamMembers(userId:string){
        return await this.prisma.teamMember.count({
            where:{
                team:{
                    TeamMember:{
                        some:{
                            userId:userId
                        }
                    }
                }
            }
        });
    }

    async getAll(){
        return await this.prisma.team.findMany();
    }

}