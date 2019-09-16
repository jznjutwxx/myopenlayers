<template>
  <div>
    <div id="map" ref="rootmap"></div>
    <form>
      <label>radius size</label>
      <input id="radius" type="range" min="1" max="50" step="1" value="5">
      <label>blur size</label>
      <input id="blur" type="range" min="1" max="50" step="1" value="15">
    </form>
  </div>
</template>
<script>
import { Map, View } from "ol";
import {Heatmap as HeatmapLayer,Tile as TileLayer} from "ol/layer";
import KML from "ol/format/KML";
import VectorSource from 'ol/source/Vector'
import Stamen from 'ol/source/Stamen'

export default {
  data: () => ({
    map: null
  }),
  mounted() {
      var blur = document.getElementById('blur');
      var radius = document.getElementById('radius');
        var vector=new HeatmapLayer({
            source:new VectorSource({
                url:'../../assets/2012_Earthquakes_Mag5.kml',
                format:new KML({
                  extractStyles:false
                })
            }),
            blur:parseInt(blur.value,10),
            radius:parseInt(radius.value,10)
        });
        vector.getSource().on('addfeature',function(event){
          // console.log(event);
          var name=event.feature.get('name');
          var magnitude=parseFloat(name.substr(2));
          event.feature.set('weight',magnitude-5);
        });

        var raster=new TileLayer({
          source:new Stamen({
            layer:'toner'
          })
        });

    this.map = new Map({
      target: "map",
      layers: [raster,vector],
      view: new View({
        center:[0,0],
        zoom:2
      })
    });

    blur.addEventListener('input',function(){
      vector.setBlur(parseInt(blur.value,10));
    });
    radius.addEventListener('input',function(){
      vector.setRadius(parseInt(radius.value,10));
    });

  }
};
</script>
<style>
#map {
  height: 100%;
}
</style>


