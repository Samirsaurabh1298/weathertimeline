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
        primary: data.hourly[primaryParameter]?.[actualIndex] || 0,
        secondary: secondaryParameter ? data.hourly[secondaryParameter]?.[actualIndex] || 0 : null,
      };
    });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis 
          dataKey="time" 
          tick={{ fontSize: 11 }}
          interval="preserveStartEnd"
        />
        <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 12 }} />
        {secondaryParameter && (
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
        )}
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="primary"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ fill: "#3B82F6", strokeWidth: 2, r: 3 }}
          name="Primary Parameter"
        />
        {secondaryParameter && (
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="secondary"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ fill: "#10B981", strokeWidth: 2, r: 3 }}
            name="Secondary Parameter"
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
