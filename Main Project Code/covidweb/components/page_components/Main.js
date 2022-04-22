import { useContext } from 'react';
import dynamic from 'next/dynamic'

import TableDataList from '../table/TableDataList'
import DataContext from '../../store/BME_Data'

function Main(){
    const dataCtx = useContext(DataContext)
    let currentData = dataCtx.getbmeData()
    console.log(currentData)
    return (
        <div>
            <TableDataList data = {currentData}/>
        </div>
    )
}

export default Main;