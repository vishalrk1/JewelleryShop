import React from "react";
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
import { CombinedUserData } from "../Data";

interface UsersBarPlotProps {
  data: CombinedUserData[];
}

const UsersBarPlot: React.FC<UsersBarPlotProps> = ({ data }) => {
  return (
    <div className="h-72 mb-16">
      <h1 className="text-2xl font-bold mb-6 text-primary">User Statistics</h1>
      <ResponsiveContainer height="100%" width="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="activeUsersCount"
            fill="#60a5fa"
            name={"Active Users"}
          />
          <Bar dataKey="newUsersCount" fill="#3b82f6" name={"New Users"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersBarPlot;
