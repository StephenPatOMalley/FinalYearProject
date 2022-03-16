import DataItem from "./DataItem";

function DataList(props) {
    return(
        <ul>
            <DataItem 
                hum = {props.datas.humidity} 
                temp = {props.datas.temperature}
            />
        </ul>
    );
}

export default DataList;