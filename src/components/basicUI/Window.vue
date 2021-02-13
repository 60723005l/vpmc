<template>
    <div class="basic-window col"  :class="{'max-content':isResize, 'float':float}" :ref="draggableContainer">
        <div class="top-holder row" :ref="topHolderContainer">
            <div class="row btn">
                <div class="win-btn close" @click="onWindowClose">✖</div>
                <div class="win-btn close" @click="onWindowMax" v-if="isResize">🗖</div>
                <div class="win-btn min" @click="onWindowMin" v-if="isResize">🗕</div>
            </div>
            <div class="row title" 
                @mousedown="dragMouseDown($event,draggableContainer)" 
                @touchstart="T_dragMouseDown($event,draggableContainer)" >
                <span>{{title}}</span>
            </div>
        </div>
        <div class="container-holder" :ref="containerHolder">
            <slot name='windowBar'><div></div></slot>
            <div class="container" :class="{'resize':isResize}" :ref="resizableContainer">
                <slot name='body'></slot> 
            </div>
        </div>
        
    </div>
</template>
<script>
function _uuid()
     {
        var d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function')
        {
          d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c)
        {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
      }
export default {
    name:'Window',
    data()
        {
            return{
                draggableContainer:_uuid(),
                resizableContainer:_uuid(),
                topHolderContainer:_uuid(),
                containerHolder:_uuid(),
                componentPosition:
                {
                    clientX: undefined,
                    clientY: undefined,
                    movementX: 0,
                    movementY: 0
                },
            }
        },
    props: 
        {
            title:
            {
                type:String,
                default:''
            },
            float:
            {
                type:Boolean,
                default:false
            },
            resize:
            {
                type:Boolean,
                default:false
            },
        },
    computed:
        {
            isResize()
            {
                return this.float && this.resize ? true : false
            }
        },
    mounted()
        {
            if ( this.isResize ) this.initWindowSize()
        },
    methods:
        {
            onWindowClose()
            {
                this.$emit('onClose')
            },
            onWindowMax()
            {
                this.$emit('onMax')
                var holder_height = this.get_holders_height()
                this.$refs[this.resizableContainer].style.width = (window.innerWidth -20)+'px'
                this.$refs[this.resizableContainer].style.height = (window.innerHeight - holder_height -20)+'px'
                
                this.$refs[this.draggableContainer].style.top = (2)+'px'
                this.$refs[this.draggableContainer].style.left = (2)+'px'
            },
            onWindowMin()
            {
                this.$emit('onMin')
                this.$refs[this.resizableContainer].style.width = (0)+'px'
                this.$refs[this.resizableContainer].style.height = (0)+'px'
            },
            initWindowSize()
            {
                // this.$refs[this.resizableContainer].style.width
                // console.log(this.resizableContainer,this.$refs[this.resizableContainer])
                this.$refs[this.resizableContainer].style.height = '150px'
            },
            get_holders_height()
            {
                console.log(this.$refs[this.topHolderContainer] ,
                       this.$refs[this.containerHolder] )
                return this.$refs[this.topHolderContainer].offsetHeight + 
                       this.$refs[this.containerHolder].firstElementChild.offsetHeight 
            },
            dragMouseDown (event)
            {
                if ( !this.isResize ) return
                // console.log('MouseDown')
                // event.preventDefault()
                // get the mouse cursor position at startup:
                this.componentPosition.clientX = event.clientX
                this.componentPosition.clientY = event.clientY
                document.onmousemove = this.elementDrag
                document.onmouseup = this.closeDragElement
            },
            elementDrag (event)
            {
                // console.log('M_drag')
                var target_elem = this.$refs[this.draggableContainer]
                event.preventDefault()
                this.componentPosition.movementX = this.componentPosition.clientX - event.clientX
                this.componentPosition.movementY = this.componentPosition.clientY - event.clientY
                this.componentPosition.clientX = event.clientX
                this.componentPosition.clientY = event.clientY

                // set the element's new position:
                target_elem.style.top = (target_elem.offsetTop-5 - this.componentPosition.movementY) + 'px'
                target_elem.style.left = (target_elem.offsetLeft-5 - this.componentPosition.movementX) + 'px'
                if ( target_elem.offsetTop-5 < 5 ) target_elem.style.top = '5px'
                if ( target_elem.offsetLeft-5 < 5 ) target_elem.style.left = '5px'

            },
            closeDragElement ()
            {
                // console.log('close')
                document.onmouseup = null
                document.onmousemove = null
            },
            T_dragMouseDown (event)
            {
                if ( !this.isResize ) return
                // console.log('touchstart')
                // get the mouse cursor position at startup:
                this.componentPosition.clientX = event.touches[0].clientX
                this.componentPosition.clientY = event.touches[0].clientY
                document.ontouchmove  = this.T_elementDrag
                document.ontouchend = this.T_closeDragElement
            },
            T_elementDrag (event)
            {
                // console.log('M_drag')
                var target_elem = this.$refs[this.draggableContainer]
                // event.preventDefault()
                this.componentPosition.movementX = this.componentPosition.clientX - event.clientX
                this.componentPosition.movementY = this.componentPosition.clientY - event.clientY
                this.componentPosition.clientX = event.clientX
                this.componentPosition.clientY = event.clientY

                // set the element's new position:
                target_elem.style.top = (target_elem.offsetTop-5 - this.componentPosition.movementY) + 'px'
                target_elem.style.left = (target_elem.offsetLeft-5 - this.componentPosition.movementX) + 'px'
                if ( target_elem.offsetTop-5 < 5 ) target_elem.style.top = '5px'
                if ( target_elem.offsetLeft-5 < 5 ) target_elem.style.left = '5px'
            },
            T_closeDragElement ()
            {
                // console.log('close')
                document.ontouchend = null
                document.ontouchmove = null
            }
        },
    components: 
        {
            
        }
}
</script>
<style scoped>
.max-content{
    width: max-content;
}
.basic-window{
    
    /* border: 1px solid #3d3d3d; */
    border: 1px solid #41b883;
    border-radius: 3px;
    margin: 5px;
}
.top-holder{
    /* background: #313136; */
    background: #41b883;
    border-radius: 1px 1px 0px 0px;
    width: 100%;
    height: 20px;
    padding: 3px 0px;
}
.top-holder .btn{
    /* flex: 0.2; */
}
.top-holder .title{
    color: bisque;
    cursor:grab;
    flex: 1;
    justify-content: center;
}
.win-btn{
    cursor: pointer;
    color: #e2d3c2;
    /* border: 0.5px solid #655f58; */
    border: 1px solid #58cf99 ;
    border-radius: 3px;
    margin: 2px;
    width: 20px;
    height: 20px;
    text-align: center;
}
.win-btn:hover{
    /* background: #272727 ; */
    background: #43aa7c ;
    /* border: 1px solid #8f8f8f ; */
    border: 1px solid #58cf99 ;
}
.container-holder{
    /* background: #151517; */
    /* background: #e8e8e87d; */
}
.container{
    /* background: #151517; */
    background: #ffffffb0;
    padding: 5px;
    min-height: 150px;
    min-width: 250px;
    /* max-height: 50vh; */
}
.resize{
    width:300px;
    resize: both;
    overflow: auto;
}
.float{
    position: fixed;
    z-index: 10;
    box-shadow: rgb(0 0 0 / 71%) 5px 5px 15px 0px;
    border: 1px solid #ffffff66;
}
</style>