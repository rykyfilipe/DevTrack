import { Router } from "express";
import { DashboardController } from "../controllers/DashboardController";

const dashboardRoutes = Router();
const dashboardController = new DashboardController();

dashboardRoutes.get("/stats", dashboardController.getStats);
dashboardRoutes.get("/chart-data", dashboardController.getchartData);
dashboardRoutes.get("/recent-activities", dashboardController.getRecentActivities);

export default dashboardRoutes;