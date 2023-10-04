import React, { useRef } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { renderToString } from 'react-dom/server';
import { GetChecklistSectionDto } from './content/types/dataType';
import { Slider } from '@mui/material';

// Define your JSX content that you want to convert to PDF
const MyContent: React.FC = () => (
  <div>
    <h1>Hello PDF!</h1>
    <p>This is some JSX content.</p>
  </div>
);

interface Props {
    content: React.ReactNode;
    checklistQuestions: GetChecklistSectionDto[],
}

// Define a React component for rendering the PDF
export const PDFDocument: React.FC<Props> = ({ content, checklistQuestions }) => (
  <Document>
    <Page size="A4">
      <View style={styles.page}>
        <Text style={styles.text}>Skills Checklist</Text>
      </View>
      <View>
        {checklistQuestions != null && checklistQuestions.map(item => (
            <Text>{item.name}</Text>
        ))}
      </View>
      <View>
      {/* <Slider
        aria-label="Small steps"
        defaultValue={1}
        step={1}
        marks
        min={1}
        max={4}
        valueLabelDisplay="auto"
        /> */}
      </View>
    </Page>
  </Document>
);


// Code below doesn't work...
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    margin: 10,
    border: 1
  },
  text: {
    fontSize: 12,
  },

});

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

