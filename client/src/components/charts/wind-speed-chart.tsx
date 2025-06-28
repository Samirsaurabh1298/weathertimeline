import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind } from "lucide-react";
import { useLocation } from "wouter";
import { useWeatherData } from "@/hooks/use-weather-data";

export default function WindSpeedChart() {
  const [, setLocation] = useLocation();
  const { data, isLoading, error } = useWeatherData('daily');

  if (isLoading) {
    return (
      <Card className="chart-container">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wind className="w-5 h-5 text-emerald-500" />
              <CardTitle>Wind Speed</CardTitle>
            </div>
            <div className="text-sm text-slate-500">km/h</div>
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
              <Wind className="w-5 h-5 text-emerald-500" />
              <CardTitle>Wind Speed</CardTitle>
            </div>
            <div className="text-sm text-slate-500">km/h</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-red-500">
            Error loading wind speed data: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data?.daily?.time?.map((date: string, index: number) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    windSpeed: data.daily.wind_speed_10m_max[index] || 0,
  })) || [];

  const handleClick = () => {
    setLocation("/detailed-insights");
  };

  return (
    <Card className="chart-container" onClick={handleClick}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wind className="w-5 h-5 text-emerald-500" />
            <CardTitle>Wind Speed</CardTitle>
          </div>
          <div className="text-sm text-slate-500">km/h</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="windSpeed"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                fill="rgba(16, 185, 129, 0.1)"
                fillOpacity={0.6}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
