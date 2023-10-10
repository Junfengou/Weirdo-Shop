import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic"
import {styled, Grid, Button, Stack} from "@mui/material"

import ReactPDF, { PDFDownloadLink, PDFViewer, Document, BlobProvider, pdf } from '@react-pdf/renderer';
import { checklistQuestions, template } from "./data"
// import ChecklistWrapper from './content/ChecklistWrapper'
import Link from 'next/link'
import { ChecklistContextProvider } from './content/ChecklistContext'
import {Merger, MergerTest, PDFDocument, SecondPDFDocument} from "./PDFContent"
import PDFMerger from "pdf-merger-js/browser"

const ChecklistWrapper = dynamic(() => import('./content/ChecklistWrapper'), {
  ssr: false,
});

interface FileType {
  file: JSX.Element
}

const PdfTest = () => {
  const [client, setClient] = useState(false);
  const [seats, setSeats] = useState(0);
  const [mergeUrl, setMergeUrl] = useState<string[]>([]);

  const test = [
    {
      comp: <PDFDocument content={'test'} checklistQuestions={checklistQuestions} />
    },
    {
      comp: <SecondPDFDocument />
    },
  ]

  const [trigger, setTrigger] = useState(false);

  const testArrUrl = new Set();

  useEffect(() => {
    // To defeat SSR
    setClient(true)
  }, [])

  useEffect(() => {
    if(testArrUrl.size != 0) {
      MergerTest(testArrUrl)
      // console.log(testArrUrl)
    }
  }, [trigger])

  return (
    <ChecklistContextProvider
        checklist={template}
        checklistQuestions={checklistQuestions}
    >
      <ChecklistWrapper />
      <Wrapper>
          {client && (
              <Grid 
                sx={{
                  height: '100vh'
                }}
              >
                <Button
                  onClick={() => setTrigger(true)}
                >
                  Merge PDF
                </Button>

                <PDFDownloadLink  document={<PDFDocument content={'test'} checklistQuestions={checklistQuestions} />} fileName='Test form'>
                  {({loading, blob, }) => {
                    // console.log(blob)
                    return (loading ? (
                    <Button>Loading Document...</Button>
                  ): (
                    <Button>Download PDF</Button>
                  ))}}
                </PDFDownloadLink>
                {/* <PDFViewer style={{
                    width: '100%',
                    height: '100%'
                  }}>
                  <PDFDocument content={'test'} checklistQuestions={checklistQuestions} />
                </PDFViewer> */}

                {
                  test.map((item, i) => (
                    <BlobProvider document={item.comp}>
                      {({url}) => {
                        testArrUrl.add(url)
                        return (
                          <></>
                        )
                      }}
                    </BlobProvider>
                  ))
                }

                <Stack
                  sx={{
                    flexDirection: 'row',
                    height: '85vh',
                    gap: 5
                  }}
                >
                  <PDFViewer style={{
                    width: '100%',
                    height: '100%'
                  }}>
                    <PDFDocument content={'test'} checklistQuestions={checklistQuestions} />
                  </PDFViewer>

                  <PDFViewer style={{
                    width: '100%',
                    height: '100%'
                  }}>
                    <SecondPDFDocument />
                  </PDFViewer>
                </Stack>
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