import PdfTest from 'components/PDF/PdfTest'
import { ChecklistContextProvider } from 'components/PDF/content/ChecklistContext'
import { checklistQuestions, template } from 'components/PDF/data'
import React from 'react'
import ReactDOM from 'react-dom'

const test = () => {
  return (
    // <ChecklistContextProvider
    //     checklist={template}
    //     checklistQuestions={checklistQuestions}
    // >
    //     <PdfTest />
    // </ChecklistContextProvider>
    <PdfTest />
  )
}

export default test
