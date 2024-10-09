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
import { OrderStat } from "../Data";

interface OrderCountBarPlotProps {
  data: OrderStat[];
}

const OrderCountBarPlot: React.FC<OrderCountBarPlotProps> = ({ data }) => {
  return (
    <div className="h-72 my-16">
      <h1 className="text-2xl font-bold mb-6 text-primary">
        Orders Statistics
      </h1>
      <ResponsiveContainer height="100%" width="100%" className="my-4">
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
            dataKey="totalOrderCount"
            fill="#3b82f6"
            name={"Orders Placed"}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderCountBarPlot;
