import React, { useContext } from 'react';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import DataContext from '../store/BME_Data'

const CarbonWeeklyAverage = dynamic(() => import("../components/page_components/CarbonWeeklyAverage").then((mod) => mod),{ssr:false})


function CarbonWeeklyAveragePage()
{
  const dataCtx = useContext(DataContext)
  let Results = dataCtx.getWeeklyData()
  return (
    <>
      <Head>
        <title>Carbon Weekly Average Page</title>
      </Head>
      <CarbonWeeklyAverage data = { Results }/>
    </>
  )
}

export default CarbonWeeklyAveragePage;