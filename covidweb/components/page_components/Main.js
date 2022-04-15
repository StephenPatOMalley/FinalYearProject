import { useContext } from 'react';
import dynamic from 'next/dynamic'

import TableDataList from '../table/TableDataList'
import DataContext from '../../store/BME_Data'

const CurrentReadingsGraph = dynamic(() => import("../dynamic/CurrentReadingsGraph").then((mod) => mod),{ssr:false})

function Main(){
    const dataCtx = useContext(DataContext)
    let currentData = dataCtx.getbmeData()
    console.log(currentData)
    return (
        <div>
            <div>
                <TableDataList data = {currentData}/>
            </div>
            <div>
                <CurrentReadingsGraph data = {currentData}/>
            </div>
        </div>
    )
}

export default Main;