<template>
    <div class="col layer-holder" :class="{'hide':hide}">
        <div class="row" v-for=" (item, index) in layers " :key="index">
            <input type="checkbox" checked="true" @change="toggleShow($event, item)">
            <span class="layer-row">{{item.name}}</span>
        </div>
        
    </div>
</template>
<script>

var samples = 
[
    {name:'layer1'},
    {name:'layer2'},
    {name:'layer3'},
    {name:'layer4'},
    {name:'layer5'},
    {name:'layer6'},
]

export default {
    name: "Layer",
    props:
        {
            layers:
            {
                type: Array,
                default: () => samples
            },
            hide:
            {
                type: Boolean,
                default: false
            }
        },
    methods:
        {
            toggleShow(event, info)
            {
                var LayerCenter = Global.LayerCenter
                var viewer = Global.viewer
                var product = LayerCenter.getByInfo(info)
                if( event.target.checked)
                {
                    if ( viewer.hasLayer(product.container) ) 'pass'
                    else viewer.addLayer(product.container)
                }
                else
                {
                    if ( viewer.hasLayer(product.container) ) viewer.removeLayer(product.container)
                    else 'pass'
                }

            }
        }
}
</script>
<style scoped>
 .layer-holder{
    z-index: 401;
    position: absolute;
    top: 0px;
    left: 0px;
    min-width: 150px;
    background: #41b883c2;
    margin: 5px;
    padding: 5px;
    transition: 0.2s all ease;
    
 }   
 .layer-holder.hide{
    width: 0px;
    min-width: 0px;
    overflow: auto;
    transition: 0.2s all ease;
    margin: 0px;
    padding: 0px;
 }
 .layer-row{
    border-bottom: 1px solid #35495e;
    border-left: 4px solid #35495e;
    padding: 5px;
    margin: 3px;
    width: 150px;
    color: #1e1e23;
    font-weight: bolder;
    cursor: pointer;
    white-space: nowrap;
    transition: 0.3s all ease;
 }
 .layer-row:hover{
    background: #35495e91 ;
    border-left: 7px solid #35495e;
    color: white;
    width: 147px;
 }
</style>