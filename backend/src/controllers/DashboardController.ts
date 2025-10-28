import { Request, Response } from "express";
import { DashboardService } from "../services/DashboardService";
import { verify } from "crypto";
import { verifyJwt } from "../utils/auth";


export class DashboardController {
    private dashboardService : DashboardService;

    constructor(){
        this.dashboardService = new DashboardService();
    }

    getStats = async (req:Request,res:Response) => {
        try {

            const token : any = req.headers.authorization?.split(" ")[1];

            const decodedToken : any = verifyJwt(token);
            const userId = decodedToken.id;

            const stats = await this.dashboardService.getStats(userId);

            res.status(200).json(stats);
            
        } catch ( error : any) {
            console.error(error);
            res.status(400).json({error : error.message});
        }
    }

    getRecentActivities = async (req:Request,res:Response) => {
        try {

            const token : any = req.headers.authorization?.split(" ")[1];

            const decodedToken : any = verifyJwt(token);
            const userId = decodedToken.id;

            const activities = await this.dashboardService.getRecentActivities(userId);

            res.status(200).json(activities);
            
        } catch ( error : any) {
            console.error(error);
            res.status(400).json({error : error.message});
        }
    }

    getchartData = async (req:Request,res:Response) => {
        try {

            const token : any = req.headers.authorization?.split(" ")[1];

            const decodedToken : any = verifyJwt(token);
            const userId = decodedToken.id;

            const chartData = await this.dashboardService.getChartData(userId);

            res.status(200).json(chartData);
            
        } catch ( error : any) {
            console.error(error);
            res.status(400).json({error : error.message});
        }
    }
}