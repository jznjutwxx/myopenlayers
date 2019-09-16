<template>
    <div id="map" ref="rootmap"></div>
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
                
            })
        });
    }
}
</script>
<style>
#map{
    height: 100%;
}
</style>


