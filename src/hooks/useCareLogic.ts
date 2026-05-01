import { getSpeciesById } from '../data/species';
import { usePlantStore } from '../store/usePlantStore';

export interface CareAlert {
  type: 'watering' | 'fertilizing' | 'repotting' | 'heat' | 'shade';
  message: string;
  urgency: 'low' | 'medium' | 'high';
}

export function getAdjustedWateringDays(
  baseDays: number,
  temp: number,
  humidity: number
): number {
  let adjusted = baseDays;
  if (temp > 28) {
    adjusted = Math.max(1, adjusted - Math.floor((temp - 28) / 2));
  }
  if (humidity > 75) {
    adjusted = Math.round(adjusted * 1.3);
  }
  return adjusted;
}

export function getGrowthStage(ageInDays: number): 1 | 2 | 3 | 4 | 5 {
  if (ageInDays < 7) return 1;
  if (ageInDays < 30) return 2;
  if (ageInDays < 90) return 3;
  if (ageInDays < 180) return 4;
  return 5;
}

export function useCareAlerts(
  plantId: string,
  temp: number,
  humidity: number
): CareAlert[] {
  const { plants, getNextCareDate, getLastCare } = usePlantStore();
  const plant = plants.find((p) => p.id === plantId);
  if (!plant) return [];

  const species = getSpeciesById(plant.speciesId);
  if (!species) return [];

  const alerts: CareAlert[] = [];
  const now = new Date();

  const adjustedWatering = getAdjustedWateringDays(
    species.wateringFrequencyDays,
    temp,
    humidity
  );
  const nextWatering = getNextCareDate(plantId, 'watering', adjustedWatering);
  if (nextWatering) {
    const daysUntil = Math.ceil(
      (new Date(nextWatering).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysUntil <= 0) {
      alerts.push({
        type: 'watering',
        message: `${plant.name} a soif maintenant !`,
        urgency: 'high',
      });
    } else if (daysUntil <= 1) {
      alerts.push({
        type: 'watering',
        message: `Arrose ${plant.name} demain`,
        urgency: 'medium',
      });
    }
  }

  if (temp > species.heatAlertTemp) {
    if (species.sunlight === 'shade' || species.sunlight === 'partial') {
      alerts.push({
        type: 'shade',
        message: `${temp}°C — Mets ${plant.name} à l'ombre`,
        urgency: 'high',
      });
    } else {
      alerts.push({
        type: 'heat',
        message: `${temp}°C — Surveille l'hydratation de ${plant.name}`,
        urgency: 'medium',
      });
    }
  }

  const nextFertilizing = getNextCareDate(plantId, 'fertilizing');
  if (nextFertilizing && species.fertilizingFrequencyDays > 0) {
    const daysUntil = Math.ceil(
      (new Date(nextFertilizing).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysUntil <= 0) {
      alerts.push({
        type: 'fertilizing',
        message: `Engrais pour ${plant.name} !`,
        urgency: 'low',
      });
    }
  }

  const lastRepotting = getLastCare(plantId, 'repotting');
  const nextRepotting = getNextCareDate(plantId, 'repotting');
  if (nextRepotting && species.repottingFrequencyDays > 0) {
    const daysUntil = Math.ceil(
      (new Date(nextRepotting).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysUntil <= 0 && lastRepotting) {
      alerts.push({
        type: 'repotting',
        message: `${plant.name} a besoin d'un nouveau pot`,
        urgency: 'low',
      });
    }
  }

  return alerts;
}

export function formatNextCareDate(isoDate: string | null): string {
  if (!isoDate) return '—';
  const now = new Date();
  const next = new Date(isoDate);
  const daysUntil = Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntil <= 0) return 'Maintenant';
  if (daysUntil === 1) return 'Demain';
  if (daysUntil <= 7) return `Dans ${daysUntil}j`;
  return next.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export function formatDate(isoDate: string | null): string {
  if (!isoDate) return 'Jamais';
  return new Date(isoDate).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  });
}
