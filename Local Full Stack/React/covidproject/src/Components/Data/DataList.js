import DataItem from "./DataItem";

function DataList(props) {
    return(
        <ul>
            {props.datas.map((data) => (
                <DataItem 
                    hum = {data.Humidity} 
                    temp = {data.Temperature}
                    alt = {data.Altitude} 
                    pres = {data.Pressure}
                    en = {data.EnableFan} 
                />
            ))}
        </ul>
    );
}

export default DataList;