<template>
  <div :id="viewerContainer" class="leaflet-viewer">

  </div>
</template>

<script>
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'

import Global from '@/global'
import UUID from "@/lib/LayerManage/UUID"
import LayerManageCenter from "@/lib/LayerManage/LayerManageCenter"
import {Factory} from "@/lib/LayerManage/Factory"
import Product from "@/lib/LayerManage/LayerProduct"

export default {
  name: 'LeafletViewer',
  data ()
    {
       return {
        msg: 'Welcome to Your Vue.js App'
      }

    },
  props:
    {
      viewerContainer:
      {
        type: String,
        default: UUID()
      },
      lat:
      {
        type: Number,
        default: 23
      },
      lon:
      {
        type: Number,
        default: 121
      },
      zooom:
      {
        type: Number,
        default: 7
      },
    },
  mounted()
    {
      this.initMap()
      this.test1()
      // this.test2()
    },
  methods:
    {
      initMap()
      {
        var myLayerCenter = new LayerManageCenter()
        Global.LayerCenter = myLayerCenter
        
        var viewer = Leaflet.map(this.viewerContainer).setView([this.lat, this.lon], this.zooom);
        Global.viewer = viewer
        window.Global = Global
        window.viewer = viewer

        viewer.zoomControl._container.parentElement.classList.remove('leaflet-left')
        viewer.zoomControl._container.parentElement.classList.add('leaflet-right')

        var data = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        viewer.addLayer(data)
      },
      test1()
      {
        // var viewer = Global.viewer
        // var circle = Leaflet.circle([51.508, -0.11], {
        //     color: 'red',
        //     fillColor: '#f03',
        //     fillOpacity: 0.5,
        //     radius: 500
        // })

        // var marker_option = 
        // {
        //   icon: Leaflet.icon( { iconUrl: require('@/assets/logo.png'), iconSize: [50,50] } )
        // }

        // var marker = Leaflet.marker([25.03346062196884, 121.53289550083076], marker_option)
        // viewer.addLayer(circle)
        // viewer.addLayer(marker)
      },
      test2()
      {
        var viewer = Global.viewer
        var markerFactory = new Factory(
          {
            name:' markerFactory',
            processer: processer,
          }
        )
        var markerProduct = new Product(
          {
            name: 'markerProduct',
            type: 'marker',
            payload:
            {
              viewer: viewer
            }
          }
        )
        markerProduct.generate( markerFactory )
        console.log( markerFactory, markerProduct )
        function processer( payload )
        {
          return new Promise( resolve =>
          {
            console.log(666,payload)
            var viewer = payload.viewer
            var marker_option = 
            {
              icon: Leaflet.icon( { iconUrl: require('@/assets/logo.png'), iconSize: [50,50] } )
            }
            var marker = Leaflet.marker([25.03346062196884, 121.53289550083076], marker_option)
            viewer.addLayer(marker)
            resolve( marker )
          })

        }


      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.leaflet-viewer{
  width: 100%;
  height: 100%
}
</style>
