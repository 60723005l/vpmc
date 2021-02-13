<template>
    <div class="col basic-box">
        <div class="title row" v-if="title != ''">
            <div>　</div>
            <span>{{this.title}}</span>
        </div>
        <div class="container" :class="{ 'limit-min-size':limitMinSize }">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name:'Box',
    props: 
        {
            title:
            {
                type:String,
                default:''
            },
            limitMinSize:
            {
                type:Boolean,
                default:true
            },
        }
}
</script>
<style scoped>
.basic-box{
    /* width: max-content; */
    margin: 10px;
}
.title{
    color: bisque;
    font-size: larger;
}
.title>div{
    width: 5px;
    background: bisque;
    height: 5px;
}
.title>span{
    margin-left: 5px;
}
.container{
    background: #151517;
    padding: 5px;
    border: 1px solid #3d3d3d;
    border-radius: 3px;
}
.limit-min-size{
    min-height: 150px;
    min-width: 150px;
}
</style>