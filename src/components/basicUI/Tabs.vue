<template>
    <div class="basic-tags-holder row">
        <div class="tags" 
            v-for="tab in _tabs" :key="tab.index" 
            :class="{'active': activeTab.index === tab.index}" 
            @click=" onTabClick( tab ) ">
            <span>{{tab.name}}</span>
        </div>
    </div>
</template>
<script>

/**
 * $props.tags
 * [
 *  {
 *      name: String,
 *      
 *  }
 * ]
 */
export default {
    name:'Tabs',
    data() 
        {
            return {
                activeTab:
                {
                    index:undefined
                }
            }
        },
    props: 
        {
            tabs:
            {
                type:Array,
                required:true
            }
        },
    mounted()
        {},
    computed:
        {
            _tabs()
            {
                return this.tabs.map( ( tab, index ) =>
                {
                    tab.index = index
                    return tab
                })
            }
        },
    methods:
        {
            onTabClick( tab )
            {
                this.ActiveTab( tab )
                this.$emit('onClick', tab)
            },
            ActiveTab( tab )
            {
                this.activeTab = tab
            }
        }
}
</script>
<style scoped>
.basic-tags-holder{
    background: #35495e;
    flex-wrap: wrap;
}
.active{
    background: #41b883 !important;
}
.tags{
    padding: 3px 10px;
    border: 0px solid #5d5d5d;
    border-radius: 2px;
    cursor: pointer;
    flex-wrap: wrap;
    color: white;
}
.tags:hover{
    background: #272727 ;
    /* border: 1px solid #8f8f8f ; */
}
</style>