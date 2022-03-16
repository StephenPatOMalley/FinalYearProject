import { useCallback, createContext, useState, useEffect} from 'react';

const initialDataState = {
    temperature: '20',
    humidity: '30'
}

const DataContext = createContext(initialDataState);

export function DataContextProvider(props) {
    const [dataObj, setDataObj] = useState(initialDataState)

    const fetchData = useCallback(async () => {
        fetch('api/getDataBaseAccess')
        .then((res) => res.json())
        .then((data) => {
            setDataObj(data)
        })
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    // see https://nextjs.org/docs/basic-features/data-fetching/client-side
    function getbmeData() {
        return dataObj
    }

    const context = {
        getbmeData: getbmeData
    };

    return (
        <DataContext.Provider value={context}>
            {props.children}
        </DataContext.Provider>
    );

}

export default DataContext;