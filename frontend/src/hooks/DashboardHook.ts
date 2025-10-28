import axiosClient from "@/api/AxiosClient";
import type { Activity, Stat } from "@/types/dashboard";
import {  useEffect, useState } from "react";

interface DashboardStats {
    totalProjects: number;
    activeTasks: number;
    completedTasks: number;
    teamMembers: number;
}


const useDashboard = () => {

    const [stats,setStats] = useState<Stat[] | null>(null);
    const [activities,setActivities] = useState<Activity[] | null>(null);
    const [chartData,setChartData] = useState<any[] | null>(null);

    useEffect(() => {

        const fetchStats = async () => {
            try {

                const response = await axiosClient.get<DashboardStats>("/api/dashboard/stats");

                if (response.status === 200) {

                    setStats(response.data ? [
                        { label: "Total Projects", value: response.data.totalProjects },
                        { label: "Active Tasks", value: response.data.activeTasks },
                        { label: "Completed Tasks", value: response.data.completedTasks },
                        { label: "Team Members", value: response.data.teamMembers },
                    ] : null    );
                    console.log("Fetched stats:", response.data);
                }



            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            }
        }

        const fetchChartData = async () => {
            try {
                const response = await axiosClient.get("/api/dashboard/chart-data");

                if (response.status === 200) {

                    if(response.data.length === 0){
                        setChartData(null);

                        setChartData([
                            { date: '2024-01', completed: 0, total: 2 },
                            { date: '2024-02', completed: 0, total: 34 },
                            { date: '2024-03', completed: 0, total: 0 },
                            { date: '2024-04', completed: 0, total: 10 },
                            { date: '2024-05', completed: 0, total: 5 },
                            { date: '2024-06', completed: 0, total: 3 },
                        ]);

                        console.log("No chart data available.");
                        return;
                    }
                    setChartData(response.data);
                    console.log("Fetched chart data:", response.data);
                }

            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        }

        const fetchRecentActivities = async () => {
            try {
                const response = await axiosClient.get("/api/dashboard/recent-activities");

                if (response.status === 200) {
                    // setActivities(response.data || null);

                    if(response.data.length === 0){
                        // setActivities(null);
                        console.log("No recent activities available.");
                        setActivities([
                            {
                                id: "1",
                                action: "created",
                                projectId: "proj-1",
                                taskId: null,
                                userId: "user-1",
                                createdAt: new Date("2024-01-15T10:30:00Z"),
                                updatedAt: new Date("2024-01-15T10:30:00Z"),
                                category: "project",
                                description: "Project 'Website Redesign' created by Alice."
                            },
                            {
                                id: "2",
                                action: "assigned",
                                projectId: "proj-1",
                                taskId: "task-1",
                                userId: "user-1",
                                createdAt: new Date("2024-01-17T14:20:00Z"),
                                updatedAt: new Date("2024-01-17T14:20:00Z"),
                                category: "task",
                                description: "Task 'Design Homepage' assigned to Bob."
                            },
                            {
                                id: "3",
                                action: "completed",
                                projectId: "proj-1",
                                taskId: "task-1",
                                userId: "user-2",
                                createdAt: new Date("2024-01-25T16:45:00Z"),
                                updatedAt: new Date("2024-01-25T16:45:00Z"),
                                category: "task",
                                description: "Task 'Design Homepage' marked as completed by Bob."
                            },
                        ]);
                }
                console.log("Fetched recent activities:", response.data);
            }

            } catch (error) {
                console.error("Error fetching recent activities:", error);
            }
        }

    fetchRecentActivities();
    fetchStats();
    fetchChartData();
},[]);


    return {
        stats,
        chartData,
        activities
    }
}

export default useDashboard;