"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MonthlySalesProps {
  data: any[];
}

export const MonthlySales: React.FC<MonthlySalesProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" minHeight={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3" />

        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${value / 1000}k`}
        />
        <Tooltip />
        <Bar dataKey="sales" fill="#3498db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
