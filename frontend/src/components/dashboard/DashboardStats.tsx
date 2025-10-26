import type { Stat } from "@/types/dashboard";

interface DashboardStatsProps {
    stats: Stat[] | null;
}

function DashboardStats({stats}: DashboardStatsProps) {
  return (
    <div className="">
        {stats ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-(--accent) shadow rounded-lg p-6">
                        <h3 className="text-lg font-bold text-gray-500">{stat.label}</h3>
                        <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
                    </div>
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {[1,2,3,4].map(() => (
                    <div  className="bg-(--accent) shadow rounded-lg h-30">
                        <div className="animate-pulse p-6">
                            <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                            <div className="h-10 bg-gray-700 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>       
         )}
    </div>
  )
}

export default DashboardStats