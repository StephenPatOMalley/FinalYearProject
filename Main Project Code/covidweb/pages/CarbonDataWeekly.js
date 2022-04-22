import React, { useContext } from 'react';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import DataContext from '../store/BME_Data'

const CarbonWeeklyData = dynamic(() => import("../components/page_components/CarbonWeeklyData").then((mod) => mod),{ssr:false})

function CarbonWeeklyPage()
{
  const dataCtx = useContext(DataContext)
  let Results = dataCtx.getWeeklyData()
  return (
    <>
      <Head>
        <title>Carbon Weekly Page</title>
      </Head>
      <CarbonWeeklyData data = { Results }/>
    </>
  )
}

export default CarbonWeeklyPage;