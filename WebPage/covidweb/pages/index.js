import DataList from '../page_components/Data/DataList'
import { useContext } from 'react';
import DataContext from '../store/data-store.js'

function HomePage()
{
  const dataCtx = useContext(DataContext)
  let noOfEmployees = dataCtx.getbmeData()
  console.log(noOfEmployees)
  return <DataList datas = {noOfEmployees}/>
}

/*
export async function getStaticProps() {
  // fetch data from an API or Databas
  const res = await fetch('http://localhost:3003/getbmeData', {method: 'POST'})
  const datas = await res.json()
  console.log(datas)

  return {
      props: {
        datas
      },
      //Reloads the server web page after however many seconds if their
      // is data update requests
      revalidate: 10 // 10 is time in seconds
  };
}
*/

export default HomePage;