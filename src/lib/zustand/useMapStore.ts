import { Map, View } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { create } from 'zustand';
import { Coordinate } from 'ol/coordinate';
import { LayerTypes } from '../utils/enums/layers';

type MapStore = {
  // Map viewport configuration
  viewport: {
    center: [number, number];
    zoom: number;
    minZoom?: number;
  };
  setViewport: (viewport: MapStore['viewport']) => void;

  // Reference to the OpenLayers Map instance
  mapRef: Map | null;
  setMapRef: (map: Map | null) => void;

  // Vectore source for features
  vectorSource: VectorSource | null;
  setVectorSource: (source: VectorSource | null) => void;

  // Vector layer containing the vectorSource
  vectorLayer: VectorLayer<VectorSource> | null;
  setVectorLayer: (layer: VectorLayer<VectorSource> | null) => void;

  // Map style
  mapStyle: LayerTypes;
  setMapStyle: (mapStyle: LayerTypes) => void;

  view: View | null;
  setView: (view: View | null) => void;

  // is inside turf
  isInside: boolean;
  setIsInside: (isInside: boolean) => void;

  // loading is inside
  isInsideLoading: boolean;
  setIsInsideLoading: (isInsideLoading: boolean) => void;

  mapview: { center: Coordinate; zoom: number; resolution?: number };
  setMapview: (mapview: MapStore['mapview']) => void;
};

export const useMapStore = create<MapStore>((set) => ({
  mapview: {
    center: [13934003.453171618, 682500.5003237098],
    // center: [125.171, 6.1164],
    // center: [740508.545887596, 676825.682834923],
    zoom: 11,
  },
  setMapview: (mapview) => set({ mapview }),

  // Initial viewport configuration
  viewport: {
    center: [13934003.453171618, 682500.5003237098],
    // center: [125.171, 6.1164],
    // center: [740508.545887596, 676825.682834923],
    zoom: 11,
    minZoom: 15,
  },

  setViewport: (viewport) => set({ viewport }),

  // is inside
  isInside: false,
  setIsInside: (isInside) => set({ isInside }),

  // loading is inside
  isInsideLoading: false,
  setIsInsideLoading: (isInsideLoading) => set({ isInsideLoading }),

  // Map reference
  mapRef: null,
  setMapRef: (map) => set({ mapRef: map }),

  // Vector source
  vectorSource: null,
  setVectorSource: (source) => set({ vectorSource: source }),

  // Vector layer
  vectorLayer: null,
  setVectorLayer: (layer) => set({ vectorLayer: layer }),

  // Map style (default is OSM)
  mapStyle: LayerTypes.OSM,
  setMapStyle: (style) => set({ mapStyle: style }),

  view: null,
  setView: (view) => set({ view }),
}));
