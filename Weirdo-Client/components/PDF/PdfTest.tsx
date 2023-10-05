import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic"
import {styled, Grid, Button} from "@mui/material"

import ReactPDF, { PDFDownloadLink, PDFViewer,  } from '@react-pdf/renderer';
import { checklistQuestions, template } from "./data"
// import ChecklistWrapper from './content/ChecklistWrapper'
import Link from 'next/link'
import { ChecklistContextProvider } from './content/ChecklistContext'
import PdfGenerator, { PDFDocument } from './PDFContent'
import PDFFile from './content/PDFFile';
import ReactSlider from "react-slider"
import cx from 'classnames';


const ChecklistWrapper = dynamic(() => import('./content/ChecklistWrapper'), {
  ssr: false,
});

const PdfTest = () => {
  const [client, setClient] = useState(false);
  const [seats, setSeats] = useState(0);

  useEffect(() => {
    // To defeat SSR
    setClient(true)
  }, [])

  console.log(checklistQuestions)
  return (
    <ChecklistContextProvider
        checklist={template}
        checklistQuestions={checklistQuestions}
    >
      <ChecklistWrapper />
      {/* <ReactSlider
        className="mt-14"
        marks
        min={1}
        max={100}
        defaultValue={seats}
        onChange={(value) => setSeats(value)}
        renderThumb={(props, state) => (
          <div
            {...props}
            style={{ ...props.style, zIndex: 20 }}
            className="relative flex flex-col items-center w-8 h-8 -mt-2 outline-none"
          >
            <div className="absolute top-0 inline-block px-2 py-1 mb-2 -mt-8 text-xs text-white bg-gray-900 rounded-sm whitespace-nowrap">
              {state.valueNow} user{state.valueNow > 1 && 's'}
            </div>
            <div className="w-8 h-8 bg-white border-4 border-blue-700 rounded-full shadow-lg cursor-pointer" />
          </div>
        )}
        renderTrack={(props, state) => (
          <div
            {...props}
            className={cx('h-4 rounded-full cursor-pointer', {
              'bg-gray-100': state.index === 1,
              'bg-blue-700 z-10': state.index === 0,
            })}
          />
        )}
      /> */}
      <Wrapper>
          {/* <PdfGenerator /> */}
          {client && (
              <Grid 
                sx={{
                  height: '100vh'
                }}
              >
                <PDFDownloadLink document={<PDFDocument content={'test'} checklistQuestions={checklistQuestions} />} fileName='Test form'>
                  {({loading}) => (loading ? (
                    <Button>Loading Document...</Button>
                  ): (
                    <Button>Download PDF</Button>
                  ))}
                </PDFDownloadLink>

                <PDFViewer style={{
                  width: '100%',
                  height: '100%'
                }}>
                  <PDFDocument content={'test'} checklistQuestions={checklistQuestions} />
                </PDFViewer>
              </Grid>
          )}
      </Wrapper>
    </ChecklistContextProvider>
  )
}

export default PdfTest


export const Wrapper = styled(Grid)(() => ({
    // border: 'solid 2px blue',
    // height: '100vh',
    display: 'flex',
    justifyContent: 'start',
    flexDirection: 'column',
    margin: 30
}));
