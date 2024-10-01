import Map from 'ol/Map';
import View from 'ol/View';
import { ZoomSlider } from 'ol/control';
import Zoom from 'ol/control/Zoom';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { mapViewExtent } from '@nsa/lib/utils/enums/mapViewExtent';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { fromLonLat, toLonLat } from 'ol/proj';
import markerIcon from '../../../../../public/images/map-marker.svg';
import { useMapStore } from '@nsa/lib/zustand/useMapStore';
import { useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { mapStyles } from '../../openlayers/MapLayer';
// import { BsPlus } from 'react-icons/bs';
// import { HiMinusSmall } from 'react-icons/hi2';

const MapComponent: FunctionComponent = () => {
  // setMapRef to enable the map references to be used in other components
  const mapRef = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<Map | null>(null);

  const viewport = useMapStore((state) => state.viewport);
  const setMapRef = useMapStore((state) => state.setMapRef);

  const setCoordinates = useApplicationFormStore((state) => state.setCoordinates);

  // initialize the map
  useEffect(() => {
    // marker

    const myMap = new Map({
      target: mapRef.current!,
      layers: [mapStyles],
      view: new View({
        center: viewport.center,
        zoom: viewport.zoom,
        minZoom: viewport.minZoom,
      }),
      controls: [],
    });

    const marker = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point(fromLonLat([13933794.669609006, 682557.8280949236])),
          }),
        ],
      }),
      style: new Style({
        image: new Icon({
          src: markerIcon.src!,
        }),
      }),
    });

    myMap.addLayer(marker);

    myMap.addControl(new Zoom({ target: 'zoom-btn' }));
    myMap.addControl(new ZoomSlider({ target: 'slider' }));

    const view = myMap.getView();

    myMap.on('pointerdrag', (e) => {
      // console.log(e.coordinate);

      setCoordinates(toLonLat(e.coordinate));
    });

    myMap.on('click', (e) => {
      // console.log(e.coordinate);

      setCoordinates(toLonLat(e.coordinate));
    });

    // set the map ref in the global store
    // let the map to be used in other components
    setMapRef(myMap);

    // set the map state
    setMap(map);

    useMapStore.getState().setView(view);

    // on component unmount, remove the map references to avoid unexpected behavior
    return () => {
      // remove the map when the component is unmounted
      myMap.setTarget(undefined);
    };
  }, [mapRef, viewport, mapViewExtent]);

  return (
    <>
      <div ref={mapRef} className=" inset-0 overflow-hidden h-full w-full rounded border relative " />
      <div className="absolute top-2 right-10">
        <div className="" id="zoom-btn" />
        <div className="" id="slider" />
      </div>

      {/* <div className="absolute top-2 left-2 flex flex-col gap-1">
        <button
          id="zoom-btn"
          className=" bg-gray-100 hover:ring-1 hover:ring-gray-800 text-gray-600 hover:text-gray-800 rounded"
          type="button"
          onClick={() => {
            mapRefCurrent?.on('click', (e) => e.map.getView().setZoom(mapRefCurrent.getView().getZoom()! + 1));
          }}
        >
          <BsPlus className="w-5 h-5 " />
        </button>

        <button
          className=" bg-gray-100 hover:ring-1 hover:ring-gray-800 text-gray-600 hover:text-gray-800 rounded"
          id="zoom-btn"
          type="button"
          onClick={() => {
            mapRefCurrent?.on('click', (e) => e.map.getView().setZoom(mapRefCurrent.getView().getZoom()! - 1));
          }}
        >
          <HiMinusSmall className="w-5 h-5 " />
        </button>
      </div> */}
    </>
  );
};

export default MapComponent;
