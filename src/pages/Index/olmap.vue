<template>
    <div id="map" ref="rootmap">
        <div id="rotate" style="position:absolute;top:200x;right:40px;background-color:gray;cursor:pointer;z-index:100" @click="rotate">旋转</div>
    </div>
</template>
<script>
import {Map,View} from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import mapconfig from '../../config/mapconfig.js'
export default {
    data:()=>({
        map:null
    }),
    mounted(){
        var mapcontainer=this.$refs.rootmap;
        this.map=new Map({
            target:"map",
            layers:mapconfig.streetmap(),
            view:new View({
                projection:"EPSG:4326",
                center:[mapconfig.x,mapconfig.y],
                zoom:mapconfig.zoom
            })
        });
    },
    methods:{
        rotate(){
            var view=this.map.getView();
            view.animate({
                rotation:view.getRotation()+Math.PI/2
            });
        }
    }
}
</script>
<style>
#map{
    height: 100%;
}
.ol-attribution,.ol-zoom{
    display: none;
}
</style>


