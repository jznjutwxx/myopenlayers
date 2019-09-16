import TileLayer from 'ol/layer/Tile'
import TileArcGISRest from 'ol/source/TileArcGISRest'
import OSM from 'ol/source/OSM'
import XYZ from 'ol/source/XYZ'

let maptype = 2;      //0表示部署的离线瓦片地图，1表示OSM,2表示使用Arcgis在线午夜蓝地图服务
var zjlayer=new TileLayer({
    source:new TileArcGISRest({
        url:'https://192.168.14.147:6443/arcgis/rest/services/zhongFang/TDTZJ0704/MapServer'
    })
});
var streetmap = function () {
    var maplayer = null;
    switch (maptype) {
        case 0:
            maplayer = new TileLayer({
                source: new XYZ({
                    url: 'http://127.0.0.1:7080/streetmap/shenzhen/{z}/{x}/{y}.jpg'
                })
            })
            break;
        case 1:
            maplayer = new TileLayer({
                source: new OSM()
            })
            break;
        case 2:
            maplayer=new TileLayer({
                source:new TileArcGISRest({
                    url:'https://192.168.14.147:6443/arcgis/rest/services/zhongFang/2018VectorMapServer0704/MapServer'  //矢量底图
                    // url:'https://192.168.14.147:6443/arcgis/rest/services/zhongFang/2016YXMapServer0704/MapServer'   //影像底图
                })
            })
            break;
    }
    return [maplayer,zjlayer];
}

var mapconfig={
    // x:114.064839,
    // y:22.548857,
    x:119.968745,
    y:33.214003,
    zoom:10,
    streetmap:streetmap
};

export default mapconfig