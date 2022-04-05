<template>
    <div id="map" ref="rootmap">

    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import TileWMS from "ol/source/TileWMS"
import Tile from "ol/layer/Tile"
export default {
  data() {
    return {
      map: null
    };
  },
  mounted() {
    var mapcontainer = this.$refs.rootmap;

    // 自定义wms layer
	var baseSource = new TileWMS({
		url: 'http://127.0.0.1:1234/geoserver/higeo/wms',
		params: {
			'LAYERS': 'higeo:gdelt_part',
			'TILED': true
		},
		serverType: 'geoserver'
	});
    var baseLayer = new TileLayer({
		source: baseSource
	});

    // 添加layer
    this.map = new Map({
      target: "map",  // 使用map div
      layers: [
        new Tile({
          source: new OSM()   // openstreet map地图
        }),
        baseLayer             // 自己定义的WMS服务
      ],
      view: new View({
        projection: "EPSG:4326",    //使用这个坐标系
        center: [114.064839,22.548857],  //深圳
        zoom: 7
      })
    });
  }
};


</script>

<style>
#map{height:100%;}
/*隐藏ol的一些自带元素*/
.ol-attribution,.ol-zoom { display: none;}

</style>