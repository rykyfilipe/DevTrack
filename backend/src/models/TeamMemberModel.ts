import { Priority, PrismaClient, TaskStatus, TeamRole } from "../generated/prisma";

const prisma = new PrismaClient();

interface ITeamMemberInput{
    name:string;
    role:TeamRole
    userId:string;
    teamId:string;
}


export class TeamMemberModel{

    private prisma: PrismaClient;

    constructor(){
        this.prisma = prisma;
    }

    async createTeam({name,role,userId,teamId}:ITeamMemberInput){
        return await this.prisma.teamMember.create({
            data:{
               name,
               role,
               userId,
               teamId
            }
        });
    }

    async getById(teamMemberId:string){
        return await this.prisma.teamMember.findUnique({
            where:{
                id:teamMemberId
            }
        });
    }

    async getAll(){
        return await this.prisma.teamMember.findMany();
    }

}