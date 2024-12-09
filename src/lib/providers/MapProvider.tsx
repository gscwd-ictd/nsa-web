'use client';

import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import {
  createContext,
  Dispatch,
  FunctionComponent,
  MutableRefObject,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react';

type MapState = {
  map: Map | null;
  setMap: Dispatch<SetStateAction<Map | null>>;
  mapRef: RefObject<HTMLMapElement>;
  markerLayerRef: MutableRefObject<VectorLayer | null>;
};

const MapContext = createContext({} as MapState);

export const MapProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [map, setMap] = useState<Map | null>(null);
  const mapRef = useRef<HTMLMapElement>(null);
  const markerLayerRef = useRef<VectorLayer | null>(null);

  return <MapContext.Provider value={{ map, setMap, mapRef, markerLayerRef }}>{children}</MapContext.Provider>;
};

// map hook
export const useMap = () => {
  const { map, mapRef, setMap, markerLayerRef } = useContext(MapContext);
  return { map, setMap, mapRef, markerLayerRef };
};
