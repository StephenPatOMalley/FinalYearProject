import { useEffect, useState } from "react"

import DataList from "../Components/Data/DataList";

function MainPage(){
    const [isLoading, setIsLoading] = useState(true);
    const [loadedData, setLoadedData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch(
            'https://finalyear-651ba-default-rtdb.europe-west1.firebasedatabase.app/ESP32_APP.json'
        ).then(response => {
            return response.json();
        }).then((data) => {
            const ESP32_APP = [];
            
            for (const key in data) {
                const result = {
                  id: key,
                  ...data[key]
                };
      
                ESP32_APP.push(result);
            }
            setIsLoading(false);
            setLoadedData(ESP32_APP);
        })
    }, [isLoading]);


    if(isLoading){
        return(
        <section>
            <h1>Update</h1>
            <DataList datas={loadedData}/>
        </section>
        );
    }

    else{
        return(
            <section>
                <h1>Error</h1>
            </section>
        );
    }
}

export default MainPage;