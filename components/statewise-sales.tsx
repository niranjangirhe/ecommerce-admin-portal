"use client";

import { getStateCodes } from "@/actions/get-state-codes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface OverviewProps {
  data: any[];
}

export const StateWiseSales: React.FC<OverviewProps> = ({ data }) => {
  const stateCodes = getStateCodes();
  return (
    <ResponsiveContainer width="100%" minHeight={350}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3" />
        <XAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          type="number"
        />
        <YAxis
          type="category"
          dataKey="statename"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => {
            const state = stateCodes.find((state) => state.code === value);
            return state ? state.name : value;
          }}
        />
        <Tooltip />
        <Bar dataKey="sales" fill="#3498db" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
