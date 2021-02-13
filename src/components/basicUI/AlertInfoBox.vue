<template>
    <div v-if="isOpen">
        <div class="blocker"></div>
        <div class="infobox col">
            <div class="header row">
                <div class="close row" v-if="mode === 'alert'" @click="onOkorClose">✖</div>
                <span class="title row">{{title}}</span>
            </div>
            <div class="content col">
                <slot></slot>
            </div>
            <div class="footer row" v-if="mode === 'confirm'">
                <div class="r1-2"><button class="giap-button"  @click="onCommit(false)">cancel</button></div>
                <div class="r1-2"><button class="giap-button"  @click="onCommit(true)">ok</button></div>
            </div>
            <div class="footer row" v-if="mode === 'alert'">
                <div class="r1-1"><button class="giap-button" @click="onOkorClose">ok</button></div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name:'AlertInfoBox',
    data() 
        {
            return {
                isOpen:true
            }
        },
    props:
        {
            title:
            {
                type:String,
                default:'info box'
            },
            mode:
            {
                type:String,
                default:'alert',
                validator: function (value)
                {
                    return ['alert', 'confirm'].indexOf(value) !== -1
                }
            },
            open:
            {
                type: Boolean,
                default: false
            },
            true_confirmCallback:
            {
                type:Function,
                default: ()=>{}
            },
            callback_params:
            {
                type:Object,
                default:()=>{}
            },
            false_confirmCallback:
            {
                type:Function,
                default: ()=>{}
            },
            ok_callback:
            {
                type:Function,
                default: ()=>{}
            }
        },
    mounted()
        {
            this.set_KeyupEvent()
        },
    methods:
        {
            onCommit(bool)
            {
                if ( this.mode === 'confirm' )
                {
                    this.$emit('onConfirm',bool)
                    if(bool) this.true_confirmCallback(this.callback_params)
                    else this.false_confirmCallback(this.callback_params)
                    this.isOpen = false
                    document.removeEventListener('keyup', this.handleEnter)
                    document.removeEventListener('keyup', this.handleEsc)
                }

            },
            onOkorClose()
            {
                if ( this.mode === 'alert' )
                {
                    this.ok_callback(this.callback_params)
                    this.isOpen = false
                    document.removeEventListener('keyup', this.handleEnter)
                    document.removeEventListener('keyup', this.handleEsc)
                }
                
            },
            set_KeyupEvent()
            {
                document.addEventListener('keyup', this.handleEnter)
                // document.addEventListener('keyup', this.handleEsc)
            },
            handleEnter(event)
            {
                if ( event.key === "Enter" )
                {
                    this.onCommit(true)
                    // this.onOkorClose()
                    document.removeEventListener('keyup', this.handleEnter)
                }
            },
            handleEsc(event)
            {
                if ( event.key === "Escape" )
                {
                    this.onCommit(false)
                    // this.onOkorClose()
                    document.removeEventListener('keypress', this.handleEsc)
                }
            }
        }
}

</script>
<style scoped>
.blocker{
    background: rgba(44, 44, 44, 0.438);
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index:5;
}
.infobox{
    position: fixed;
    background: #3c3c3cde;
    color: bisque;
    border-radius: 3px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index:5;
}

.infobox .header{
    border-radius: 3px;
    background: #2c2c2c;
    border: 1px solid #4f4f4f;
    padding: 5px;
}
.infobox .footer{
    border-top: 1px solid #5f5f5f;
    padding: 5px;
}
.infobox .footer div{
    justify-content: center;
}
.infobox .footer div button{
    min-width: 70px;
}
.header .close{
    cursor: pointer;
    padding: 5px 10px;
    background: #353535;
    border: 1px solid #4f4f4f;
    border-radius: 3px;
}
.header .close:hover{
    background: #414141;
}
.header .title{
    width: 100%;
    user-select: none;
    justify-content: center;
    font-weight: bolder;
    font-size: larger;
}
.infobox .content{
    padding: 5px 15px;
    justify-content: center;
    min-width: 400px;
    min-height: 100px;
    max-width: 500px;
    max-height: 200px;
    overflow: auto;
    justify-content: flex-start;
}
</style>