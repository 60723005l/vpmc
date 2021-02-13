import UUID from "@/lib/LayerManage/UUID"

class Collection
{
    constructor( name, option = {} )
    {
        this.name = name || `${this.name_prefix}_${String(new Date().getTime())}`
        this.name_prefix = option.name_prefix || 'Collection'
        this.id = UUID()
        this.value = []
    }
    add( item )
    {
        this.value.push( item )
    }
}

 export default Collection