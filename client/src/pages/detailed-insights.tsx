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
  const [secondaryParameter, setSecondaryParameter] = useState("none");

  const primaryLabel = PARAMETERS.find(p => p.value === primaryParameter)?.label || "";
  const secondaryLabel = secondaryParameter !== "none" ? PARAMETERS.find(p => p.value === secondaryParameter)?.label || "" : "";

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Drilldown</h2>
        <p className="text-slate-600">Hourly weather parameters with customizable data visualization</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-amber-500 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <h3 className="text-lg font-medium text-slate-900">{primaryLabel?.replace(/\s*\([^)]*\)/, '') || "Temperature"}</h3>
          </div>
          <Select value={primaryParameter} onValueChange={setPrimaryParameter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PARAMETERS.map((param) => (
                <SelectItem key={param.value} value={param.value}>
                  {param.label.replace(/\s*\([^)]*\)/, '')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="h-96">
          <DetailedChart 
            primaryParameter={primaryParameter}
            secondaryParameter={secondaryParameter === "none" ? undefined : secondaryParameter}
          />
        </div>
      </div>
    </div>
  );
}
