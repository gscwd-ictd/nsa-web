import { MapStudio } from '@nsa/core/mapStudio';
import { create } from 'zustand';

type MapManagerState = {
  mapManager: MapStudio | undefined;
  setMapManager: (mapManager: MapStudio | undefined) => void;
};

export const useMapManagerStore = create<MapManagerState>((set) => ({
  mapManager: undefined,
  setMapManager: (mapManager) => set({ mapManager }),
}));
