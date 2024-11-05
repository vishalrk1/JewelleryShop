import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Text,
  Tooltip,
  TooltipProps,
} from "recharts";

export interface ProductStat {
  category: string;
  productsInStock: number;
  productCount: number;
}

interface PieChartProps {
  data: ProductStat[];
  dataType: "productStock" | "totalProducts";
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const PieChartWithPaddingAngle: React.FC<PieChartProps> = ({
  data,
  dataType,
}) => {
  const total =
    dataType === "productStock"
      ? data.reduce((sum, entry) => sum + entry.productsInStock, 0)
      : data.reduce((sum, entry) => sum + entry.productCount, 0);

  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderCenterText = ({
    viewBox,
  }: {
    viewBox: { cx: number; cy: number };
  }) => {
    const { cx, cy } = viewBox;
    return (
      <>
        <Text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={24}
          fill="#000000"
        >
          Total
        </Text>
        <Text
          x={cx}
          y={cy + 20}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={32}
          fontWeight="bold"
          fill="#333"
        >
          {total}
        </Text>
      </>
    );
  };

  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ProductStat;
      return (
        <div className="flex items-center gap-2 bg-white border border-gray-200 p-2 shadow-lg rounded min-w-max w-32">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: payload[0].payload?.fill }}
          ></span>
          <p className="font-semibold text-sm text-gray-500">
            {data.category}: {data?.productsInStock}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="90%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          innerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey={
            dataType === "productStock" ? "productsInStock" : "productCount"
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <text x="100%" y="50%" textAnchor="middle" dominantBaseline="middle">
          <tspan
            x="50%"
            dy="-0.5em"
            fontSize="28"
            fontWeight="bold"
            fill="#333"
          >
            {total}
          </tspan>
          <tspan x="50%" dy="1.8em" fontSize="12" fill="#333">
            Total Products
          </tspan>
          <tspan x="50%" dy="1.2em" fontSize="12" fill="#333">
            {dataType === "productStock" ? "In Stock" : "Available"}
          </tspan>
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartWithPaddingAngle;
