<template>
  <div id="map" ref="rootmap"></div>
</template>
<script>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { defaults as defaultControls, Attribution } from "ol/control";
export default {
  data: () => ({
    map: null,
    attribution: null
  }),
  mounted() {
    this.attribution = new Attribution({
      collapsible: false
    });
    this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      controls: defaultControls({ attribution: false }).extend([
        this.attribution
      ]),
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
    window.addEventListener("resize", this.checkSize);
    this.checkSize();
  },
  methods: {
    checkSize() {
      var small = this.map.getSize()[0] < 600;
      this.attribution.setCollapsible(small);
      this.attribution.setCollapsed(small);
    }
  }
};
</script>
<style>
#map {
  height: 100%;
}
/* .ol-attribution,
.ol-zoom {
  display: none;
} */
</style>


