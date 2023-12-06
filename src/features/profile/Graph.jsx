import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Contest - 01',
    DSA: 4000,
    Aptitude: 2400,
  },
  {
    name: 'Contest - 02',
    DSA: 3000,
    Aptitude: 1398,
  },
  {
    name: 'Contest - 03',
    DSA: 2000,
    Aptitude: 9800,
  },
  {
    name: 'Contest - 04',
    DSA: 2780,
    Aptitude: 3908,
  },
];

console.log((props) => props.theme.colors.colorTritary);

export default class Graph extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  render() {
    return (
      <ResponsiveContainer width="70%" height="50%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            fill="#7c4fff"
            fillOpacity={0.03}
            stroke="rgba(197, 184, 229, 0.5)"
          />
          <XAxis dataKey="name" stroke="rgba(197, 184, 229, 0.7)" />
          <YAxis stroke="rgba(197, 184, 229, 0.7)" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#080315',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="DSA"
            stroke="#008cff"
            activeDot={{ r: 6 }}
            strokeWidth={2.5}
          />
          <Line
            type="monotone"
            dataKey="Aptitude"
            stroke="#00c2a8"
            strokeWidth={2.5}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
