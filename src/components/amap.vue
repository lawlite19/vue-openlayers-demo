<template>
    <div id="map" ref="rootmap">

    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ"
import TileWMS from "ol/source/TileWMS"
export default {
  data() {
    return {
      map: null
    };
  },
  mounted() {
    var mapcontainer = this.$refs.rootmap;
    // 自定义xyz layer
    var backLayer = new TileLayer({
        source: new XYZ({
            crossOrigin: 'anonymous',
            url: 'https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
        })
    });

    // 自定义wms layer
	var wmsSource = new TileWMS({
		url: 'http://127.0.0.1:1234/geoserver/higeo/wms',
		params: {
			'LAYERS': 'higeo:gdelt_part',
			'TILED': true
		},
		serverType: 'geoserver'
	});
    var wmsLayer = new TileLayer({
		source: wmsSource
	});

    // 添加layer
    this.map = new Map({
      target: "map",  // 使用map div
      layers: [
        backLayer,           // 高德地图
        wmsLayer             // 自己定义的WMS服务
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