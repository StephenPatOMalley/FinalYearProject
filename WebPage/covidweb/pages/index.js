import DataList from '../page_components/Data/DataList'
import { useContext } from 'react';
import DataContext from '../store/data-store.js'



const DUMMY = [
  {
      Humidity: 60.54,
      Temperature: 22,
      Altitude: 45,
      Pressure: 1013.25,
      EnableFan: 0,
  }
]

function HomePage(props)
{
  const dataCtx = useContext(DataContext)
  let temp = dataCtx.getTemperature()
  //console.log('-----', temp)
  return <DataList datas = {props.datas}/>
}

export async function getStaticProps() {
  // fetch data from an API or Database
  return {
      props: {
        datas: DUMMY
      },
      //Reloads the server web page after however many seconds if their
      // is data update requests
      revalidate: 10 // 10 is time in seconds
  };
}

export default HomePage;