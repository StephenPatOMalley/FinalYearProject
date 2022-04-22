import { useCallback, createContext, useState, useEffect} from 'react';

const initialDataState = {
    TimeStamp: '',
    Temperature: 0,
    Humidity: 0,
    CarbonDioxide: 0
}

const DataContext = createContext(initialDataState);

export function DataContextProvider(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [dataObjCurrent, setDataObjCurrent] = useState(initialDataState)
    const [dataObjLast, setDataObjLast] = useState(initialDataState)
    const [dataObjWeekly, setDataObjWeekly] = useState(initialDataState)
    const [dataObjLastAverage, setDataObjLastAverage] = useState(initialDataState)

    const fetchData = useCallback(async () => {
        fetch('api/getCurrentBMEData')
        .then((res) => res.json())
        .then((data) => {
            setDataObjCurrent(data)
            setIsLoading(false);
        })
    }, [isLoading])

    //https://www.w3schools.com/react/react_useeffect.asp - Effect Cleanup
    useEffect(() => {
        let timer = setTimeout(() => {
            fetchData()
        }, 1000)

        return () => clearTimeout(timer)
    }, [fetchData])

    // see https://nextjs.org/docs/basic-features/data-fetching/client-side
    function getbmeData() {
        setIsLoading(true);
        return dataObjCurrent
    }

    useEffect(() => {
        fetch('api/getLastDayBMEData')
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setDataObjLast(data)
        })
    }, []);

    function getlastDaybmeData() {
        return dataObjLast
    }

    useEffect(() => {
        fetch('api/getLastDayBMEAverageData')
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setDataObjLastAverage(data)
        })
    }, []);

    function getlastDaybmeAverageData() {
        return dataObjLastAverage
    }

    useEffect(() => {
        fetch('api/getWeeklyData')
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setDataObjWeekly(data)
        })
    }, []);

    function getWeeklyData() {
        return dataObjWeekly
    }

    const context = {
        getbmeData: getbmeData,
        getlastDaybmeData: getlastDaybmeData,
        getWeeklyData: getWeeklyData,
        getlastDaybmeAverageData: getlastDaybmeAverageData,
    }

    return (
        <DataContext.Provider value={context}>
            {props.children}
        </DataContext.Provider>
    );

}

export default DataContext;