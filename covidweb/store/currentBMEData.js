import { useCallback, createContext, useState, useEffect} from 'react';

const initialDataState = {
    timeStamp: '',
    temperature: '',
    humidity: ''
}

const CurrentDataContext = createContext(initialDataState);

export function CurrentDataContextProvider(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [dataObj, setDataObj] = useState(initialDataState)

    const fetchData = useCallback(async () => {
        fetch('api/getCurrentBMEData')
        .then((res) => res.json())
        .then((data) => {
            setDataObj(data)
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
        return dataObj
    }

    const context = {
        getbmeData: getbmeData
    };

    return (
        <CurrentDataContext.Provider value={context}>
            {props.children}
        </CurrentDataContext.Provider>
    );

}

export default CurrentDataContext;