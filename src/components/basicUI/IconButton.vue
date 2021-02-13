<template>
    <div class="col icon-holder" :style="bg_color_css[bg_color]" @click="onClick(payload)">
        <div class="icon-button" 
            :class="{'active':isActive}" 
            :style="get_css_style()" >
            <div v-if="!show_text" class="icon-svg icon" :style="svg_mask" ></div>
            <span v-if="show_text">{{show_text}}</span>
            
        </div>
        <span v-if="label">{{label}}</span>
    </div>
</template>
<script>
var bg_color_css =
                {
                    'Deep-Dark':{'background': '#151517'},
                    'Dark':{'background': '#2e2e2e'},
                    'Gray':{'background': '#696969'},
                    'Light':{'background': '#cccccc'},
                    'V-blue':{'background': '#35495e'},
                    'none':{'background': 'none'},
                }
export default {
    name:'IconButton',
    data()
        {
            return{
                size_css:
                {
                    S:{
                        'width': '15px',
                        'height': '15px'
                    },
                    M:{
                        'width': '25px',
                        'height': '25px'
                    },
                    L:{
                        'width': '35px',
                        'height': '35px'
                    },
                    XL:{
                        'width': '40px',
                        'height': '40px'
                    },
                },
                bg_color_css: bg_color_css
            }
        },
    props:
        {
            svg_base64:
            {
                type:String,
                // required: true
            },
            show_text:
            {
                type:String
            },
            label:
            {
                type:String,
            },
            size:
            {
                type:String,
                default:'M',
                validator: function (value)
                {
                    return ['S', 'M', 'L', 'XL'].indexOf(value) !== -1
                }
            },
            icon_color:
            {
                type:String,
                default:"bisque"
            },
            bg_color:
            {
                type:String,
                default:'Deep-Dark',
                validator: (value) =>
                {
                    return Object.keys( bg_color_css ).indexOf(value) !== -1
                }
            },
            payload:
            {
                type:Object,
                default:()=>{return{}}
            },
            isActive:
            {
                type:Boolean,
                default:false
            }
        },
    computed:
        {
            svg_mask()
            {
                return {'--mask-svg-src': 'url(' + this.svg_base64 + ')', 'background':this.icon_color}
            }
        },
    watch:
        {
            // svgPath(val)
            // {
                
            // }
        },
    mounted()
        {
            // console.log(this.svgPath)
            // console.log(require(this.svgPath))
            // this.svg_mask = {'--mask-svg-src': 'url(' + require(this.svgPath) + ')'}
        },
    methods:
        {
            onClick(payload)
            {
                this.$emit('onClick',payload)
            },
            get_css_style()
            {
                var result = {}
                
                var size = this.size_css[this.size]
                // var bg_color = this.bg_color_css[this.bg_color]
                Object.keys(size).forEach(item=>
                {
                    result[item] = size[item]
                })
                // Object.keys(bg_color).forEach(item=>
                // {
                //     result[item] = bg_color[item]
                // })
                if ( this.show_text )
                {
                    result['width'] = 'auto'
                }
                
                return result
            }
        }

}
</script>
<style scoped>
.active{
    background: #141616 !important;
    border-left: 5px solid #00e1ff !important;
    border-bottom: 1px solid #00e1ff !important;
    color: #00e1ff !important;
}
.icon-holder.active{
    background: #000000 !important;
    border: 2px solid #00e1ff !important;
}
.icon-holder.active .svg-mask{
    background: #00e1ff !important;
}
.icon-holder{
    /* background: #151517; */
    padding: 3px;
    border: 1px solid #ffffff00;
    border-radius: 3px;
    margin: 2px 2px;
    pointer-events: auto;
    align-items: center;
    cursor: pointer;
}
.icon-button{
    
}
.icon-holder:hover{
    background: #35495e91 !important;
    border: 1px solid white !important;
}
.icon-holder span{
    color:bisque;
}
.icon{
    cursor: pointer;
    height: 100%;
    width: 100%;
    border: none;
    border-radius: 3px; 
}
.icon-svg{
    -webkit-mask: var(--mask-svg-src) no-repeat center / contain;
    mask: var(--mask-svg-src) no-repeat center / contain;
}
</style>