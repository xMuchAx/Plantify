import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getSpeciesById } from '../data/species';

export type CareType = 'watering' | 'fertilizing' | 'repotting' | 'pruning';

export interface CareLog {
  id: string;
  type: CareType;
  date: string;
}

export interface UserPlant {
  id: string;
  speciesId: string;
  name: string;
  addedAt: string;
  careLogs: CareLog[];
}

interface PlantStore {
  plants: UserPlant[];
  activePlantId: string | null;
  addPlant: (speciesId: string, name: string) => void;
  removePlant: (id: string) => void;
  logCare: (plantId: string, type: CareType) => void;
  setActivePlant: (id: string) => void;
  getActivePlant: () => UserPlant | null;
  getStreak: (plantId: string) => number;
  getAgeInDays: (plantId: string) => number;
  getLastCare: (plantId: string, type: CareType) => string | null;
  getNextCareDate: (plantId: string, type: CareType, adjustedDays?: number) => string | null;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function daysBetween(dateA: string, dateB: string): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((new Date(dateB).getTime() - new Date(dateA).getTime()) / msPerDay);
}

export const usePlantStore = create<PlantStore>()(
  persist(
    (set, get) => ({
      plants: [],
      activePlantId: null,

      addPlant: (speciesId, name) => {
        const newPlant: UserPlant = {
          id: generateId(),
          speciesId,
          name,
          addedAt: new Date().toISOString(),
          careLogs: [],
        };
        set((state) => ({
          plants: [...state.plants, newPlant],
          activePlantId: state.activePlantId ?? newPlant.id,
        }));
      },

      removePlant: (id) => {
        set((state) => {
          const plants = state.plants.filter((p) => p.id !== id);
          const activePlantId =
            state.activePlantId === id ? (plants[0]?.id ?? null) : state.activePlantId;
          return { plants, activePlantId };
        });
      },

      logCare: (plantId, type) => {
        const log: CareLog = {
          id: generateId(),
          type,
          date: new Date().toISOString(),
        };
        set((state) => ({
          plants: state.plants.map((p) =>
            p.id === plantId ? { ...p, careLogs: [...p.careLogs, log] } : p
          ),
        }));
      },

      setActivePlant: (id) => set({ activePlantId: id }),

      getActivePlant: () => {
        const { plants, activePlantId } = get();
        return plants.find((p) => p.id === activePlantId) ?? plants[0] ?? null;
      },

      getStreak: (plantId) => {
        const plant = get().plants.find((p) => p.id === plantId);
        if (!plant) return 0;

        const wateringLogs = plant.careLogs
          .filter((l) => l.type === 'watering')
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        if (wateringLogs.length === 0) return 0;

        const species = getSpeciesById(plant.speciesId);
        const frequency = species?.wateringFrequencyDays ?? 7;
        const tolerance = frequency + 2;

        let streak = 1;
        for (let i = 0; i < wateringLogs.length - 1; i++) {
          const diff = daysBetween(wateringLogs[i + 1].date, wateringLogs[i].date);
          if (diff <= tolerance) {
            streak++;
          } else {
            break;
          }
        }
        return streak;
      },

      getAgeInDays: (plantId) => {
        const plant = get().plants.find((p) => p.id === plantId);
        if (!plant) return 0;
        return daysBetween(plant.addedAt, new Date().toISOString());
      },

      getLastCare: (plantId, type) => {
        const plant = get().plants.find((p) => p.id === plantId);
        if (!plant) return null;
        const logs = plant.careLogs
          .filter((l) => l.type === type)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return logs[0]?.date ?? null;
      },

      getNextCareDate: (plantId, type, adjustedDays) => {
        const { getLastCare } = get();
        const plant = get().plants.find((p) => p.id === plantId);
        if (!plant) return null;

        const species = getSpeciesById(plant.speciesId);
        if (!species) return null;

        const lastCare = getLastCare(plantId, type);
        const baseDate = lastCare ? new Date(lastCare) : new Date(plant.addedAt);

        let days: number;
        switch (type) {
          case 'watering':
            days = adjustedDays ?? species.wateringFrequencyDays;
            break;
          case 'fertilizing':
            days = species.fertilizingFrequencyDays;
            break;
          case 'repotting':
            days = species.repottingFrequencyDays;
            break;
          case 'pruning':
            days = 90;
            break;
        }

        if (days === 0) return null;

        const next = new Date(baseDate);
        next.setDate(next.getDate() + days);
        return next.toISOString();
      },
    }),
    {
      name: 'plantify-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
