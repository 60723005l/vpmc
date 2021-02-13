
class PropertyBag 
{
    constructor( bag = {} )
    {
        this.init( bag )
        this.propertyNames = []
    }
    init( bag )
    {
        Object.keys( bag ).forEach( name => 
            {
                this[ name ] = bag[ name ]
                this.propertyNames.push( name )
            })
    }
    add( key, value )
    {
        this[ key ] = value
        this.propertyNames.push( key )
    }
    remove( key )
    {
        var index = this.propertyNames.indexOf( this.propertyNames.filter( name => name === key )[0] )
        if( index >= 0) this.propertyNames.splice( index, 1)
        this[ key ] = null
    }
    toTable()
    {
        var result = []
        this.propertyNames.forEach( name => result.push( name ))
        this.propertyNames.forEach( name => 
            {
                result.push( this[ key ] )
            })
    }
}

export default PropertyBag