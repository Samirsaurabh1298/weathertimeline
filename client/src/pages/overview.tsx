import TemperatureChart from "@/components/charts/temperature-chart";
import PrecipitationChart from "@/components/charts/precipitation-chart";
import WindSpeedChart from "@/components/charts/wind-speed-chart";

export default function Overview() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Overview</h2>
        <p className="text-slate-600">Historical weather data for the selected period and location</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-6">
        <TemperatureChart />
        <PrecipitationChart />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <WindSpeedChart />
      </div>
    </div>
  );
}
