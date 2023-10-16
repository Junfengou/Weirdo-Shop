import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic"
import {styled, Grid, Button, Stack} from "@mui/material"

import ReactPDF, { PDFDownloadLink, PDFViewer, Document, BlobProvider, pdf } from '@react-pdf/renderer';
import { checklistQuestions, template } from "./data"
// import ChecklistWrapper from './content/ChecklistWrapper'
import Link from 'next/link'
import { ChecklistContextProvider } from './content/ChecklistContext'
import {MergerTest, PDFDocument, SecondPDFDocument} from "./PDFContent"
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

  const PdfComponentArray = [
    {
      comp: <PDFDocument content={'test'} checklistQuestions={checklistQuestions} />
    },
    {
      comp: <SecondPDFDocument />
    },
  ]

  const [trigger, setTrigger] = useState(false);


  // The only difference between these 2 links are expiration date
    // Weird issue:
      // The pdf is able to be downloaded through inputting in the url search bar, but unable to be merged due to issues with fetching the file...Why? 
  const testUrl = `https://dev-files.onestaffmedical.com/Traveler/Resumes/1b02c1c5-e271-4f1a-9c4f-b2b728f0d577-FAKE-Resume.docx?response-content-disposition=attachment%3bfilename%3dKira_Zubrinich.pdf&Expires=1697467870&Signature=BegJRqxJoEOsiJAC9vll7toYtnrxa09ST9D3F2J-EqHVGTQ0mzfGTD1Il~Bna2bONNbOGHpJ73C3OGduUIUtl-I62Yto0QmTeFcvs2V~FVWBRcuwamOgtu36IxEnHZwHal4heprc1Rnu7HO~wiZqX8vyN6doGxwNMLSy7YwV38bcvz8w2teXvWverG4BVBIe~aC1Kn0Qxe6UC0~qn0MXjfE6bGbtF3xkIMkAULmiLQacmMxczbLUSkjimR1JRYoZSPxnz859idmC2vP2~V1S9dPPykxzMznEUo7BN1G3bUoUIFuePvGOSU6smQmYYpNuaiwcbtjVagr6bH4-6m3hGw__&Key-Pair-Id=K14PPJZQE6T72P`
  const testTest = 'https://dev-files.onestaffmedical.com/Traveler/Resumes/1b02c1c5-e271-4f1a-9c4f-b2b728f0d577-FAKE-Resume.docx?response-content-disposition=inline%3bfilename%3dKira_Zubrinich.pdf&Expires=1697469990&Signature=iwLMWGZPbPOILjSGJ-8MRl2lAlkN~roW6E2eLmTWK2CMR5bPU93jvnLYTimy6o7qDZYZBp4QZRbtSMihqOboh3gH2xmqc1zCs-fWAeUY8EVbJSLQQ9NJQeygkKeEmZurFTyg57l96TpwxV6PBymMTy5ncI0GG-OwF~iqDoQHrTVMxmfIH6Zytjg9i8yoP2JeuKtK6Du3U2CZYW~Ed9wet14uk4vKyLiAAr0jjAeoVcvoa6Rgi3wwPqvKSk7GNQckelGg9ubIxxZbw83WTB9SpVY0FjAob9K3m-zQG3m32a1bccfA1B1Uop2eDnhp-lOaQS2ksa6hYAQHuIRDV4PBJg__&Key-Pair-Id=K14PPJZQE6T72P'
 
  const uniquePdfLinkArray = new Set();

  useEffect(() => {
    // To defeat SSR
    setClient(true)
  }, [])

  useEffect(() => {
    console.log(uniquePdfLinkArray)
    if(uniquePdfLinkArray.size != 0) {
      MergerTest(uniquePdfLinkArray)
      // console.log(uniquePdfLinkArray)
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
                  PdfComponentArray.map((PdfItem, i) => (
                    <BlobProvider document={PdfItem.comp}>
                      {({url}) => {
                        uniquePdfLinkArray.add(url)
                        // uniquePdfLinkArray.add(testTest)
                        return (
                          <></>
                        )
                      }}
                    </BlobProvider>
                  ))
                }

                {/* View PDF Section */}
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
                    <PDFDocument checklistQuestions={checklistQuestions} />
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