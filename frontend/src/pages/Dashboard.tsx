import AreaChartCard from "@/components/dashboard/AreaChartCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardStats from "@/components/dashboard/DashboardStats"
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";
import type { Activity, Stat } from "@/types/dashboard";
import { Check, File, Users } from "lucide-react";
import { useEffect, useState } from "react"


function Dashboard() {

  const [stats,setStats] = useState<Stat[] | null>(null);
  const [recentActivites,setRecentActivities] = useState<Activity[] | null>(null);

  useEffect(() => {
    setTimeout(() => {
    setStats([
      {label: "Total Projects", value: 12},
      {label: "Active Tasks", value: 35},
      {label: "Completed Tasks", value: 150},
      {label: "Team members", value: 8},
    ])}, 2000);

    setTimeout(() => {
      setRecentActivities([
        {category: <Check/>, description: "Design Homepage UI", time: "2 hours ago"},
        {category: <File/>, description: "Launch Marketing Campaign", time: "5 hours ago"},
        {category: <Check/>, description: "Fix Login Bug", time: "1 day ago"},
        {category: <Users/>, description: "Update User Profile Page", time: "2 days ago"},
      ])
    }, 2000);

  },[]);

  return (
    <div className="w-full h-full">
        <DashboardHeader/>
        <DashboardStats stats={stats}/>
        <div className="w-full flex ">
          <AreaChartCard/>
          <RecentActivityCard recentActivities={recentActivites}/>
        </div>
    </div>
  )
}

export default Dashboard