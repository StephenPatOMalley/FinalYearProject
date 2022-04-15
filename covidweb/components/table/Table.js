import classes from './Table.module.css'
import { Table } from 'react-bootstrap';

function ReadingsTable(props) {
    var CO2 = props.carbon
    return(
        <div className={classes.container}>
            <Table striped bordered hover>
                <thead>
                    <th colSpan={2} className={classes.table_th}>Current Room Data</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Temperature </td>
                        <td>{props.temp} &#176;C</td>
                    </tr>
                    <tr>
                        <td>Humidity</td>
                        <td>{props.hum} %</td>
                    </tr>    
                    { CO2 <= 800
                    ? <tr className="table-success"><td>CO2</td><td>{props.carbon} PPM</td></tr>
                    : ( CO2 >= 800 && CO2 <= 1000
                        ? <tr className="table-warning"><td>CO2</td><td>{props.carbon} PPM</td></tr>
                        : ( CO2 <= 1500 && CO2 >= 1000
                        ? <tr className="table-danger"><td>CO2</td><td>{props.carbon} PPM</td></tr>
                        : <tr className="table-dark"><td>CO2</td><td>{props.carbon} PPM</td></tr>
                        )
                    )
                    } 
                </tbody>
            </Table>
        </div>
    );
}


export default ReadingsTable;