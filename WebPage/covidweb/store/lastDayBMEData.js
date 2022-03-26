import { useCallback, createContext, useState, useEffect} from 'react';

const initialDataState = {
    timeStamp: '',
    temperature: '',
    humidity: ''
}

const YesterdayDataContext = createContext(initialDataState);

export function YesterdayDataContextProvider(props) {
    const [dataObj, setDataObj] = useState(initialDataState)

    useEffect(() => {
        fetch('api/getLastDayBMEData')
        .then((res) => res.json())
        .then((data) => {
            setDataObj(data)
        })
    }, []);

    // see https://nextjs.org/docs/basic-features/data-fetching/client-side
    function getlastDaybmeData() {
        return dataObj
    }

    const context = {
        getlastDaybmeData: getlastDaybmeData
    };

    return (
        <YesterdayDataContext.Provider value={context}>
            {props.children}
        </YesterdayDataContext.Provider>
    );

}

export default YesterdayDataContext;