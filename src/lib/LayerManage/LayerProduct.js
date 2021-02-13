import {Factory} from "@/lib/LayerManage/Factory"
// import Collection from "@/lib/LayerManage/Collection"
import UUID from "@/lib/LayerManage/UUID"

class Product
{
    constructor( option = {} )
    {
        this.name = option.name || `Layer_${String(new Date().getTime())}`
        this.payload = option.payload || {}
        this.id = UUID()
        this.type = option.type
        this.container = undefined
        this.madeBy = {}
    }
    generate( factory = new Factory() )
    {

        this.madeBy = {
            name:factory.name,
            id:factory.id
        }
        return new Promise( resolve =>
            {
                factory.work( this.payload ).then( instance =>
                    {
                        this.container = instance
                        resolve( this )
                    })
            })

    }
}

// class ProductCollection extends Collection
// {
//     constructor( name, option = {} )
//     {
//         super()
//     }
//     add( product )
//     {
//         super.add( product )
//     }
//     show()
//     {}
//     remove()
//     {}
//     removeById()
//     {}
// }

export default Product
