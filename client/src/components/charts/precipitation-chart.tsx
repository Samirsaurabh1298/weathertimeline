import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain } from "lucide-react";
import { useLocation } from "wouter";
import { useWeatherData } from "@/hooks/use-weather-data";

export default function PrecipitationChart() {
  const [, setLocation] = useLocation();
  const { data, isLoading, error } = useWeatherData('daily');

  if (isLoading) {
    return (
      <Card className="chart-container">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CloudRain className="w-5 h-5 text-blue-500" />
              <CardTitle>Precipitation</CardTitle>
            </div>
            <div className="text-sm text-slate-500">mm</div>
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
              <CloudRain className="w-5 h-5 text-blue-500" />
              <CardTitle>Precipitation</CardTitle>
            </div>
            <div className="text-sm text-slate-500">mm</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-red-500">
            Error loading precipitation data: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data?.daily?.time?.map((date: string, index: number) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    precipitation: data.daily.precipitation_sum[index] || 0,
  })) || [];

  const handleClick = () => {
    setLocation("/");
  };

  return (
    <Card className="chart-container" onClick={handleClick}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CloudRain className="w-5 h-5 text-blue-500" />
            <CardTitle>Precipitation</CardTitle>
          </div>
          <div className="text-sm text-slate-500">mm</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Bar dataKey="precipitation" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
