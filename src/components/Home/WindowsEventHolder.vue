<template>
    <div style="z-index: 402;position: absolute;top: 0px;">
        <Window v-for=" ( item, index) in components " :key="index"
            :title="item.title" 
            :float="true"
            :resize="true"
            @onClose="onClose(item)">
            <template v-slot:body >
                <component :is="item.name"></component>
            </template>
            
        </Window>
    </div>
</template>
<script>
import Window from "@/components/basicUI/Window"
import LocationSearch from "@/components/Home/MenuContent/LocationSearch"
import FieldSearch from "@/components/Home/MenuContent/FieldSearch"


export default {
    name: "WindowsEventHolder",
    props:
        {
            components:
            {
                type: Array
            }
        },
    methods:
        {
            onClose( item )
            {
                var e_arr = this.$parent.windows.event_array
                var index = e_arr.indexOf( e_arr.filter( e=> e.name === item.name )[0] )
                this.$parent.windows.event_array.splice( index, 1 )
            }
        },
    components:
        {
            Window, FieldSearch, LocationSearch
        }
}
</script>
<style scoped>
    
</style>