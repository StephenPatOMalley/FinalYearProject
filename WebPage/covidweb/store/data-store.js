import { createContext, useState } from 'react';

const initialDataState = {
    temperature: '20'
}

const DataContext = createContext(initialDataState);

export function DataContextProvider(props) {
    const [dataObj, setDataObj] = useState(initialDataState)

    function getTemperature() {
        fetch('api/getDataBaseAccess')
        .then((res) => res.json())
        .then((data) =>{
            setDataObj(data)
        })
        return dataObj.temperature
    }

    const context = {
        getTemperature: getTemperature
    };

    console.log(context)

    return (
        <DataContext.Provider value={context}>
            {props.children}
        </DataContext.Provider>
    );
}

export default DataContext;