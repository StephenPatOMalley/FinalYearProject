import React, { useContext } from 'react';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import DataContext from '../store/BME_Data'

//https://stackoverflow.com/questions/65522762/dynamically-import-a-library-with-next-js
//https://stackoverflow.com/questions/61062014/error-when-using-canvasjs-in-a-nextjs-app
//https://nextjs.org/docs/advanced-features/dynamic-import
//Links used to solve the graph loading bug
const CarbonAverage = dynamic(() => import("../components/page_components/CarbonAverage").then((mod) => mod),{ssr:false})

function Carbon24HourAveragePage()
{
  const dataCtx = useContext(DataContext)
  let Results = dataCtx.getlastDaybmeAverageData()
  console.log(Results)
  return (
    <>
      <Head>
        <title>Carbon 24 Hour Average Page</title>
      </Head>
      <CarbonAverage data = {Results}/>
    </>
  )
}

export default Carbon24HourAveragePage;