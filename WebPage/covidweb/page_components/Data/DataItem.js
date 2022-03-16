import classes from './DataItem.module.css'

function DataItem(props) {
    return(
        <div className={classes.dataItem}>
            <table className={classes.table}>
                <th colSpan={2}>Results</th>
                <tr>
                    <td>Temperature </td>
                    <td>{props.temp} &#176;C</td>
                </tr>
                <tr>
                    <td>Humidity</td>
                    <td>{props.hum}%</td>
                </tr>    
            </table>
        </div>
    );
}

export default DataItem;