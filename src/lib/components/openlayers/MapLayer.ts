import { interface_layerConfig } from '@nsa/lib/utils/enums/interface_mapLayerConfig';
import { Keys } from '@nsa/lib/utils/enums/keys';
import { LayerTypes } from '@nsa/lib/utils/enums/layers';

import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import { BingMaps, OSM } from 'ol/source';

export const layerList: interface_layerConfig[] = [
  {
    // Bing Aerial
    title: LayerTypes.BING_AERIAL,
    layer: new TileLayer({
      preload: Infinity,
      source: new BingMaps({
        key: Keys.BING_API_KEY,
        imagerySet: LayerTypes.BING_AERIAL,
        maxZoom: 19,
      }),

      visible: false,
    }),
  },

  {
    // Bing Aerial with Labels
    title: LayerTypes.BING_AERIAL_WITH_LABELS,
    layer: new TileLayer({
      preload: Infinity,
      source: new BingMaps({
        key: Keys.BING_API_KEY,
        imagerySet: LayerTypes.BING_AERIAL_WITH_LABELS,
        maxZoom: 19,
      }),

      visible: false,
    }),
  },

  {
    // Open street maps
    title: LayerTypes.OSM,
    layer: new TileLayer({
      source: new OSM(),
      // default map style
      visible: true,
    }),
  },
];

export const layerListWithMarker: interface_layerConfig[] = [
  {
    // Bing Aerial
    title: LayerTypes.BING_AERIAL,
    layer: new TileLayer({
      preload: Infinity,
      source: new BingMaps({
        key: Keys.BING_API_KEY,
        imagerySet: LayerTypes.BING_AERIAL,
        maxZoom: 19,
      }),

      visible: false,
    }),
  },

  {
    // Bing Aerial with Labels
    title: LayerTypes.BING_AERIAL_WITH_LABELS,
    layer: new TileLayer({
      preload: Infinity,
      source: new BingMaps({
        key: Keys.BING_API_KEY,
        imagerySet: LayerTypes.BING_AERIAL_WITH_LABELS,
        maxZoom: 19,
      }),

      visible: false,
    }),
  },

  {
    // Open street maps
    title: LayerTypes.OSM,
    layer: new TileLayer({
      source: new OSM(),
      // default map style
      visible: true,
    }),
  },
];

// get the layers from the layerList
// to be used in the layer group
const layers = layerList.map((layer) => layer.layer);

const layersWithMarker = layerListWithMarker.map((layer) => layer.layer);

// create the layer group
export const mapStyles = new LayerGroup({
  layers,
});

// layer group with markers
export const mapStylesWithMarkers = new LayerGroup({
  layers: layersWithMarker,
});
