import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { useWeatherData } from "@/hooks/use-weather-data";

interface DetailedChartProps {
  primaryParameter: string;
  secondaryParameter?: string;
}

export default function DetailedChart({ primaryParameter, secondaryParameter }: DetailedChartProps) {
  const { data, isLoading, error } = useWeatherData('hourly');

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-500">
        Error loading detailed data: {error.message}
      </div>
    );
  }

  if (!data?.hourly) {
    return (
      <div className="h-full flex items-center justify-center text-slate-500">
        No data available
      </div>
    );
  }

  // Sample every 6 hours to reduce data points
  const interval = 6;
  const chartData = data.hourly.time
    .filter((_: any, index: number) => index % interval === 0)
    .map((time: string, index: number) => {
      const actualIndex = index * interval;
      const date = new Date(time);
      return {
        time: date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          hour: 'numeric'
        }),
        primary: (data.hourly as any)[primaryParameter]?.[actualIndex] || 0,
        secondary: secondaryParameter ? (data.hourly as any)[secondaryParameter]?.[actualIndex] || 0 : null,
      };
    });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
        <XAxis 
          dataKey="time" 
          tick={{ fontSize: 12, fill: '#64748B' }}
          tickLine={{ stroke: '#CBD5E1' }}
          axisLine={{ stroke: '#CBD5E1' }}
          interval="preserveStartEnd"
        />
        <YAxis 
          yAxisId="left" 
          orientation="left" 
          tick={{ fontSize: 12, fill: '#64748B' }}
          tickLine={{ stroke: '#CBD5E1' }}
          axisLine={{ stroke: '#CBD5E1' }}
          domain={['dataMin - 2', 'dataMax + 2']}
        />
        {secondaryParameter && (
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            tick={{ fontSize: 12, fill: '#64748B' }}
            tickLine={{ stroke: '#CBD5E1' }}
            axisLine={{ stroke: '#CBD5E1' }}
            domain={['dataMin - 2', 'dataMax + 2']}
          />
        )}
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="primary"
          stroke="#F59E0B"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6, fill: "#F59E0B" }}
        />
        {secondaryParameter && (
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="secondary"
            stroke="#10B981"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: "#10B981" }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
