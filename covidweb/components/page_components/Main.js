import { useContext } from 'react';

import DataList from '../Data/DataList'
import CurrentDataContext from '../../store/currentBMEData'

function Main(){
    const dataCtx = useContext(CurrentDataContext)
    let noOfEmployees = dataCtx.getbmeData()
    console.log(noOfEmployees)
    return <DataList datas = {noOfEmployees}/>
}

export default Main;