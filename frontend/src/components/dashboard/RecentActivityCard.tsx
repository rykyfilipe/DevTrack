import type { Activity } from "@/types/dashboard";
import React from "react";

interface Props{
    recentActivities: Activity[] | null;
}

function RecentActivityCard({ recentActivities }: Props) {
  return (
    <div className="bg-(--accent) w-1/2">
        <h1 className="font-bold text-xl text-white p-8">Recent Activity</h1>
        <div className="flex flex-col">
            {recentActivities ? recentActivities.map((activity,index) => (
                <div key={index} className="bg-(--accent-dark) p-4 rounded-lg flex gap-3 items-center">
                        <div className="bg-blue-900 p-1 rounded-full w-max h-max flex items-center justify-center">
                            {React.cloneElement(activity.category as React.ReactElement, { className: "w-4 h-4 text-blue-600"   })}
                        </div>
                        <div className="flex flex-col">
                            <p className="text-white">{activity.description}</p>
                            <span className="text-sm text-gray-400">{activity.time}</span>
                        </div>
                </div>

            )) : [1,2,3,4].map(() => (
                 <div  className="bg-(--accent-dark) p-4 rounded-lg flex gap-3 items-center">
                         <div className="animate-pulse p-6">
                            <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                            <div className="h-10 bg-gray-700 rounded w-1/2"></div>
                        </div>
                </div>
            ))})
        </div>
    </div>
  )
}

export default RecentActivityCard