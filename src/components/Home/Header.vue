<template>
    <div class="row" style="align-items: baseline;">
        <div class="logo-holder">
            <img :src="require('@/assets/logo.png')">
        </div>
        <div class="tab-holder">
            <Tabs 
                :tabs="inputTabs"
                @onClick="onTabClick"/>
        </div>
        <div class="other"></div>
        
    </div>
</template>
<script>
import Tabs from "@/components/basicUI/Tabs"
export default {
    name: 'Header',
    data()
        {
            return {
                
            }
        },
    props:
        {
            inputTabs:Array
        },
    methods:
        {
            onTabClick( tab )
            {
                this.$emit( "itemOnClick", 'tab', tab )
            }
        },
    components:
        {
            Tabs
        }
}
</script>
<style scoped>
.logo-holder{
    max-width: 50px;
    max-height: 50px;
    margin: 5px 20px 5px 10px;
}
.logo-holder img{
    width: 100%;
    height: 100%;
}
.tab-holder{
    height: 100%;
}
.other{

}
</style>