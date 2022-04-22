import ReadingsTable from "./Table";

function DataList(props) {
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