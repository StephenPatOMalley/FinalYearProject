import React, { useContext } from 'react';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import DataContext from '../store/BME_Data'

const CarbonData = dynamic(() => import("../components/page_components/CarbonData").then((mod) => mod),{ssr:false})

async function Carbon24HourPage()
{
  const dataCtx = useContext(DataContext)
  let Results = await dataCtx.getlastDaybmeData()
  console.log(Results, "---")
  return (
    <>
      <Head>
        <title>Carbon 24 Hour Page</title>
      </Head>
      <CarbonData data = {Results}/>
    </>
  )
}


export default Carbon24HourPage;