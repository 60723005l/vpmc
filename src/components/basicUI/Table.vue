<template>
    <div class="basic-Table">
        <Blocker :type="'load'" v-if="isLoading"></Blocker>
        <caption class="filter-bar">
            <IconButton
                style="width:25px; height:25px;"
                :svg_base64="svg_base64.filter"/>
        </caption>
        <div class="basic-Table" :style="{ 'height':height, 'width':width }">
            <table class="b-table" >
                <thead>
                    <tr>
                        <th class="sticky" v-for="(item, index) in head" :key="index">
                            <div class="col">
                                <div class="row" style="justify-content: space-between;">
                                    <div>{{item}}</div>
                                    <ul giap-type="search" @click="activeSearch(index)">⌕</ul>
                                    <ul @click="sortByWorker(index)">
                                        <span v-if="local_head[index] === 'asc'">▲</span>
                                        <span  v-if="local_head[index] === 'desc'">▼</span>
                                        <span  v-if="local_head[index] === undefined">▲</span>
                                    </ul>
                                </div>
                                <div class="search" giap-type="search" v-if=" index === active_search_id" >
                                    <input type="text" giap-type="search" placeholder="search..." v-model="searchInput[index]" @change="seachInputChange(index)">
                                </div>
                            </div>
                            
                        </th>
                    </tr>
                </thead>
                <!-- <div> -->
                    <tbody class="filter" v-if="filter_body.length > 0">
                        <tr v-for="row in filter_body" :key="row.index">
                            <td v-for="item in row" :key="item.index">{{item}}</td>
                        </tr>
                    </tbody>
                <!-- </div> -->
                
                <tbody>
                    <tr v-for="row in local_body" :key="row.index">
                        <td v-for="item in row" :key="item.index">{{item}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import IconButton from '@/components/component/basicUI/IconButton' 
import Blocker from '@/components/component/basicUI/Blocker' 
var defaultTable = 
{
    head:
    [
        'th1','th2','th3','th1','th2','th3','th1','th2','th3',
    ],
    body:
    [
        [1,'andy','a',1,'andy','a',1,'andy','a'],
        [2,'candy','b',1,'andy','a',1,'andy','a'],
        [3,'josh','c',1,'andy','a',1,'andy','a'],
        [4,'python','b',1,'andy','a',1,'andy','a'],
        [5,'javascript','c',1,'andy','a',1,'andy','a'],
        [6,'chrome','a',1,'andy','a',1,'andy','a'],
        [7,'firefox','b',1,'andy','a',1,'andy','a'],
        [1,'andy','a',1,'andy','a',1,'andy','a'],
        [2,'candy','b',1,'andy','a',1,'andy','a'],
        [3,'josh','c',1,'andy','a',1,'andy','a'],
        [4,'python','b',1,'andy','a',1,'andy','a'],
        [5,'javascript','c',1,'andy','a',1,'andy','a'],
        [6,'chrome','a',1,'andy','a',1,'andy','a'],
        [7,'firefox','b',1,'andy','a',1,'andy','a'],
        [1,'andy','a',1,'andy','a',1,'andy','a'],
        [2,'candy','b',1,'andy','a',1,'andy','a'],
        [3,'josh','c',1,'andy','a',1,'andy','a'],
        [4,'python','b',1,'andy','a',1,'andy','a'],
        [5,'javascript','c',1,'andy','a',1,'andy','a'],
        [6,'chrome','a',1,'andy','a',1,'andy','a'],
        [7,'firefox','b',1,'andy','a',1,'andy','a'],
    ],
    head_:()=>
    {
        return ['number','tag','string','mix']
    },
    body_: ()=>
    {
        var result = []
        var rows_length = 1000
        var col_types = ['number','tag','string','mix']
        for (let r = 0; r < rows_length; r++)
        {
            let row = []
            for (let c = 0; c < col_types.length; c++)
            {
                let col_type = col_types[c]
                switch ( col_type )
                {
                    case 'number':
                        row.push( Math.floor( Math.random() * 1000 ) )
                        break;
                    case 'tag':
                        row.push( Math.floor( Math.random() * 10 ) )
                        break;
                    case 'string':
                        row.push( randomStr( Math.floor( Math.random() * 10 ) ) )
                        break;
                    case 'mix':
                        if ( c % 2) row.push( randomStr( Math.floor( Math.random() * 10 ) ) )
                        else row.push( Math.floor( Math.random() * 1000 ) )
                        break;
                }
            }
            result.push(row)
        }
        return result
        function randomStr(length) 
        {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) 
            {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
    }
}
export default {
    name:'Table',
    data()
        {
            return {
                svg_base64 :
                {
                    filter:require('@/assets/svg/ICONS_filter.svg')
                },
                local_head:{},
                local_body:[],
                filter_body:[],
                filtered_local_body:[],
                isLoading:false,
                active_search_id: undefined,
                searchInput:{}

            }
        },
    props: 
        {
            head:
            {
                type:Array,
                default:()=>defaultTable.head_()
            },
            body:
            {
                type:Array,
                default:()=>defaultTable.body_()
            },
            height:
            {
                type:String,
                default:'100%'
            },
            width:
            {
                type:String,
                default:'100%'
            }
        },
    mounted() 
        {
            this.local_body = Object.assign([],this.body)
            this.head.forEach( ( item, index ) =>
            {
                this.searchInput[index] = ''
            })
        },
    watch:
        {
            body(val)
            {
                this.local_body = Object.assign([],val)
            }
        },
    updated() 
        {
            console.log('updated!!!')
        },
    methods: 
        {
            create_local_head()
            {
                this.local_head
            },
            activeSearch(index)
            {
                var self = this
                window.onclick = clickEvent
                function clickEvent( event )
                {
                    // console.log(event)
                    if( event.target.getAttribute('giap-type') != 'search' )//點擊非search
                    { 
                        // console.log('點擊search bar 之外')
                        self.active_search_id = undefined
                        window.onclick = null
                        
                    }
                    else //點擊search
                    {
                        if ( self.active_search_id === undefined )//點擊search 且目前尚沒有啟動的search
                        {
                            // console.log('點擊search，目前尚沒有啟動的search')
                            self.active_search_id = index
                        }
                        else//點擊search 且目前已有啟動的search
                        {
                            if ( self.active_search_id != index )//若已啟動的search不是同一個
                            {
                                // console.log('點擊search，目前有啟動的search，且不是同一個')
                                window.onclick = null
                                self.active_search_id = undefined
                            }
                            else
                            {
                                // console.log('點擊search，目前有啟動的search，是同一個')
                            }
                            
                            
                        }
                    }
                }
                

            },
            seachInputChange(index)
            {
                this.$nextTick(()=>
                {
                    console.log(index, this.searchInput[index])
                    Object.keys(this.searchInput).forEach((item,_index)=>
                    {
                        if ( item != index ) this.searchInput[item] = ''
                    })
                    if(this.searchInput[index] === '') this.filter_body = []
                    else  this.searchByWorker(index, this.searchInput[index])

                })
            },
            searchByWorker(index, text)
            {
                this.$worker.run(
                    (data, index, text) =>
                    {
                        var local_body = data.local_body
                        var local_head = data.local_head
                        var filter_body = local_body.filter(row=>
                        {
                            return row[index].toLocaleString().search( new RegExp( text, 'i') ) != -1
                        })
                        return filter_body
                    },
                    [this.$data, index, text]
                ).then( (filter_body) =>
                    {
                        this.filter_body = filter_body
                    } )
                .catch(e=>console.error('fffuck',e))
            },
            sortByWorker(index)
            {
                this.beforSortEvent()
                this.$worker.run(
                    (data, index) =>
                    {
                        var local_body = data.local_body
                        var local_head = data.local_head
                        sortCol(index)
                        return {local_body,local_head}

                        function sortCol(index)
                        {
                            var sort_moethod = set_sort_config(index)

                            if ( sort_moethod === 'asc' )
                            {
                                local_body.sort((a,b) => 
                                {
                                    if ( isNaN( Number( a[index] ) ) ) //string
                                    {
                                        let item_a = a[index].toLocaleString(),
                                        item_b = b[index].toLocaleString()
                                        return item_a.localeCompare(item_b);
                                    }
                                    else //number
                                    {
                                        let item_a = a[index],
                                            item_b = b[index]
                                        if (item_a > item_b) return 1;
                                        if (item_a < item_b) return -1;
                                        return 0;
                                    }
                                });
                            }
                            else
                            {
                                local_body.sort((a,b) => 
                                {
                                    if ( isNaN( Number( a[index] ) ) ) //string
                                    {
                                        let item_a = a[index].toLocaleString(),
                                        item_b = b[index].toLocaleString()
                                        return item_b.localeCompare(item_a);
                                    }
                                    else //number
                                    {
                                        let item_a = a[index],
                                            item_b = b[index]
                                        if (item_a > item_b) return -1;
                                        if (item_a < item_b) return 1;
                                        return 0;
                                    }
                                });
                            }

                        }
                        function set_sort_config(index)
                        {
                            switch (local_head[index])
                            {
                                case 'desc': //大到小
                                    local_head[index] = 'asc'//小到大
                                    break;
                                case 'asc': //小到大
                                    local_head[index] = 'desc'//大到小
                                    break;
                                case undefined:
                                    local_head[index] = 'asc'
                                    break
                            }
                            return local_head[index]

                        }
                    }, 
                    [ this.$data, index])
                .then(({local_body,local_head})=>
                    {
                        this.local_body = local_body
                        this.local_head = local_head
                        this.afterSortEvent()
                    })
                .catch(e=>console.error('fffuck',e)) 
            },
            beforSortEvent()
            {
                this.isLoading = true
                console.log('before')
            },
            afterSortEvent()
            {
                this.isLoading = false
                console.log('after')
            },
            sortCol(index)
            {
                var t1 = new Date()
                var sort_moethod = this.set_sort_config(index)
                var sort_by_method = (index, sort_moethod) =>
                {
                    if ( sort_moethod === 'asc' )
                    {
                        this.local_body.sort((a,b) => 
                        {
                            let item_a = a[index].toLocaleString(),
                                item_b = b[index].toLocaleString()
                            return item_a.localeCompare(item_b);
                        });
                    }
                    else
                    {
                        this.local_body.sort((a,b) => 
                        {
                            let item_a = a[index].toLocaleString(),
                                item_b = b[index].toLocaleString()
                            return item_b.localeCompare(item_a);
                        });
                    }
                }
                sort_by_method(index, sort_moethod)
                var t2 = new Date()
                console.log('vue sort time used:',t2-t1)
            },
            set_sort_config(index)
            {
                switch (this.local_head[index])
                {
                    case 'desc': //大到小
                        this.local_head[index] = 'asc'//小到大
                        break;
                    case 'asc': //小到大
                        this.local_head[index] = 'desc'//大到小
                        break;
                    case undefined:
                        this.local_head[index] = 'asc'
                        break
                }
                return this.local_head[index]

            },
        },
    components:
        {
            IconButton,Blocker
        }
}
</script>
<style scoped>
.basic-Table{
    background: #303336;
    /* flex-wrap: wrap; */
    min-height: 20px;
    border: 1px solid #43444c;
    overflow: auto;
}
.b-table {
  border-collapse: collapse;
  /* border: 1px solid black; */
}

.b-table {
    border-collapse: collapse;
    font-size: 0.9em;
    font-family: sans-serif;
}
.b-table thead tr {
    background-color: #1e1e1e;
    color: bisque;
    text-align: left;
}

.sticky{
    position: sticky;
    top: -0.5px;
}
.b-table thead th{
    padding: 5px 10px;
    border-right: 1px solid #424242;
    background-color: #1e1e1e;
    color: bisque;
    text-align: left;

}
.b-table thead th > div{
    justify-content: space-around;
    user-select: none;
}
.b-table thead th ul{
    justify-content: space-around;
    font-size: xx-small;
    margin-left: 5px;
    color: #909090;
    cursor: pointer;
}
.b-table thead th ul:hover{
    color: white;
}
.b-table td {
    padding: 5px 10px;
    border-right: 1px solid #424242;
}

.b-table tbody{
    color: #e1e1e1;
}

 .b-table tbody:after {
    content:"@";
    display:block;
    line-height:25px;
    text-indent:-99999px;
}
.b-table tbody.filter tr:nth-of-type(even) {
    background-color: #777777;
}
.b-table tbody.filter tr:nth-of-type(odd) {
    background-color: #555555;
}
.b-table tbody.filter td{
    color: bisque;
}

.b-table tbody.filter tr:last-of-type {
    border-bottom: 3px solid #e1ebea;
}

/* .b-table tbody tr {
    border-bottom: 1px solid #dddddd;
} */

.b-table tbody tr:nth-of-type(even) {
    background-color: #525252;
}
.b-table tbody tr:nth-of-type(odd) {
    background-color: #333333;
}

.b-table tbody tr:last-of-type {
    border-bottom: 3px solid #acacac;
}

.search{
    position: absolute;
    top: 27px;
    left: -10px;
    border: 3px solid #1e1e1e;
    border-top: 7px solid #1e1e1e;
    border-left: 7px solid #1e1e1e;
}

</style>