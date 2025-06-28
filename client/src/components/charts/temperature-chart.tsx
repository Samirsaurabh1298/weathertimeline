import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer } from "lucide-react";
import { useLocation } from "wouter";
import { useWeatherData } from "@/hooks/use-weather-data";

export default function TemperatureChart() {
  const [, setLocation] = useLocation();
  const { data, isLoading, error } = useWeatherData('daily');

  if (isLoading) {
    return (
      <Card className="chart-container">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-5 h-5 text-amber-500" />
              <CardTitle>Temperature</CardTitle>
            </div>
            <div className="text-sm text-slate-500">°C</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="chart-container">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-5 h-5 text-amber-500" />
              <CardTitle>Temperature</CardTitle>
            </div>
            <div className="text-sm text-slate-500">°C</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-red-500">
            Error loading temperature data: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data?.daily?.time?.map((date: string, index: number) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    avg: data.daily.temperature_2m_mean[index],
    max: data.daily.temperature_2m_max[index],
    min: data.daily.temperature_2m_min[index],
  })) || [];

  const handleClick = () => {
    setLocation("/");
  };

  return (
    <Card className="chart-container" onClick={handleClick}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Thermometer className="w-5 h-5 text-amber-500" />
            <CardTitle>Temperature</CardTitle>
          </div>
          <div className="text-sm text-slate-500">°C</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="avg"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
                name="Average"
              />
              <Line
                type="monotone"
                dataKey="max"
                stroke="#EF4444"
                strokeWidth={1}
                dot={{ fill: "#EF4444", strokeWidth: 2, r: 3 }}
                name="Max"
              />
              <Line
                type="monotone"
                dataKey="min"
                stroke="#3B82F6"
                strokeWidth={1}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 3 }}
                name="Min"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
