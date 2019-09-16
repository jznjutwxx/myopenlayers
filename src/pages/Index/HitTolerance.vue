<template>
  <div>
    <div id="map" ref="rootmap"></div>
    <form class="form-inline">
      <span id="status">&nbsp;No feature got hit.</span>
      <br>
      <label>Hit tolerance for selecting features</label>
      <select id="hitTolerance" class="form-control">
        <option value="0" selected>0 Pixels</option>
        <option value="5">5 Pixels</option>
        <option value="10">10 Pixels</option>
      </select>
      <br>Area: &nbsp;
      <canvas id="circle" style="vertical-align: middle"/>
    </form>
  </div>
</template>
<script>
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import Feature from "ol/Feature";
import LineString from "ol/geom/LineString";
import { Stroke, Style } from "ol/style";

export default {
  data: () => ({
    map: null
  }),
  mounted() {
    var raster = new TileLayer({
      source: new OSM()
    });
    var style = new Style({
      stroke: new Stroke({
        color: "black",
        width: 1
      })
    });
    var feature = new Feature(new LineString([[-4000000, 0], [4000000, 0]]));
    var vector = new VectorLayer({
      source: new VectorSource({
        features: [feature]
      }),
      style: style
    });
    this.map = new Map({
      target: "map",
      layers: [raster,vector],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    var hitTolerance;
    var statusElement = document.getElementById("status");
    var _this=this;
    this.map.on("singleclick", function(e) {
        var hit=false;
        _this.map.forEachFeatureAtPixel(e.pixel,function(){
            hit=true;
        },{
            hitTolerance:hitTolerance
        });
        if(hit){
            style.getStroke().setColor('green');
            style.getStroke().setWidth(3);
            statusElement.innerHTML="&nbsp;A feature got hit!";
        }else{
            style.getStroke().setColor('black');
            style.getStroke().setWidth(1);
            statusElement.innerHTML="&nbsp;No feature got hit.";
        }
        feature.changed();
    });
    var selectHitToleranceElement = document.getElementById("hitTolerance");
    var circleCanvas = document.getElementById("circle");
    var changeHitTolerance = function() {
      hitTolerance = parseInt(selectHitToleranceElement.value, 10);
      var size = 2 * hitTolerance + 2;
      circleCanvas.width = size;
      circleCanvas.height = size;
      var ctx = circleCanvas.getContext("2d");
      ctx.clearRect(0, 0, size, size);
      ctx.beginPath();
      ctx.arc(
        hitTolerance + 1,
        hitTolerance + 1,
        hitTolerance + 0.5,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.stroke();
    };
    selectHitToleranceElement.onchange=changeHitTolerance;
    changeHitTolerance();
  }
};
</script>
<style>
#map {
  height: 100%;
}
</style>


