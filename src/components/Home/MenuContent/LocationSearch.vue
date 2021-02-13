<template>
    <div class="col">
        <Blocker v-if="isBlock" :type="'block'"/>
        <div class="col item-group">
            <div class="row title">搜尋圖層</div>
            <select v-model="select_layer">
                <option 
                    v-for=" ( layer, index ) in currentLayers " 
                    :key="index" 
                    :value="layer.id">
                    {{layer.name}}
                </option>
            </select>
        </div>
        <div class="col item-group">
            <div class="row title">環域範圍</div>
            <input type="number" class="row" v-model="search_radius"/>
        </div>
        <div class="col item-group">
            <div class="row title">
                <span class="row r1-2">位置</span>
                <div class="row r1-2" style="justify-content: flex-end;">
                    <button @click="setPositionByGeoLocation">定位</button>
                    <button @click="setPositionByMouseClick($event)">點選</button>
                </div>
                
            </div>
            <div class="row">
                <input type="number" class="row r1-2" placeholder="經度" v-model="position.lon" />
                <input type="number" class="row r1-2" placeholder="緯度" v-model="position.lat" />
            </div>
            
        </div>
        <div class="row item-group" style="justify-content: flex-end;">
            <button @click="recover" :disabled="select_layer === undefined">恢復</button>
            <button @click="run">搜尋</button>
        </div>
    </div>
</template>
<script>
import Global from '@/global'
import Leaflet from 'leaflet'

import Blocker from '@/components/basicUI/Blocker'


export default {
    name: "LocationSearch",
    data()
        {
            return{
                currentLayers:[],
                select_layer:undefined,
                search_radius:200,
                position:{ lat:'', lon:''},
                buffer_layer: { id: undefined },
                isBlock:false
            }
        },
    mounted()
        {
            this.currentLayers = this.getCurrentLayers()
        },
    beforeDestroy()
        {
            this.recover()
        },
    methods:
        {
            getCurrentLayers()
            {
                return Global.LayerCenter.layersInfo
            },
            setPositionByGeoLocation()
            {
                navigator.geolocation.getCurrentPosition( position =>
                {
                    this.position.lat = position.coords.latitude
                    this.position.lon = position.coords.longitude
                })
            },
            setPositionByMouseClick(event)
            {
                var self = this
                var viewer = Global.viewer
                this.isBlock = true
                viewer.getContainer().style.cursor = 'crosshair'
                setTimeout( ()=>{window.addEventListener( 'click', handleMouseClick)},2000)
                function handleMouseClick(event)
                {
                    event.stopPropagation()
                    // console.log(event)
                    var viewer = Global.viewer
                    if ( viewer.getContainer().contains(event.target) )
                    {
                        var latlng = viewer.mouseEventToLatLng(event);
                        // console.log(latlng)
                        self.position.lat = latlng.lat
                        self.position.lon = latlng.lng
                        self.isBlock = false
                        viewer.getContainer().style.cursor = ''
                        window.removeEventListener('click', handleMouseClick)
                    }
                    else
                    {
                        alert( '請點擊地圖任一點' )
                    }

                    
                }
            },
            reset_form()
            {
                this.search_radius = 200
                this.position = { lat:'', lon:''}
            },
            clear_buffer_circle()
            {
                var viewer = Global.viewer
                var product = Global.LayerCenter.getById(this.select_layer)
                if ( product != undefined )
                {
                    var feature = product.container
                    var old_circle = feature.getLayer(this.buffer_layer.id)
                    if ( old_circle != undefined ) 
                    {
                        feature.removeLayer( old_circle )
                        this.buffer_layer.id = undefined
                    }
                }


            },
            recover()
            {
                var viewer = Global.viewer
                var product = Global.LayerCenter.getById(this.select_layer)
                if ( product )
                {
                    var feature = product.container
                    feature.isFiltered = false
                    feature.eachLayer( layer =>
                    {
                        layer.show = true
                    })
                    this.reset_form()
                    this.clear_buffer_circle()
                }
                
                
            },
            run()
            {
                var viewer = Global.viewer
                var product = Global.LayerCenter.getById(this.select_layer)
                var feature = product.container
                feature.isFiltered = true
                feature.eachLayer( layer =>
                {
                    layer.show = true
                    var position = layer.getLatLng()
                    var distance = position.distanceTo( Leaflet.latLng(this.position.lat, this.position.lon))
                    layer.show = distance > this.search_radius ? false : true
                })
                var circle = this.create_bufferCircle( feature )
                // console.log(circle)
                viewer.flyToBounds( circle.getBounds() )
            },
            create_bufferCircle( feature )
            {
                var old_circle = feature.getLayer(this.buffer_layer.id)
                if ( old_circle != undefined ) feature.removeLayer( old_circle )

                var circle = Leaflet.circle(
                    [this.position.lat, this.position.lon], 
                    {
                        color: 'red',
                        fillColor: '#f03',
                        fillOpacity: 0.1,
                        radius: this.search_radius
                    }
                )
                feature.addLayer(circle)
                this.buffer_layer.id = feature.getLayerId(circle)
                return circle

            }
        },
    components:
        {
            Blocker
        }
}
</script>
<style scoped>
.title{
    color: #35495e;
}
.item-group{
    margin: 5px 0px;
    
}
</style>