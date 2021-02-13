<template>
<div>
    <div class="container clickable" @click="flyTo_userLocattion">
    <svg
        class="geolocation-svg clickable"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
        <title>fly to your location</title>
        <g id="geolocation">
            <path id="inner_ring" class="cls-1" d="M11,4.41A6.59,6.59,0,1,0,17.59,11,6.59,6.59,0,0,0,11,4.41Zm0,11.35A4.75,4.75,0,1,1,15.75,11,4.75,4.75,0,0,1,11,15.75Z"/>
            <g id="mian">
                <path id="outer_ring" class="cls-2" d="M19.37,10A8.45,8.45,0,0,0,12,2.63v-2H10v2A8.45,8.45,0,0,0,2.63,10h-2v2h2A8.45,8.45,0,0,0,10,19.37v2h2v-2A8.45,8.45,0,0,0,19.37,12h2V10ZM11,17.44A6.44,6.44,0,1,1,17.44,11,6.44,6.44,0,0,1,11,17.44Z"/>
                <circle id="inner_dot" class="cls-2" cx="11" cy="11" r="4.81"/>
            </g>
        </g>
    </svg>
    </div>
</div>
</template>
<script>
import Global from '@/global'
import Leaflet from 'leaflet'

export default {
    name:'GeoLocation',
    data()
        {
            return {

            }
        },
    props:
        {

        },
    mounted()
        {

        },
    computed:
        {

        },
    methods:
        {
            flyTo_userLocattion()
            {
                let viewer = Global.viewer
                if ("geolocation" in navigator)
                {
                    navigator.geolocation.getCurrentPosition
                    (
                        function(position)
                        {
                            viewer.flyTo( [position.coords.latitude, position.coords.longitude], 12 )

                        }
                    );
                }
                else
                {
                    alert('geolocation not support')
                }
            }
        },
}
</script>
<style scoped>
.clickable{
    pointer-events: auto;
    cursor: pointer;
    user-select: none;
    user-select: none; /* supported by Chrome and Opera */
   -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* Internet Explorer/Edge */
}
.container{
    /* background: #272a32ba;
    padding: 5px;
    border: 0.5px solid #ffffff52;   */
    background: #fdfdfd;
    padding: 5px;
    border: 2px solid rgba(0,0,0,0.2);
    border-radius: 2px;
}
.geolocation-svg{
    width:25px;
}

/* .geolocation-svg:hover #outer_ring {
    fill: aquamarine;;
}
.geolocation-svg:hover #inner_dot{
    fill: aquamarine;;
} */

.cls-1{fill:#ffffff;opacity:0.3;}
.cls-2{fill:rgb(34, 34, 34);}
</style>