import type { Activity } from "@/types/dashboard";
import { ChartArea, CheckIcon, File, Users } from "lucide-react";

interface Props {
    recentActivities: Activity[] | null;
}

function RecentActivityCard({ recentActivities }: Props) {
    return (
        <div className="bg-(--accent) w-full">
            <h1 className="font-bold text-xl text-white p-8">Recent Activity</h1>
            <div className="flex flex-col">
                {recentActivities && (
                    recentActivities.map((activity, index) => (
                        <div
                            key={index}
                            className="bg-(--accent-dark) p-4 rounded-lg flex gap-3 items-center"
                        >
                            <div className="bg-blue-900 p-1 rounded-full w-max h-max flex items-center justify-center">
                                {activity.category === "project" && <File className="w-4 h-4 text-blue-600"/>}
                                {activity.category === "report" && <ChartArea className="w-4 h-4 text-blue-600"/>}
                                {activity.category === "task" && <CheckIcon className="w-4 h-4 text-green-600"/>}
                                {activity.category === "team" && <Users className="w-4 h-4 text-blue-600"/>}


                            </div>
                            <div className="flex flex-col">
                                <p className="text-white">{activity.description}</p>
                                <span className="text-sm text-gray-400">
                                    {activity.updatedAt
                                        ? new Date(activity.updatedAt).toLocaleString()
                                        : new Date(activity.createdAt).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    ))
)}
               {recentActivities === null && (
                <>
                    {[1, 2, 3,4].map((skeleton) => (
                        <div
                            key={skeleton}
                            className="bg-(--accent-dark) p-4 rounded-lg flex gap-3 items-center"
                        >
                            <div className="animate-pulse flex space-x-4 items-center"> 
                                <div className="bg-blue-900 rounded-full w-6 h-6"/>
                                <div className="flex flex-col gap-3">
                                    <div className="w-40 h-5 bg-gray-700 rounded-2xl"/>
                                    <div className="w-20 h-5 bg-gray-700 rounded-2xl"/>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
)}
            </div>
        </div>
    );
}

export default RecentActivityCard;