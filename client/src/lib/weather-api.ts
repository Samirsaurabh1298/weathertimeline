import { format } from "date-fns";

export interface WeatherDataResponse {
  daily?: {
    time: string[];
    temperature_2m_mean: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    apparent_temperature: number[];
    precipitation: number[];
    surface_pressure: number[];
    wind_speed_10m: number[];
  };
}

export async function fetchWeatherData(
  latitude: number,
  longitude: number,
  startDate: Date,
  endDate: Date,
  type: 'daily' | 'hourly'
): Promise<WeatherDataResponse> {
  const baseUrl = "https://archive-api.open-meteo.com/v1/archive";
  
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    start_date: format(startDate, "yyyy-MM-dd"),
    end_date: format(endDate, "yyyy-MM-dd"),
    timezone: "auto",
  });

  if (type === 'daily') {
    params.append('daily', [
      'temperature_2m_mean',
      'temperature_2m_max', 
      'temperature_2m_min',
      'precipitation_sum',
      'wind_speed_10m_max'
    ].join(','));
  } else {
    params.append('hourly', [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation',
      'surface_pressure',
      'wind_speed_10m'
    ].join(','));
  }

  const response = await fetch(`${baseUrl}?${params}`);
  
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
