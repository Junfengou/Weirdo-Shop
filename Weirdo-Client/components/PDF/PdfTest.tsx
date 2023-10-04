import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic"
import {styled, Grid, Button} from "@mui/material"

import ReactPDF, { PDFDownloadLink, PDFViewer,  } from '@react-pdf/renderer';
import { checklistQuestions, template } from "./data"
import ChecklistWrapper from './content/ChecklistWrapper'
import Link from 'next/link'
import { ChecklistContextProvider } from './content/ChecklistContext'
import PdfGenerator, { PDFDocument } from './TestContent'
import PDFFile from './content/PDFFile';

const PdfTest = () => {
  const [client, setClient] = useState(false);

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
      <Wrapper>
          {/* <PdfGenerator /> */}
          {client && (
              <Grid 
                sx={{
                  // border: 'solid 2px red',
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
                  // border: 'solid 2px blue',
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
    height: '100vh',
    display: 'flex',
    justifyContent: 'start',
    flexDirection: 'column'
}));
