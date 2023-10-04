import React from 'react'
import { Page, Text, Image, Document, StyleSheet, View} from "@react-pdf/renderer"

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35
    },
    title: {
        fontSize: 24,
        textAlign: 'center'
    },
    text: {
        margin: 12, 
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    header: {
        fontSize: 12, marginBottom: 20,
        textAlign: 'center',
        color: 'grey'
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12
    }
})

const PDFFile = () => {
  return (
    <Document>
        <Page style={styles.body}>
            <Text style={styles.header}>stuff</Text>
            <Text style={styles.text}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus, inventore quis. Numquam libero nihil voluptatibus perspiciatis quo necessitatibus facilis vero sequi? Tenetur cupiditate, voluptate unde suscipit quas doloribus libero accusantium.
            </Text>
        </Page>
        <Text fixed style={styles.pageNumber} render={({ pageNumber, totalPages}) => `${pageNumber} / ${totalPages}`} />
    </Document>
  )
}

export default PDFFile