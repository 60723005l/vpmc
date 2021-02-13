import UUID from "@/lib/LayerManage/UUID"
class Factory
{
    constructor( option = {} )
    {
        this.name = option.name || `factory_${String(new Date().getTime())}`
        this.id =  UUID()
        this.processer = option.processer || new Function()
        this.post_processer = option.post_processer || new Function()
    }
    set_processer( processer = () => {} )
    {
        this.processer = processer
    }
    set_post_processer( processer = () => {} )
    {
        this.post_processer = processer
    }
    work( payload )
    {
        return new Promise( resolve =>
            {   
                this.processer( payload ).then( p => 
                    {
                        this.post_processer( p, payload )
                        resolve( p)
                    })
            })

    }
}

// class TileLayerFactory extends Factory
// {
//     constructor( option = {} )
//     {
//         super()
//     }
// }

// class TileLayerFactory extends Factory
// {
//     constructor( option = {} )
//     {
//         super()
//     }
// }


 export {
    Factory,
    // TileLayerFactory
 }