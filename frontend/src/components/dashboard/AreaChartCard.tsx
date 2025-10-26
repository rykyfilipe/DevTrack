import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

interface Props{
    
}

function AreaChartCard() {

    // #region Sample data
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

  return (//vreaau ca la hover sa nu mai afiseze linia verticala si sa faci ui-ul mai elegant cu culorile din app


    <div className="bg-(--accent) flex flex-col p-8 w-1/2"> 
        <h1 className="font-bold text-xl text-white">Task Compleation Over Time</h1>
        <div className="w-full">
        <AreaChart
            style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
            data={data}
            margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
            }}
        >
            <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2071f3" stopOpacity={1} />
                <stop offset="100%" stopColor="#2071f3" stopOpacity={0} />
            </linearGradient>
            </defs>

            <XAxis
                dataKey="name"
                axisLine={false}   // remove baseline line
                tickLine={false}   // remove small tick lines
                tick={{ fill: 'rgba(255,255,255,0.6)' }} 
            />
            <YAxis hide /> {/* hide the entire Y axis */}
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#2071f3" strokeWidth={3} fill="url(#colorUv)" />
        </AreaChart>
    </div>
    </div>
  )
}

export default AreaChartCard