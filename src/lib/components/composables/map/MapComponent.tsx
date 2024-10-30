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
import markerIcon from '../../../../../public/images/map-marker.svg';
import { useMapStore } from '@nsa/lib/zustand/useMapStore';
import { useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { mapStyles } from '../../openlayers/MapLayer';
import * as turf from '@turf/turf';

const MapComponent: FunctionComponent = () => {
  // setMapRef to enable the map references to be used in other components
  const mapRef = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<Map | null>(null);
  const viewport = useMapStore((state) => state.viewport);
  const setMapRef = useMapStore((state) => state.setMapRef);
  const setIsInside = useMapStore((state) => state.setIsInside);
  const setIsInsideLoading = useMapStore((state) => state.setIsInsideLoading);

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
        // projection: 'EPSG:4326',
      }),
      controls: [],
    });

    // const marker = new VectorLayer({
    //   source: new VectorSource({
    //     features: [
    //       new Feature({
    //         geometry: new Point([13933794.669609006, 682557.8280949236]),
    //       }),
    //     ],
    //   }),
    //   style: new Style({
    //     image: new Icon({
    //       src: markerIcon.src!,
    //     }),
    //   }),
    // });

    // myMap.addLayer(marker);

    myMap.addControl(new Zoom({ target: 'zoom-btn' }));
    myMap.addControl(new ZoomSlider({ target: 'slider' }));

    const view = myMap.getView();

    myMap.on('pointerdrag', (e) => {
      // console.log(e.coordinate);

      setCoordinates(e.coordinate);
    });

    myMap.on('click', (e) => {
      // console.log(e.coordinate);

      setCoordinates(e.coordinate);
      setIsInsideLoading(true);
      setIsInside(
        turf.booleanPointInPolygon(turf.point(e.coordinate), {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [13934032.082095193, 683374.0510383595],
                [13934010.115593867, 682476.7247832424],
                [13935148.712579172, 682473.0622270991],
                [13935141.390412064, 683366.7259260728],
                [13934032.082095193, 683374.0510383595],
              ],
              [
                [13932794.270388672, 683960.6110153616],
                [13932799.101217384, 683375.8456269813],
                [13934021.300881404, 683366.1800833717],
                [13934016.470052693, 683975.109330774],
                [13932794.270388672, 683960.6110153616],
              ],
              [
                [13931204.751450561, 682309.903361699],
                [13931461.687651351, 681607.9806466862],
                [13931596.814313615, 681582.3428681765],
                [13932114.023262305, 681398.2170043347],
                [13932312.053715631, 681428.5161971187],
                [13932321.372795789, 681426.1854899814],
                [13932342.34072614, 681416.8626614325],
                [13932370.29796661, 681365.5871044133],
                [13932519.403249115, 681393.5555900602],
                [13932666.178761581, 681379.5713472367],
                [13932892.166455379, 681484.4531684124],
                [13932931.772546044, 681482.1224612752],
                [13932854.890134752, 681659.2562037054],
                [13932345.333930688, 682380.5763336932],
                [13931258.228046408, 682380.5763336932],
                [13931205.49529829, 682311.5903877123],
                [13931204.751450561, 682309.903361699],
              ],
            ],
          ],
        })
      );
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
        <div className="zoom-btn" id="zoom-btn" />
        <div className="slider" id="slider" />
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
