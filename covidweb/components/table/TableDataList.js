import ReadingsTable from "./Table";

function DataList(props) {
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

export default DataList;