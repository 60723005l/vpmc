<template>
    <div class="full-page col">
        <div class="header col">
            <Header @itemOnClick="headerItemOnClick" :inputTabs="tabs"/>
            <div class="header-menu-holder row">
                <IconButton
                    :svg_base64="layerManager.base64"
                    :label="layerManager.label"
                    :bg_color="'none'"
                    :icon_color="'White'"
                    @onClick="onLayerManagerClick"/>
                <component :is="activeTabComponentName"></component>
            </div>
            
        </div>
        <div class="body">
            
            <LeafletViewer/>
            <Layer 
                :hide="layer.hide"
                :layers="layer.Info"/>
            <GeoLocation class="geolocation" />
            <WindowsEventHolder :components="windows.event_array"/>
        </div>
        
    </div>
</template>
<script>
import Global from '@/global'
import LeafletViewer from "@/components/LeafletViewer"
import Header from "@/components/Home/Header"
import MenuContent from "@/components/Home/MenuContent"
import IconButton from "@/components/basicUI/IconButton"
import Layer from "@/components/Home/Layer"
import GeoLocation from "@/components/mapWidget/GeoLocation"
import WindowsEventHolder from "@/components/Home/WindowsEventHolder"

import LayerManageCenter from "@/lib/LayerManage/LayerManageCenter"
import {Factory} from "@/lib/LayerManage/Factory"
import Product from "@/lib/LayerManage/LayerProduct"
import {VPMC_Demo} from "@/lib/LayerManage/CustomProcessor"


const mapDataList = 
[
    {
        name:'測試資料點位',
        type:'Feature',
        processor: VPMC_Demo.processor,
    },
]

export default {
    name: "Home",
    data()
        {
            return {
                layerManager:{ base64:require('@/assets/svg/ICONS_layer.svg'), label:"圖層列表" },
                activeTabComponentName:'',
                tabs:
                [
                    {name:'工具', id:'tab1', view:'MenuContent' },
                    {name:'tab2', id:'tab2', view:'' },
                    {name:'tab3', id:'tab3', view:'' },
                    {name:'tab4', id:'tab4', view:'' },
                ],
                windows:
                {
                    event_array:[]
                },
                layer: 
                {
                    hide:false,
                    Info:[ {name:'empty'}]
                }
            }
        },
    mounted()
        {
            this.loadMapData()
            
            // this.$set( this.layerManage, "layerInfo", Global.LayerCenter.layersInfo)
            
        },
    methods:
        {
            headerItemOnClick( type, param )
            {
                console.log(type, param)
                switch( type )
                {
                    case 'tab':
                        this.handleTabClick( param )
                        break;
                }
            },
            handleTabClick( tab )
            {
                this.activeTabComponentName = tab.view
            },
            setLayerList()
            {
                this.layer.Info = Global.LayerCenter.layersInfo
                console.log(Global.LayerCenter.layersInfo)
            },
            onLayerManagerClick( )
            {
                this.layer.hide = !this.layer.hide
            },
            loadMapData()
            {
                var LayerCenter = Global.LayerCenter
                console.log(LayerCenter)
                mapDataList.forEach( data =>
                {
                    console.log(data)
                    var viewer = Global.viewer
                    var myFactory = new Factory({
                        processer: data.processor,
                    })

                    var myProduct = new Product({
                        name: data.name,
                        type: data.type,
                        payload:
                            {
                                viewer: viewer
                            }
                    })
                    myProduct.generate( myFactory ).then( product =>
                    {
                        LayerCenter.add( product )
                        this.setLayerList()
                    })
                })

            }
        },
    components:
        {
            LeafletViewer,
            Header,
            MenuContent,
            IconButton,
            Layer,
            GeoLocation,
            WindowsEventHolder
        }            
}
</script>
<style scoped>
.full-page{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background: antiquewhite;
}
.header{
    background:#1e1e23;
    /* min-height: 70px; */
}
.header-menu-holder{
    background: #41b883;
    padding: 10px;
    margin-top: -1px;
}
.body{
    background: cadetblue;
    height: 100%;
    position: relative;
}
.geolocation{
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: 401;
}
</style>