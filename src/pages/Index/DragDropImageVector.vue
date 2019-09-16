<template>
  <div>
    <div id="map"></div>
    <div id="info"></div>
  </div>
</template>
<script>
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { BingMaps, OSM, Vector as VectorSource } from "ol/source";
import { GPX, GeoJSON, IGC, KML, TopoJSON } from "ol/format";
import { defaults as defaultInteractions, DragAndDrop } from "ol/interaction";

export default {
  data: () => ({
    map: null
  }),
  mounted() {
    var _this = this;
    var dragAndDropInteraction = new DragAndDrop({
      formatConstructors: {
        GPX,
        GeoJSON,
        IGC,
        KML,
        TopoJSON
      }
    });
    this.map = new Map({
      target: "map",
      interactions: defaultInteractions().extend([dragAndDropInteraction]),
      layers: [
        new TileLayer({
          source: new BingMaps({
            imagerySet: "Aerial",
            key: "Your Bing Maps Key from http://www.bingmapsportal.com/ here"
          })
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 4
      })
    });
    dragAndDropInteraction.on("addfeatures", function(event) {
      var vectorSource = new VectorSource({
        features: event.features
      });
      _this.map.addLayer(
        new VectorLayer({
          renderMode: "image",
          source: vectorSource
        })
      );
      _this.map.getView().fit(vectorSource.getExtent());
    });
    this.map.on("pointermove", function(evt) {
      if (evt.dragging) {
        return;
      }
      var pixel = _this.map.getEventPixel(evt.originalEvent);
      _this.displayFeatureInfo(pixel);
    });
    this.map.on("click", function(evt) {
      _this.displayFeatureInfo(evt.pixel);
    });
  },
  methods: {
    displayFeatureInfo(pixel) {
      var features = [];
      this.map.forEachFeatureAtPixel(pixel, function(feature) {
        features.push(feature);
      });
      if (features.length > 0) {
        var info = [];
        var i, ii;
        for (i = 0, ii = features.length; i < ii; ++i) {
          info.push(features[i].get("name"));
        }
        document.getElementById("info").innerHTML = info.join(", ") || "&nbsp";
      } else {
        document.getElementById("info").innerHTML = "&nbsp;";
      }
    }
  }
};
</script>
<style>
#map {
  height: 100%;
}
</style>


