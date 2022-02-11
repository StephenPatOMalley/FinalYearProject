import DataList from '../page_components/Data/DataList'

const DUMMY = [
  {
      hum: 60.54,
      temp: 22,
      alt: 45,
      pres: 1013.25,
      en: 0,
  }
]

function HomePage(props){

  return <DataList dataDum = {props.data} />
}

export async function getStaticProps() {
  // fetch data from an API or Database
  return {
      props: {
        dataDum: DUMMY
      },
      //Reloads the server web page after however many seconds if their
      // is data update requests
      revalidate: 10 // 10 is time in seconds
  };
}

export default HomePage;