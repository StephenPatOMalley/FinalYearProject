import { useContext } from 'react';

import DataContext from '../../store/lastDayBMEData'

function CarbonData(){
    const dataCtx = useContext(DataContext)
    let yesterday = dataCtx.getlastDaybmeData()
    console.log(yesterday)
    return(
        <title>Carbon Data</title>
    )
}

export default CarbonData;