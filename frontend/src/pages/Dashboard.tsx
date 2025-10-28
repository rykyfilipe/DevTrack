import AreaChartCard from "@/components/dashboard/AreaChartCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardStats from "@/components/dashboard/DashboardStats"
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";
import useDashboard from "@/hooks/DashboardHook";




function Dashboard() {

  const {stats,chartData,activities} = useDashboard();  

  return (
    <div className="w-full h-full">
        <DashboardHeader/>
        <DashboardStats stats={stats}/>
        <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-5 p-5">
          <AreaChartCard data={chartData}/>
          <RecentActivityCard recentActivities={activities}/>
        </div>
    </div>
  )
}

export default Dashboard