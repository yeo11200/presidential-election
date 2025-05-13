import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Policy } from "../data/candidatesData";

interface PolicyRadarChartProps {
  policy: Policy;
  color: string;
}

const PolicyRadarChart: React.FC<PolicyRadarChartProps> = ({
  policy,
  color,
}) => {
  // Transform the policy data into the format required by the RadarChart
  const data = [
    { subject: "효과력", value: policy.attack },
    { subject: "비용", value: policy.cost },
    { subject: "리스크", value: policy.risk },
  ];

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name={policy.title}
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PolicyRadarChart;
