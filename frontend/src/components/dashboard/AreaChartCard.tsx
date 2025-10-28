import { Area, AreaChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

interface Props {
    data: any[] | null;
}

function AreaChartCard({ data }: Props) {
    if (!data) {
        return (
            <div className="bg-(--accent) rounded-2xl p-8 w-1/2 backdrop-blur-sm ">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="font-bold text-2xl text-white">Task Completion</h1>
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <div className="w-full h-72 flex items-center justify-center rounded-xl bg-linear-to-br from-white/5 to-transparent">
                    <p className="text-gray-400 text-center">
                        No data available yet.<br/>
                        <span className="text-sm text-gray-500">Start completing tasks to see analytics</span>
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-(--accent) rounded-2xl p-8 w-full xl:col-span-2 backdrop-blur-smshadow-2xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-bold text-2xl text-white">Task Completion</h1>
                    <p className="text-sm text-gray-400 mt-1">Over the last 30 days</p>
                </div>
                <div className="bg-linear-to-br from-blue-500/20 to-blue-600/10 rounded-lg p-3 backdrop-blur">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
            </div>

            {data.length === 0 ? (
                <div className="w-full h-72 flex items-center justify-center rounded-xl bg-linear-to-br from-white/5 to-transparent">
                    <p className="text-gray-400">No chart data available</p>
                </div>
            ) : (
                <div className="rounded-xl bg-gralinear-to-b from-white/5 to-transparent p-6 backdrop-blur-sm border border-white/10">
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#2071f3" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#2071f3" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="gridGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                                </linearGradient>
                            </defs>

                           

                            <XAxis
                                dataKey="date"
                                stroke="rgba(255,255,255,0.3)"
                                style={{ fontSize: "12px" }}
                                tickLine={false}
                            />

                            <YAxis
                                stroke="rgba(255,255,255,0.3)"
                                style={{ fontSize: "12px" }}
                                tickLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                                    border: "1px solid rgba(32, 113, 243, 0.3)",
                                    borderRadius: "12px",
                                    padding: "12px 16px",
                                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                                    backdropFilter: "blur(10px)",
                                }}
                                labelStyle={{ color: "#fff", fontSize: "12px", fontWeight: "600" }}
                                formatter={(value: any) => [
                                    <span className="text-blue-400 font-semibold">{value}</span>,
                                    "Tasks Completed"
                                ]}
                                cursor={{ stroke: "rgba(32, 113, 243, 0.5)", strokeWidth: 2 }}
                            />

                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#2071f3"
                                strokeWidth={3}
                                fill="url(#colorTotal)"
                                isAnimationActive={true}
                                animationDuration={800}
                                dot={{ r: 5, fill: "#2071f3", strokeWidth: 2, stroke: "rgba(32, 113, 243, 0.2)" }}
                                activeDot={{ r: 7, fill: "#2071f3" }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>

                    {data.length > 0 && (
                        <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                            <div className="text-center">
                                <p className="text-gray-400 text-sm">Total Completed</p>
                                <p className="text-blue-400 font-bold text-lg mt-1">
                                    {data[data.length - 1]?.total || 0}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-400 text-sm">Peak Month</p>
                                <p className="text-blue-400 font-bold text-lg mt-1">
                                    {Math.max(...data.map(d => d.total))}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-400 text-sm">Avg. per Month</p>
                                <p className="text-blue-400 font-bold text-lg mt-1">
                                    {(data.reduce((sum, item) => sum + (item.total || 0), 0) / data.length).toFixed(1)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default AreaChartCard