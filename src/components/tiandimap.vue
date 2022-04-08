<template>
    <div id="map" ref="rootmap">

    </div>
</template>

<script>
import "ol/ol.css";
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {defaults as defaultControls} from 'ol/control.js';
import {getWidth, getTopLeft} from 'ol/extent.js';
import TileLayer from 'ol/layer/Tile.js';
import {get as getProjection} from 'ol/proj.js';
import OSM from 'ol/source/OSM.js';
import WMTS from 'ol/source/WMTS.js';
import WMTSTileGrid from 'ol/tilegrid/WMTS.js';
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
    var projection = getProjection('EPSG:3857');
    var projectionExtent = projection.getExtent();
    var size = getWidth(projectionExtent) / 256;
    var resolutions = new Array(18);
    var matrixIds = new Array(18);
    for (var z = 1; z < 19; ++z) {
    // generate resolutions and matrixIds arrays for this WMTS
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z;
    }

    var webKey = 'f50a580b75898a7e26dca2dfe3ad910e';

    var wmtsUrl_1 = 'http://t{0-7}.tianditu.gov.cn/vec_w/wmts?tk='; //矢量底图
    var wmtsUrl_2 = 'http://t{0-7}.tianditu.gov.cn/cva_w/wmts?tk='; //矢量注记

    var wmtsUrl_3 = 'http://t{0-7}.tianditu.gov.cn/img_w/wmts?tk='; //影像底图
    var wmtsUrl_4 = 'http://t{0-7}.tianditu.gov.cn/cia_w/wmts?tk='; //影像注记

    var wmtsUrl_5 = 'http://t{0-7}.tianditu.gov.cn/ter_w/wmts?tk='; //地形底图
    var wmtsUrl_6 = 'http://t{0-7}.tianditu.gov.cn/cta_w/wmts?tk='; //地形注记

    var wmtsUrl_7 = 'http://t{0-7}.tianditu.gov.cn/ibo_w/wmts?tk='; //境界（省级以上）
    var wmtsUrl_8 = 'http://t{0-7}.tianditu.gov.cn/eva_w/wmts?tk='; //矢量英文注记
    var wmtsUrl_9 = 'http://t{0-7}.tianditu.gov.cn/eia_w/wmts?tk='; //影像英文注记
    // 自定义wms layer
    var layer1 = new TileLayer({
      opacity: 0.7,
      source: new WMTS({
      url: wmtsUrl_1 + webKey,
      layer: 'vec',
      matrixSet: 'w',
      format: 'tiles',
      style: 'default',
      projection: projection,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions: resolutions,
        matrixIds: matrixIds
      }),
      wrapX: true
    })
    })

    var layer2 = new TileLayer({
      opacity: 0.7,
      source: new WMTS({
      url: wmtsUrl_2 + webKey,
      layer: 'cva',
      matrixSet: 'w',
      format: 'tiles',
      style: 'default',
      projection: projection,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions: resolutions,
        matrixIds: matrixIds
      }),
      wrapX: true
      })
    })

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
        layer1,           // 天地图
        layer2,
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