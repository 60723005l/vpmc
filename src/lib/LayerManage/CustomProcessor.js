import Leaflet from 'leaflet'
import TableBuilder from "@/lib/Parser/TableBuilder"
import PropertyBag from "@/lib/LayerManage/PropertyBag"
// const Marker = 
// {
//     processor()
//     {
//         var marker_option = 
//         {
//             icon: Leaflet.icon( { iconUrl: require('@/assets/logo.png'), iconSize: [50,50] } )
//         }
//         var marker = Leaflet.marker([25.03346062196884, 121.53289550083076], marker_option)
//     }
// }

const GeoJson = 
{
    processor( payload )
    {
        return new Promise( resolve =>
            {
                request( payload.url ).then( gjson =>
                    {
                        var result = Leaflet.geoJSON( gjson ).bindPopup( layer =>
                        {
                            return layer.feature.properties.description;
                        })
                        resolve( result )
                    })
            })
    }
}


var sample_csv = `案件編號,lat,lon,勘估標的類型,委託人,用途別,建物型態,建物結構,屋齡,使用分區,法定容積率,允建容積率,縣市,鄉鎮,地號,建號,門牌,土地持分面積(m2),建物持分面積(m2),價格日期,估價目的,權利種類,價格種類,估價方法１,權重１,估價方法２,權重２,估價作業,簽證估價師,評估總價,評估單價(元/坪(個)),報告電子檔,建物名稱,備註
UR2021020100002,25.036811,121.530162,土地,令狐?,住宅,公寓,加強磚造,40.0,第三種住宅區,225.00%,295.00%,台北市,中正區,臨沂段四小段116地號等4筆,--,臨沂街59巷20號," 1,244.00 "," 1,191.68 ",2020/01/15,資產價值證明,所有權,正常價格,比較法,50%,土地開發分析法,50%,張雅涵,黃景昇、李韋儒," 2,013,140,000 "," 5,349,685 ",UR2021020100002.pdf,,都市更新案件更新前
BK2021020300004,25.05681,121.523189,土地,日月神教股份有限公司,商業,--,--,--,第四種商業區(原屬第三種商業區),560.00%,784.00%,台北市,中山區,中山段三小段315地號等3筆,--,中山北路二段63號," 4,805.00 ", -- ,2020/02/10,金融機構貸款,地上權,特定價格,比較法,40%,價格比率法,60%,陳畇錙,張致嘉," 5,200,000,000 "," 3,577,541 ",BK2021020300004.pdf,,都更危老案件
CU2021020500006,25.054531,121.588509,土地,任盈盈,工業,透天厝,加強磚造,48.5,第三種工業區,300.00%,300.00%,台北市,南港區,玉成段一小段277地號,--,南港路三段106巷1之2號," 2,711.00 "," 2,366.00 ",2020/03/05,法院訴訟,所有權,正常價格,比較法,60%,直接資本化法,40%,趙保鈞,黃景昇," 178,800,000 "," 218,028 ",CU2021020500006.pdf,,建物未登記
BK2021020700008,25.028432,121.531335,區分建物,財團法人東方不敗基金會,住宅,公寓,加強磚造,36.0,第三種住宅區,225.00%,225.00%,台北市,大安區,金華段二小段127地號,金華段二小段2452建號,青田街2巷14號, 34.61 , 198.14 ,2020/04/20,會計財務報導,所有權,正常價格,比較法,70%,成本法,30%,羅登宇,黃火明," 152,570,000 "," 2,545,491 ",BK2021020700008.pdf,,
CM2021020900010,25.051777,121.562214,區分建物,祭祀公業任我行,辦公室,大樓,鋼筋混凝土造,18.2,第三種商業區(原屬第二種商業區)、第三種商業區(原屬第三種住宅區),501.81%,501.81%,台北市,松山區,西松段一小段133地號等2筆,西松段一小段5065建號等14筆,南京東路五段161號全棟," 1,744.00 "," 21,672.81 ",2020/05/25,市場價格買賣參考,所有權,正常價格,比較法,50%,直接資本化法,50%,許志賢,李韋儒," 6,666,600,000 "," 1,016,866 ",CM2021020900010.pdf, 保德信金融大樓 ,
CM2021021100010,25.051777,121.562214,車位,祭祀公業任我行,停車位(坡平),大樓,鋼筋混凝土造,18.2,第三種商業區(原屬第二種商業區)、第三種商業區(原屬第三種住宅區),--,--,台北市,松山區,西松段一小段133地號等2筆,西松段一小段5065建號等14筆,南京東路五段161號B2, -- , 34.45 ,2020/05/25,市場價格買賣參考,所有權,正常價格,比較法,100%,--,--,許志賢,李韋儒," 3,000,000 "," 3,000,000 ",CM2021021100010.pdf, 保德信金融大樓 ,
CM2021021300012,25.041129,121.543149,區分建物,藍鳳凰,店面,華廈,鋼筋混凝土造,23.0,交通用地(公共設施用地)、第三種商業區(原屬第二種商業區),393.91%,505.26%,台北市,信義區,懷生段二小段5地號等7筆,懷生段二小段5583建號,忠孝東路三段300號1樓, 70.42 ," 3,851.27 ",2020/06/01,徵收補償評估,所有權,正常租金,比較法,50%,直接資本化法,50%,林聲屏、曾昭恩,張致嘉," 16,800,000 "," 14,420 ",CM2021021300012.pdf, SOGO百貨復興館 ,
CM2021021500014,25.080412,121.559217,區分建物,向問天,旅館,大樓,鋼骨造,5.0,娛樂區(供觀光旅館使用),300.00%,450.00%,台北市,中山區,金泰段29地號,金泰段7272建號等100筆,樂群二路197號," 12,324.60 "," 101,602.29 ",2020/07/10,市場價格買賣參考,所有權,正常價格,成本法,30%,折現現金流量分析法,70%,曾昭恩,黃景昇," 8,888,800,000 "," 289,211 ",CM2021021500014.pdf, 台北萬豪酒店 ,台?好好看開發案件
CM2021021500016,25.062825,121.573325,區分建物,岳不?,百貨,廠辦,鋼骨造,11.0,科技工業區(D區),200.00%,200.00%,台北市,內湖區,舊宗段76-6地號等4筆,舊宗段2365、2368建號等2筆,堤頂大道一段331號全棟," 6,122.28 "," 20,065.87 ",2020/08/30,市場價格買賣參考,所有權,正常價格,成本法,20%,折現現金流量分析法,80%,方少松,黃火明," 2,858,304,423 "," 470,896 ",CM2021021500016.pdf, 燦坤企業總部 ,`
function createHtmlTable( header, row )
{
    var table_start = `<div class="vpmc-popup-content"><table><tbody>`,
        table_end = `</tbody></table></div>`
    header.forEach( (key, index) =>
        {
            var value = row[index]
            var td1 = `<td> ${key} </td>`,
                td2 = `<td> ${value} </td>`
            table_start += `<tr> ${td1} ${td2} </tr>`
        })
    return table_start + table_end
}
const VPMC_Demo = 
{
    processor( payload )
    {
        function createPropertyBag( my_table, row )
        {
            var bag = new PropertyBag()
            var header = my_table.header
            header.forEach( name =>
                {
                    bag.add( name, row[my_table.top_header_index[name]] )
                })
            return bag
        }
        return new Promise( resolve =>
            {
                var viewer = payload.viewer 
                var sample_data = sample_csv.split('\n').map(e=>e.split(','))
                var my_table = new TableBuilder( { input: sample_data } )
                var marker_option = { icon: Leaflet.icon( { iconUrl: require('@/assets/logo.png'), iconSize: [25,25] } ) }

                var header = my_table.header,
                    body = my_table.body,
                    marker_list = [],
                    bag;
                body.forEach( row =>
                    {
                        var lat = Number( row[my_table.top_header_index['lat']] ),
                            lon = Number( row[my_table.top_header_index['lon']] ),
                            marker = Leaflet.marker([lat, lon], marker_option)
                        var popup = Leaflet.popup()
                        .setLatLng( Leaflet.latLng(lat, lon) )
                        .setContent( createHtmlTable( header, row ) )
                        marker.bindPopup(popup)
                        marker_list.push(marker)
                        bag = createPropertyBag(my_table, row)
                        marker.properties = bag
                        marker._show = true
                        marker.__defineGetter__( 'show' , () =>
                        {
                            return marker._show
                        })
                        marker.__defineSetter__( 'show' , ( bool ) =>
                        {
                            marker._show = bool
                            if ( bool )
                            {
                                if ( viewer.hasLayer( marker ) ) 'pass'
                                else viewer.addLayer( marker )
                            }
                            else
                            {
                                if ( viewer.hasLayer( marker ) ) viewer.removeLayer( marker )
                                else 'pass'
                            }
                        })
                    })
                var result = Leaflet.featureGroup(marker_list)
                console.log(bag)
                result.propertyNames = bag.propertyNames
                viewer.addLayer(result)
                resolve(result)

            })
    }
}





function request(url)
{
    return new Promise( resolve =>
        {
            fetch( url ).then( resp => resp.json())
            .then( resp => resolve( resp ) )
        })
}

export {
    GeoJson,
    VPMC_Demo
}
