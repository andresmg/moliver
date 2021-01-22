import React from 'react'
import {Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer'

export default function PdfDoc({data}) {

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#fff',
            width: '100%',
            orientation: 'portrait',
        },
        view: {
            width: '100%',
            height: '100%',
            padding: '30px',
            backgroundColor: 'white',
        },
        image: {
            // objectFit: 'cover',
            width: '200px',
            height: '200px'
        },
    })

    return (
        <Document >
            <Page object-fit="fill" style={styles.page} size="A4">
                <View style={styles.view}>
                    <Text>{data.reference}</Text>
                    <Image style={styles.image} src="https://react-pdf.org/images/document-graphic.png" alt="images" />
                </View>
            </Page>
        </Document>
    )
}
