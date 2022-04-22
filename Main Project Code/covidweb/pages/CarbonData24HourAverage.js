import React, { useContext } from 'react';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import DataContext from '../store/BME_Data'

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