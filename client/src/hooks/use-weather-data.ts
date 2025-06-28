import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData, type WeatherDataResponse } from "@/lib/weather-api";
import { useAppContext } from "@/contexts/AppContext";
import { LOCATIONS } from "@/lib/constants";

export function useWeatherData(type: 'daily' | 'hourly') {
  const { dateRange, location } = useAppContext();
  const locationData = LOCATIONS[location as keyof typeof LOCATIONS];

  return useQuery<WeatherDataResponse, Error>({
    queryKey: ['weather', type, location, dateRange.from.toISOString(), dateRange.to.toISOString()],
    queryFn: () => fetchWeatherData(
      locationData.lat,
      locationData.lon,
      dateRange.from,
      dateRange.to,
      type
    ),
    enabled: !!locationData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
