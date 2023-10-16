import React, { useEffect, useRef, useState } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { renderToString } from 'react-dom/server';
import { GetChecklistSectionDto } from './content/types/dataType';
import { Slider, Typography } from '@mui/material';
import ReactSlider from "react-slider"
import { removeAlphabeticalPrefix } from './data';
import PDFMerger from 'pdf-merger-js';

// Define your JSX content that you want to convert to PDF
const MyContent: React.FC = () => (
  <div>
    <h1>Hello PDF!</h1>
    <p>This is some JSX content.</p>
  </div>
);

interface Props {
    content?: React.ReactNode;
    checklistQuestions: GetChecklistSectionDto[],
}

enum QuestionType {
  DateBased = 3,
  TextBased = 4,
  SliderBased = 5
}

// Define a React component for rendering the PDF
export const PDFDocument: React.FC<Props> = ({ checklistQuestions }) => (
  <Document>
    <Page size="A4">
      <View style={styles.page}>
        <View style={styles.pageHeader}>
          <Link src="https://www.google.com/"><Text>Skills Checklist</Text></Link>
        </View>
      </View>
      <View style={styles.divider} />
      <View>
        {checklistQuestions != null && checklistQuestions.map(item => (
            <View style={styles.wrapper}>
              <View style={styles.checklistHeaders}>
                <Text style={styles.questionHeaders_Text}>{removeAlphabeticalPrefix(item.name)}</Text>
              </View>

              <View>
                {
                item.checklistQuestions != undefined &&
                item.checklistQuestions.map(question => (
                    <View style={styles.questionWrapper_View}>

                      <View style={styles.questionHeaders_View}>
                        <Text style={styles.questionHeaders_Text}>{removeAlphabeticalPrefix(question.displayText)}</Text>
                      </View>

                      <View style={styles.AnswerWrapper_View}>
                        {/* Text based */}
                        {
                          question.checklistQuestionType?.id == QuestionType.TextBased && (
                            <View style={styles.TextBasedWrapper_View}>
                              <Text style={styles.TextBasedAnswer_Text}>{question.textAnswer}</Text>
                            </View>
                          )
                        }
                        {/* Slider based */}
                        {
                          question.checklistQuestionType?.id == QuestionType.SliderBased && (
                            <View style={styles.SliderWrapper_View}>
                              <View style={styles.SliderBasedWrapper_View}>
                                <Text style={styles.SliderBasedWrapper_Text}>Proficiency</Text>
                                <View style={styles.SliderBasedWrapper}>
                                  <Text style={styles.TextBasedAnswer_Text}>{question.proficiencyAnswer}</Text>
                                </View>
                              </View>
                              <View style={styles.SliderBasedWrapper_View}>
                                <Text style={styles.SliderBasedWrapper_Text}>Frequency</Text>
                                <View style={styles.SliderBasedWrapper}>
                                  <Text style={styles.TextBasedAnswer_Text}>{question.frequencyAnswer}</Text>
                                </View>
                              </View>
                            </View>
                          )
                        }
                        {/* Date based */}
                        {
                          question.checklistQuestionType?.id == QuestionType.DateBased && (
                            <View style={styles.TextBasedWrapper_View}>
                              <Text style={styles.TextBasedAnswer_Text}>{question.dateAnswer}</Text>
                              {/* <Typography component="h6" variant="h5">Hello World</Typography> */}
                            </View>
                          )
                        }
                      </View>
                    </View>
                  ))
                }
              </View>
            </View>
        ))}
      </View>
    </Page>
  </Document>
);


// Code below doesn't work...
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    margin: 10,
    // border: 1
  },
  wrapper: {
    // border: 1,
    // borderColor: 'green'
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    border: 0.7,
    opacity: 0.3
  },
  questionHeaders_Text: {
    fontSize: 12,
  },
  checklistHeaders: {
    padding: 10,
  },
  questionWrapper_View: {
    // border: 1
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3
  },
  questionHeaders_View: {
    paddingLeft: 30,
    paddingBottom: 8,
    paddingTop: 10,
    width: '50%',
  },
  AnswerWrapper_View: {
    // border: 1,
    // borderColor: 'blue',
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center'
  },
  TextBasedWrapper_View: {
    border: 1,
    borderColor: 'black',
    padding: 2,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginRight: 10,
    width: '50%'
  },
  TextBasedAnswer_Text: {
    textAlign: 'center',
    fontSize: 12,
    padding: 1
  },
  SliderWrapper_View: {
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    flexDirection: 'row',
    // border: 1,
    // borderColor: 'black',
    width: '100%'
  },
  SliderBasedWrapper_View: {
    // border: 1,
    // borderColor: 'pink',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2
  },
  SliderBasedWrapper_Text: {
    fontSize: 12,
  },
  SliderBasedWrapper: {
    border: 1,
    borderColor: 'black',
    marginTop: 2,
    borderRadius: 5,
    width: '50%'
  }
});


export const SecondPDFDocument = () => (
  <Document>
    <Page size="A4">
      <View>
        <Text>Test</Text>
      </View>
    </Page>
  </Document>
)

const PdfGenerator: React.FC = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleGeneratePdf = async () => {
    if (contentRef.current) {
      // Convert JSX content to an HTML element
      const contentHtml = renderToString(<MyContent />);

      // Create a new canvas element for rendering
      const canvas = document.createElement('canvas');

      // Set canvas dimensions
      canvas.width = 800; // Adjust the width as needed
      canvas.height = 600; // Adjust the height as needed

      // Render HTML content to canvas
      await html2canvas(contentRef.current, { canvas });

      // Create a PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);

      // Open the PDF in a new tab
      const pdfDataUri = pdf.output('datauristring');
      const pdfWindow = window.open();
      pdfWindow!.document.write('<iframe width="100%" height="100%" src="' + pdfDataUri + '" frameborder="0" allowfullscreen></iframe>');
    }
  };

  return (
    <div>
      {/* Render your JSX content using a ref */}
      <div ref={contentRef}>
        <MyContent />
      </div>

      {/* Button to generate and open PDF */}
      <button onClick={handleGeneratePdf}>Generate PDF</button>
    </div>
  );
};

export default PdfGenerator;

const Merger = (file: any) => {
  // const [mergedPdfUrl, setMergedPdfUrl] = useState<any>();

  useEffect(() => {
    const render = async () => {
      const merger = new PDFMerger();

      // for(const file of files) {
      //   await merger.add(file)
      // }
      if(file != null){
        await merger.add(file)
        const mergedPdf = await merger.save('Yeah');
      }

      
      // const url = URL.createObjectURL(mergedPdf);

      // return setMergedPdfUrl(url);
      // console.log(mergedPdf)
    };

    render().catch((err) => {
      throw err;
    });

    // () => setMergedPdfUrl('');
  }, [file]);

  return (
    <></>
  )
};

export const MergerTest = async (files: any) => {
  const merger = new PDFMerger();

    try {
      if(files != null){
        for(const file of files) {
          console.log(file)
          await merger.add(file)
        }
        const mergedPdf = await merger.save('Merged PDF');
      }
    }
    catch(err) {
      console.log(err)
    }

  return (
    <></>
  )
};