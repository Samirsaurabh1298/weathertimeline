import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DetailedChart from "@/components/charts/detailed-chart";

const PARAMETERS = [
  { value: "temperature_2m", label: "Temperature (°C)" },
  { value: "relative_humidity_2m", label: "Relative Humidity (%)" },
  { value: "apparent_temperature", label: "Apparent Temperature (°C)" },
  { value: "precipitation", label: "Precipitation (mm)" },
  { value: "sea_level_pressure", label: "Sea Level Pressure (hPa)" },
  { value: "wind_speed_10m", label: "Wind Speed 10m (km/h)" },
];

export default function DetailedInsights() {
  const [primaryParameter, setPrimaryParameter] = useState("temperature_2m");
  const [secondaryParameter, setSecondaryParameter] = useState("");

  const primaryLabel = PARAMETERS.find(p => p.value === primaryParameter)?.label || "";
  const secondaryLabel = PARAMETERS.find(p => p.value === secondaryParameter)?.label || "";

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Detailed Insights</h2>
        <p className="text-slate-600">Hourly weather parameters with customizable data visualization</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Parameters (Max 2)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Primary Parameter:</label>
              <Select value={primaryParameter} onValueChange={setPrimaryParameter}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PARAMETERS.map((param) => (
                    <SelectItem key={param.value} value={param.value}>
                      {param.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Secondary Parameter (Optional):</label>
              <Select value={secondaryParameter} onValueChange={setSecondaryParameter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {PARAMETERS.filter(p => p.value !== primaryParameter).map((param) => (
                    <SelectItem key={param.value} value={param.value}>
                      {param.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Parameter Trends</CardTitle>
            <div className="flex space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-slate-600">{primaryLabel}</span>
              </div>
              {secondaryParameter && (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600">{secondaryLabel}</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <DetailedChart 
              primaryParameter={primaryParameter}
              secondaryParameter={secondaryParameter}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
