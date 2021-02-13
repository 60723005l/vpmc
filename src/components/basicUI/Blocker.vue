<template>
    <div class="blocker"><img v-if="type==='load'" :src="require('@/assets/img/processing.gif')"></div>
</template>
<script>
export default {
    name:'Blocker',
    props: 
        {
            type:
            {
                type:String,
                default:'block',
                validator: function (value) 
                {
                    return ['load', 'block'].indexOf(value) !== -1
                }
            }
        }
}
</script>
<style scoped>
.blocker{
    background: #1c1c1eb5;
    z-index: 11;
    position: absolute;
    top: 0;
    left: 0;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    user-select: none;
}
.blocker img{
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: 200px;
    max-height: 200px;
    transform: translate(-50%, -50%);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
    user-drag: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
}
</style>