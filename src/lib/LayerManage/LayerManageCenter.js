import Collection from "@/lib/LayerManage/Collection"


class LayerManageCenter extends Collection
{
    constructor( name, option = {} )
    {
        super()
        this.layersInfo = []
    }
    add( item )
    {
        super.add( item )
        this.layersInfo = this.getLayersInfo()
    }
    getLayersInfo()
    {
        if ( this.value.length > 0 )
        {
            return this.value.map( prd => 
                {
                    console.log(prd)
                    return{
                        name: prd.name,
                        id: prd.id,
                        type: prd.type
                    }
                })
        }
        else return []

    }
    getById( id )
    {
        return this.value.filter( prd => prd.id === id )[0]
    }
    getByInfo( info )
    {
        return this.value.filter( prd => prd.id === info.id )[0]
    }
    removeById( id )
    {
        var index = this.value.indexOf( this.value.filter( prd => prd.id === id )[0] )
        if ( index != -1 ) this.value.splice( index, 1)
        else return false
        this.layersInfo = this.getLayersInfo()
    }
    removeByInfo( info )
    {
        var index = this.value.indexOf( this.value.filter( prd => prd.id === info.id )[0] )
        if ( index != -1 ) this.value.splice( index, 1)
        else return false
        this.layersInfo = this.getLayersInfo()
    }
}

export default LayerManageCenter
