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
import {
  colorPrimary,
  colorPrimaryLightest,
  colorTritary,
} from '../../styles/colors';

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
  {
    name: 'Contest - 05',
    DSA: 1890,
    Aptitude: 4800,
  },
  {
    name: 'Contest - 06',
    DSA: 2390,
    Aptitude: 3800,
  },
  {
    name: 'Contest - 07',
    DSA: 3490,
    Aptitude: 4300,
  },
];

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
            fill={colorPrimaryLightest}
            fillOpacity={0.05}
          />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="DSA"
            stroke={colorPrimary}
            activeDot={{ r: 6 }}
            strokeWidth={2.5}
          />
          <Line
            type="monotone"
            dataKey="Aptitude"
            stroke={colorTritary}
            strokeWidth={2.5}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
