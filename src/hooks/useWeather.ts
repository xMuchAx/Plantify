import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

const OPENWEATHER_API_KEY = 'YOUR_OPENWEATHER_API_KEY';
const CACHE_DURATION_MS = 30 * 60 * 1000;

export interface WeatherData {
  temp: number;
  humidity: number;
  condition: string;
  description: string;
  isHeatAlert: boolean;
  isLoading: boolean;
  error: string | null;
}

let cachedWeather: { data: WeatherData; timestamp: number } | null = null;

export function useWeather(): WeatherData {
  const [weather, setWeather] = useState<WeatherData>({
    temp: 22,
    humidity: 50,
    condition: 'Clear',
    description: 'Beau temps',
    isHeatAlert: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchWeather() {
      if (cachedWeather && Date.now() - cachedWeather.timestamp < CACHE_DURATION_MS) {
        if (!cancelled) setWeather(cachedWeather.data);
        return;
      }

      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          if (!cancelled)
            setWeather((prev) => ({
              ...prev,
              isLoading: false,
              error: 'Localisation refusée',
            }));
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const { latitude, longitude } = location.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${OPENWEATHER_API_KEY}`;

        const response = await fetch(url);
        const json = await response.json();

        if (json.cod !== 200) {
          if (!cancelled)
            setWeather((prev) => ({
              ...prev,
              isLoading: false,
              error: 'Météo indisponible',
            }));
          return;
        }

        const data: WeatherData = {
          temp: Math.round(json.main.temp),
          humidity: json.main.humidity,
          condition: json.weather[0].main,
          description: json.weather[0].description,
          isHeatAlert: json.main.temp > 30,
          isLoading: false,
          error: null,
        };

        cachedWeather = { data, timestamp: Date.now() };
        if (!cancelled) setWeather(data);
      } catch {
        if (!cancelled)
          setWeather((prev) => ({
            ...prev,
            isLoading: false,
            error: 'Erreur météo',
          }));
      }
    }

    fetchWeather();
    return () => {
      cancelled = true;
    };
  }, []);

  return weather;
}
