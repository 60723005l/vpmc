<template>
    <div>
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
            <div class="row title">選擇欄位</div>
            <select v-model="select_field">
                <option 
                    v-for=" ( field, index ) in currentFileds " 
                    :key="index" 
                    :value="field">
                    {{field}}
                </option>
            </select>
            <!-- <div class="sample-value-group col">
                <div class="row title">預視</div>
                <div class="sample-value" v-for=" ( value, index) in sample_values " :key="index">
                    <div class="sample-item">
                        <span>{{value}}</span>
                    </div>
                </div>
            </div> -->
        </div>
        <div class="col item-group">
            <div class="row title">搜尋條件</div>
            <div class="row">
                <select class="r1-2" v-model="select_condition">
                    <option 
                        v-for=" ( item, index ) in conditions " 
                        :key="index" 
                        :value="item">
                        {{item.text}}
                    </option>
                </select>
                <input class="r1-2" v-model="condition_input" placeholder="輸入數字或文字" :disabled="select_condition === ''"/>
            </div>
            
        </div>
        <div class="row item-group" style="justify-content: flex-end;">
            <button @click="recover" :disabled="select_layer === undefined">恢復</button>
            <button @click="run">搜尋</button>
        </div>
        <AlertInfoBox
            v-if="alertOpen"
            :title="'alert'"
            :mode="'alert'"
            :ok_callback="alert_ok_callback"
            :callback_params="callback_params">
            <span>{{alertText}}</span>
        </AlertInfoBox>
    </div>
</template>
<script>
import Global from '@/global'
import Leaflet from 'leaflet'

import AlertInfoBox from '@/components/basicUI/AlertInfoBox'

const ConditionMap = 
{
    'add': () => {},
    'minus': () => {},
    'equal': ( left, right, vm ) => 
        {
            var n_left = Number(left),
                n_right = Number(right)
            if ( isNaN(n_left) || isNaN(n_right) )
            {
                // vm.alertOpen = true
                // vm.alertText = '運算以編碼表的索引比較'
                 return left.toLocaleString() === right.toLocaleString()
            }
            else
            {
                return n_left === n_right
            }
        },
    'greater': ( left, right, vm ) => 
        {
            var n_left = Number(left),
                n_right = Number(right)
            if ( isNaN(n_left) || isNaN(n_right) )
            {
                vm.alertOpen = true
                vm.alertText = '運算以編碼表的索引比較'
                 return left.toLocaleString() > right.toLocaleString()
            }
            else
            {
                return n_left > n_right
            }
        },
    'less': ( left, right, vm ) => 
        {
            var n_left = Number(left),
                n_right = Number(right)
            if ( isNaN(n_left) || isNaN(n_right) )
            {
                vm.alertOpen = true
                vm.alertText = '運算以編碼表的索引比較'
                 return left.toLocaleString() < right.toLocaleString()
            }
            else
            {
                return left < n_right
            }
        },
}
export default {
    name: "FieldSearch",
    data()
        {
            return{
                currentLayers:[],
                select_layer:'',
                currentFileds:[],
                select_field:'',
                isBlock:false,
                alertOpen:false,
                conditions:
                [
                    { text: '>', name: 'greater' },
                    { text: '<', name: 'less' },
                    { text: '=', name: 'equal' },
                ],
                select_condition:'',
                condition_input:'',
                callback_params:{},
                alertText:''
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
    watch:
        {
            select_layer(val)
            {
                console.log(val)
                this.currentFileds = this.getLayerPropNames( val )
            },
            // select_field(val)
            // {
            //     this.showFieldSample( this.select_layer, val )
            // }
        },
    methods:
        {
            getCurrentLayers()
            {
                return Global.LayerCenter.layersInfo
            },
            getLayerPropNames( layerId )
            {
                var viewer = Global.viewer
                var product = Global.LayerCenter.getById(layerId)
                return product.container.propertyNames
            },
            showFieldSample( layerId, field )
            {
                var viewer = Global.viewer
                var product = Global.LayerCenter.getById(layerId)
                var result = []
                product.container.eachLayer( layer =>
                {
                    var value = layer.properties[ field ]
                    result.push( value )                  
                })
                result = result.splice( 0, 5 )
                result = result.concat(['.','.','.'])
                this.sample_values = result
            },
            alert_ok_callback()
            {
                this.callback_params = {}
                this.alertOpen = false
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
                    // this.reset_form()
                    // this.clear_buffer_circle()
                }
            },
            run()
            {
                var viewer = Global.viewer
                var product = Global.LayerCenter.getById(this.select_layer)
                var feature = product.container

                var condition = this.select_condition,
                    condition_input = this.condition_input

                feature.isFiltered = true
                feature.eachLayer( layer =>
                {
                    layer.show = true
                    var compared = ConditionMap[ condition.name ]( layer.properties[ this.select_field ], condition_input, this )
                    layer.show = compared
                })
                // viewer.flyToBounds( circle.getBounds() )
            }
        },
    components:
        {
            AlertInfoBox
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
.sample-value-group{
    background: #0c0c0c;
    border: 1px solid #3d3939;
    padding: 3px;
}
.sample-value{

}
.sample-item{
    color: white;
    padding: 3px 5px;
    border: 1px solid;
    width: fit-content;
}
</style>