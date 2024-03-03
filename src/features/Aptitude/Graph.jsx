import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Group A', value: 20 },
//   { name: 'Group B', value: 3 },
//   { name: 'Group c', value: 2 },
// ];

const COLORS = ['#00c2a8', '#ff0000', '#e3fffb'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#000000"
      fontSize={25}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {percent !== 0 ? `${(percent * 100).toFixed(0)}%` : ''}
    </text>
  );
};

export default class Graph extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={1000} height={1000}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={135}
            dataKey="value"
            color="#000000"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
