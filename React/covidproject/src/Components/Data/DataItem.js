
function DataItem(props) {
    return(
        <li>
            <h1>Results</h1>
            <h2>2 - {props.temp}</h2>
            <h2>3 - {props.hum}</h2>
            <h2>4 - {props.pres}</h2>
            <h2>5 - {props.alt}</h2>
            <h2>6 - {props.en}</h2>
        </li>
    );
}

export default DataItem;