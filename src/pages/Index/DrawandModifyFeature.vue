<template>
  <div>
    <div id="map"></div>
    <form class="form-inline">
      <label>Geometry type &nbsp;</label>
      <select id="type">
        <option value="Point">Point</option>
        <option value="LineString">LineString</option>
        <option value="Polygon">Polygon</option>
        <option value="Circle">Circle</option>
      </select>
    </form>
  </div>
</template>
<script>
import { Map, View } from "ol";
import {Tile as TileLayer,Vector as VectorLayer} from "ol/layer";
import {Draw,Modify,Snap} from 'ol/interaction'
import {OSM,Vector as VectorSource} from "ol/source";
import {Circle as CircleStyle,Fill,Stroke,Style} from 'ol/style'
export default {
  data: () => ({
    map: null,
    draw:null,
    snap:null,
  }),
  mounted() {
    var raster=new TileLayer({
        source:new OSM()
    });
    var source=new VectorSource();
    var vector=new VectorLayer({
        source:source,
        style:new Style({
            fill:new Fill({
                color:'rgba(255, 255, 255, 0.2)'
            }),
            stroke:new Stroke({
                color:'#ffcc33',
                width:2
            }),
            image:new CircleStyle({
                radius:7,
                fill:new Fill({
                    color:'#ffcc33'
                })
            })
        })
    });
    this.map = new Map({
      target: "map",
      layers: [raster,vector],
      view: new View({
          center:[-11000000, 4600000],
          zoom:4
      })
    });
    var modify=new Modify({
        source:source
    });
    this.map.addInteraction(modify);
    var _this=this;
    var typeSelect=document.getElementById('type');
    typeSelect.onchange=function(){
        _this.map.removeInteraction(_this.draw);
        _this.map.removeInteraction(_this.snap);
        addInteractions();
    }
    addInteractions();

    function addInteractions(){
        _this.draw=new Draw({
            source:source,
            type:typeSelect.value
        });
        _this.map.addInteraction(_this.draw);
        _this.snap=new Snap({source:source});
        _this.map.addInteraction(_this.snap);
    }
  },
  methods:{
      
  }
};
</script>
<style>
#map {
  height: 100%;
}
</style>


