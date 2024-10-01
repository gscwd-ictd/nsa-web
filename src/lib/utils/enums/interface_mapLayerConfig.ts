import TileLayer from 'ol/layer/Tile';
import TileSource from 'ol/source/Tile';
import { LayerTypes } from '../enums/layers';

// define the layer configuration
export interface interface_layerConfig {
  title: LayerTypes;
  layer: TileLayer<TileSource>;
}
