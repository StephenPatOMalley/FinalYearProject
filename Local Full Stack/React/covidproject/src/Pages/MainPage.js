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
            
            //Key is the area in which the data is stored on firebase i.e. Data
            for (const key in data) {
                const result = {
                  //id is the name of the key i.e. Data
                  id: key,
                  //Copys all of the data in the key and addeds it to reault an using the spread operator "..." 
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
            <DataList datas={loadedData}/>
        </section>
        );
    }

    else{
        return(
            <section>
                <h1>Connection Error</h1>
            </section>
        );
    }
}

export default MainPage;