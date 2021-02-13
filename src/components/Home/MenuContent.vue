<template>
    <div class="menu-content row">
        <IconButton style="margin:0px 10px;"
        v-for=" ( item, index) in Ibuttons " :key="index"
        :svg_base64="item.base64"
        :label="item.label"
        :bg_color="'none'"
        :icon_color="'White'"
        @onClick="onClick(item)"/>
        
    </div>
</template>
<script>
import IconButton from "@/components/basicUI/IconButton"

export default {
    name : 'MenuContent',
    data()
        {
            return {
                Ibuttons:
                [
                    { base64:require('@/assets/logo.png'), label:"定位搜尋", component_name: 'LocationSearch' },
                    { base64:require('@/assets/logo.png'), label:"欄位搜尋", component_name: 'FieldSearch' },
                    { base64:require('@/assets/logo.png'), label:"test3" },
                    { base64:require('@/assets/logo.png'), label:"test4" },
                    { base64:require('@/assets/logo.png'), label:"test5" },
                ]
            }
        },
    methods:
        {
            onClick( param )
            {
                var result = {
                    title: param.label,
                    name: param.component_name
                }
                var e_arr = this.$parent.windows.event_array
                if (e_arr.filter(e=>e.name === result.name).length > 0)
                {
                    console.log('window opened')
                }
                else
                {
                    e_arr.push( result )
                }
            }
        },
    components:
        {
            IconButton
        }
}
</script>
<style scoped>
.menu-content{
    /* padding: 10px;
    background: #41b883; */
}
</style>