import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#22c55e", "#334155"];

export default function ScoreChart({ score }) {
  const data = [
    { name: "Match", value: score },
    { name: "Gap", value: 100 - score }
  ];

  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
    </PieChart>
  );
}
