



/**
 * @param {Array} option.input - Array-like table
 * @param {Array} option.header - header in array
 * @param {Boolean} option.isFirstRowHeader - Array like table, default true
 * @param {Boolean} option.isFirstColHeader - Array like table, default false
 */
class TableBuilder
{
    constructor( option = {} )
    {
        this.input = option.input || []
        this.header = option.header || []
        this.isFirstRowHeader = option.isFirstRowHeader === undefined ? true : option.isFirstRowHeader 
        this.isFirstColHeader = option.isFirstColHeader === undefined ? false : option.isFirstColHeader
        this.top_header_index = undefined
        this.init()
    }
    init()
    {
        if ( this.isFirstRowHeader )
        {
            this.header = this.input[0]
        }
        this.top_header_index = set_TH_index( this.header )
    }
    get body()
    {
        if ( this.isFirstRowHeader )
        {
            return this.input.slice(1)
        }
        return this.input
    }
    getRowByIndex(index)
    {
        return this.body[index]
    }
    getColByIndex(index)
    {
        return this.body.map( item =>
            {
                return item[index]
            })
    }
    getColByName(name)
    {
        var index = this.top_header_index[name]
        return this.body.map( item =>
            {
                return item[index]
            })
    }
    

}


function set_TH_index(header)
{
    var top_header_index = {}
    header.forEach( ( item, index ) =>
    {
        top_header_index[item] = index
    } )
    return top_header_index

}


export default TableBuilder

// module.exports = TableBuilder

