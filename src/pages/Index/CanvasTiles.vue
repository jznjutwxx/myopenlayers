<template>
  <div id="map" ref="rootmap"></div>
</template>
<script>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM, TileDebug } from "ol/source";
import { fromLonLat } from "ol/proj";
export default {
  data: () => ({
    map: null
  }),
  mounted() {
    var osmSource=new OSM();
    this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: osmSource
        }),
        new TileLayer({
          source: new TileDebug({
              projection:'EPSG:3857',
              tileGrid:osmSource.getTileGrid()
          })
        })
      ],
      view: new View({
          center:fromLonLat([121.234,31.110]),
          zoom:10
      })
    });
  }
};
</script>
<style>
#map {
  height: 100%;
}
</style>


