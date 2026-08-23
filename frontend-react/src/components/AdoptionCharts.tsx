import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface AdoptionData {
  month: string;
  applications: number;
  adoptions: number;
}

interface CategoryData {
  name: string;
  value: number;
}

const adoptionData: AdoptionData[] = [
  { month: "Jan", applications: 28, adoptions: 18 },
  { month: "Feb", applications: 35, adoptions: 25 },
  { month: "Mar", applications: 42, adoptions: 28 },
  { month: "Apr", applications: 60, adoptions: 35 },
  { month: "May", applications: 50, adoptions: 42 },
  { month: "Jun", applications: 95, adoptions: 80 },
  { month: "Jul", applications: 75, adoptions: 62 },
  { month: "Aug", applications: 87, adoptions: 52 },
  { month: "Sep", applications: 45, adoptions: 28 },
  { month: "Oct", applications: 69, adoptions: 25 },
  { month: "Nov", applications: 96, adoptions: 25 },
  { month: "Dec", applications: 36, adoptions: 60 },
];

const categoryData: CategoryData[] = [
  { name: "Dogs", value: 42 },
  { name: "Cats", value: 31 },
  { name: "Birds", value: 12 },
  { name: "Rabbits", value: 9 },
  { name: "Others", value: 6 },
];

const PIE_COLORS = ["#8172F6", "#FF8580", "#38B8D5", "#FFAE49", "#557FE8"];

const AdoptionCharts: React.FC = () => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* =========================================
            ADOPTION TRENDS
        ========================================= */}
        <div className="w-full">
          <h2 className="mb-3 text-xl font-semibold text-[#0A303A]">
            Adoption Trends
          </h2>

          <div
            className="
              relative
              w-full
              h-[380px]
              rounded-[24px]
              border-2
              border-[#0A303A]
              bg-[#F5F8F9]
              p-5
              shadow-sm
            "
          >
            {/* Year Dropdown */}
            <div className="absolute right-5 top-5 z-10">
              <select
                defaultValue="yearly"
                className="
                  appearance-none
                  rounded-lg
                  border
                  border-[#0A303A]
                  bg-[#F5F8F9]
                  px-3
                  py-1.5
                  pr-8
                  text-sm
                  text-[#0A303A]
                  outline-none
                  cursor-pointer
                "
              >
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>

              {/* Dropdown Arrow */}
              <span
                className="
                  pointer-events-none
                  absolute
                  right-2
                  top-1/2
                  -translate-y-1/2
                  text-[#0A303A]
                "
              >
                ▼
              </span>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={adoptionData}
                margin={{
                  top: 55,
                  right: 20,
                  left: -10,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="2 2"
                  vertical={false}
                  stroke="#D5DDE0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#444",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 220]}
                  ticks={[0, 40, 80, 120, 160, 200]}
                  tick={{
                    fill: "#444",
                    fontSize: 12,
                  }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                    backgroundColor: "#fff",
                  }}
                />

                <Legend
                  verticalAlign="bottom"
                  height={35}
                  iconType="line"
                  wrapperStyle={{
                    fontSize: "13px",
                    color: "#444",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="applications"
                  name="Applications"
                  stroke="#8172F6"
                  strokeWidth={2.5}
                  dot={{
                    r: 3.5,
                    fill: "#8172F6",
                    stroke: "#fff",
                    strokeWidth: 1.5,
                  }}
                  activeDot={{
                    r: 5,
                  }}
                  fill="#8172F6"
                />

                <Line
                  type="monotone"
                  dataKey="adoptions"
                  name="Adoptions"
                  stroke="#FF8580"
                  strokeWidth={2.5}
                  dot={{
                    r: 3.5,
                    fill: "#FF8580",
                    stroke: "#fff",
                    strokeWidth: 1.5,
                  }}
                  activeDot={{
                    r: 5,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* =========================================
            PET CATEGORIES
        ========================================= */}
        <div className="w-full">
          <h2 className="mb-3 text-xl font-semibold text-[#0A303A]">
            Pet Categories
          </h2>

          <div
            className="
              relative
              w-full
              h-[420px]
              rounded-[24px]
              border-2
              border-[#0A303A]
              bg-[#F5F8F9]
              p-5
              shadow-sm
            "
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="40%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={157}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                  labelLine={true}
                  label={({ value }) => `${value}%`}
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [`${value}%`, "Pets"]}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                    backgroundColor: "#fff",
                  }}
                />

                {/* Center Text */}
                <text
                  x="40%"
                  y="48%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#444"
                  fontSize="12"
                >
                  <tspan x="40%" dy="-5" fontSize="13" fontWeight="500">
                    2,847
                  </tspan>

                  <tspan x="40%" dy="18" fontSize="12">
                    Total Pets
                  </tspan>
                </text>

                {/* Custom Legend */}
                <g>
                  {categoryData.map((item, index) => {
                    const y = 135 + index * 27;

                    return (
                      <g key={item.name}>
                        <circle
                          cx="83%"
                          cy={y}
                          r="6"
                          fill={PIE_COLORS[index]}
                        />

                        <text x="85%" y={y + 4} fill="#555" fontSize="13">
                          {item.name}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdoptionCharts;
