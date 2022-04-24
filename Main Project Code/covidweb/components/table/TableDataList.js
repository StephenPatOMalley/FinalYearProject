import ReadingsTable from "./Table";

function DataList(props) {
    // The data recived from the API is an object in an Array but the initial
    // set data of 0 is an jsut and object so we check to set if it an array
    // or not.
    if (Array.isArray(props.data) === true)
    {
        return(
            <ul>
                <ReadingsTable 
                    hum = {props.data[0].Humidity} 
                    temp = {props.data[0].Temperature}
                    carbon = {props.data[0].CarbonDioxide}
                />
            </ul>
        );
    }
    else{
        {
            return(
                <ul>
                    <ReadingsTable 
                        hum = {props.data.Humidity} 
                        temp = {props.data.Temperature}
                        carbon = {props.data.CarbonDioxide}
                    />
                </ul>
            );
        }
    }
}

export default DataList;