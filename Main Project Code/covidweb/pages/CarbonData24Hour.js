import React, { useContext } from 'react';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import DataContext from '../store/BME_Data'

//https://stackoverflow.com/questions/65522762/dynamically-import-a-library-with-next-js
//https://stackoverflow.com/questions/61062014/error-when-using-canvasjs-in-a-nextjs-app
//https://nextjs.org/docs/advanced-features/dynamic-import
//Links used to solve the graph loading bug
const CarbonData = dynamic(() => import("../components/page_components/CarbonData").then((mod) => mod),{ssr:false})

function Carbon24HourPage()
{
  const dataCtx = useContext(DataContext)
  let Results = dataCtx.getlastDaybmeData()
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