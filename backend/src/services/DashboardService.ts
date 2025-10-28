import { stat } from "fs";
import { ProjectModel } from "../models/ProjectModel";
import { TaskModel } from "../models/TaskModel";
import { TeamModel } from "../models/TeamModel";
import { TaskStatus } from "../generated/prisma";
import { ActivityModel } from "../models/ActivityModel";



export class DashboardService {

    private projectModel : ProjectModel;
    private taskModel : TaskModel;
    private teamModel : TeamModel;
    private activityModel : ActivityModel;

    constructor(
        projectModel?: ProjectModel,
        taskModel?: TaskModel,
        teamModel?: TeamModel,
        activityModel?: ActivityModel
    ) {
        this.projectModel = projectModel || new ProjectModel();
        this.taskModel = taskModel || new TaskModel();
        this.teamModel = teamModel || new TeamModel();
        this.activityModel = activityModel || new ActivityModel();
    }

  async getStats(userId : string) {

    const totalProjects = await this.projectModel.countProjects(userId);
    const activeTasks = await this.taskModel.countTasksByStatus(userId, TaskStatus.IN_PROGRESS);
    const completedTasks = await this.taskModel.countTasksByStatus(userId,TaskStatus.DONE);
    const teamMembers = await this.teamModel.countTeamMembers(userId);

    return {
      totalProjects,
      activeTasks,
      completedTasks,
      teamMembers,
    };
  }

  async getChartData(userId : string) {

    const chartData = await this.taskModel.getCompletedTasksOverTime(userId);

    return chartData;
  }

  async getRecentActivities(userId : string) {

    const recentActivities = await this.activityModel.getRecentActivities(userId);

    return recentActivities;
  }

}