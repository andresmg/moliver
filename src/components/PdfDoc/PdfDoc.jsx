import React from 'react'
import {Document, Page, Text, Font, StyleSheet} from '@react-pdf/renderer'


export default function PdfDoc({data}) {

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    const regex = /(<([^>]+)>)/ig

    const htmlEntities = (str) => {
        return String(str).replace('&ntilde;', 'ñ')
            .replace('&Ntilde;', 'Ñ')
            .replace('&amp;', '&')
            .replace('&Ntilde;', 'Ñ')
            .replace('&ntilde;', 'ñ')
            .replace('&Ntilde;', 'Ñ')
            .replace('&Agrave;', 'À')
            .replace('&Aacute;', 'Á')
            .replace('&Acirc;', 'Â')
            .replace('&Atilde;', 'Ã')
            .replace('&Auml;', 'Ä')
            .replace('&Aring;', 'Å')
            .replace('&AElig;', 'Æ')
            .replace('&Ccedil;', 'Ç')
            .replace('&Egrave;', 'È')
            .replace('&Eacute;', 'É')
            .replace('&Ecirc;', 'Ê')
            .replace('&Euml;', 'Ë')
            .replace('&Igrave;', 'Ì')
            .replace('&Iacute;', 'Í')
            .replace('&Icirc;', 'Î')
            .replace('&Iuml;', 'Ï')
            .replace('&ETH;', 'Ð')
            .replace('&Ntilde;', 'Ñ')
            .replace('&Ograve;', 'Ò')
            .replace('&Oacute;', 'Ó')
            .replace('&Ocirc;', 'Ô')
            .replace('&Otilde;', 'Õ')
            .replace('&Ouml;', 'Ö')
            .replace('&Oslash;', 'Ø')
            .replace('&Ugrave;', 'Ù')
            .replace('&Uacute;', 'Ú')
            .replace('&Ucirc;', 'Û')
            .replace('&Uuml;', 'Ü')
            .replace('&Yacute;', 'Ý')
            .replace('&THORN;', 'Þ')
            .replace('&szlig;', 'ß')
            .replace('&agrave;', 'à')
            .replace('&aacute;', 'á')
            .replace('&acirc;', 'â')
            .replace('&atilde;', 'ã')
            .replace('&auml;', 'ä')
            .replace('&aring;', 'å')
            .replace('&aelig;', 'æ')
            .replace('&ccedil;', 'ç')
            .replace('&egrave;', 'è')
            .replace('&eacute;', 'é')
            .replace('&ecirc;', 'ê')
            .replace('&euml;', 'ë')
            .replace('&igrave;', 'ì')
            .replace('&iacute;', 'í')
            .replace('&icirc;', 'î')
            .replace('&iuml;', 'ï')
            .replace('&eth;', 'ð')
            .replace('&ntilde;', 'ñ')
            .replace('&ograve;', 'ò')
            .replace('&oacute;', 'ó')
            .replace('&ocirc;', 'ô')
            .replace('&otilde;', 'õ')
            .replace('&ouml;', 'ö')
            .replace('&oslash;', 'ø')
            .replace('&ugrave;', 'ù')
            .replace('&uacute;', 'ú')
            .replace('&ucirc;', 'û')
            .replace('&uuml;', 'ü')
            .replace('&yacute;', 'ý')
            .replace('&thorn;', 'þ')
            .replace('&yuml;', 'ÿ')
    }


    Font.register({
        family: 'Oswald',
        src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
    })

    const styles = StyleSheet.create({
        body: {
            paddingTop: 35,
            paddingBottom: 65,
            paddingHorizontal: 35,
        },
        title: {
            fontSize: 24,
            textAlign: 'left',
            fontFamily: 'Oswald',
            color: '#2a3743'
        },
        author: {
            fontSize: 12,
            textAlign: 'center',
            marginBottom: 30,
            backgroundColor: '#11b495',
            color: 'white',
            padding: 4,
            borderRadius: 20,
            width: '20%'
        },
        small: {
            fontSize: 10,
            textAlign: 'left',
            color: '#11b495',
            marginTop: 3
        },
        subtitle: {
            fontSize: 18,
            fontFamily: 'Oswald',
            color: '#11b495',
            marginTop: 10
        },
        text: {
            marginTop: 5,
            fontSize: 12,
            textAlign: 'left'
        },
        image: {
            marginVertical: 15,
            marginHorizontal: 100,
        },
        header: {
            fontSize: 12,
            marginBottom: 20,
            textAlign: 'left',
            color: 'grey',
        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'right',
            color: 'grey',
        },
        franja: {
            backgroundColor: '#11b495',
            color: 'white',
            padding: 10,
            marginBottom: 10,
            borderRadius: 20
        },
        data: {
            fontSize: 12,
            marginRight: 50
        },
        smallText: {
            fontSize: 10
        },
        date: {
            textAlign: 'right',
            fontSize: 10,
            color: 'grey',
            marginBottom: 10
        }
    })

    return (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.header} fixed>
                    ~ Margarita Oliver ~
      </Text>
                <Text style={styles.title}>Biopsia</Text>
                <Text style={styles.author}>{data.number}</Text>
                <Text style={styles.date}>{new Date(data.date).getDate()} {months[new Date(data.date).getMonth()]} {new Date(data.date).getFullYear()}</Text>
                {/* <Image
                    style={styles.image}
                    src="../../images/acordeon-bg.jpg"
                ></Image> */}
                <Text style={styles.franja}>
                    <Text style={styles.data}>{data.user.name}                                           </Text>
                    <Text style={styles.data}>CI {data.user.dni}                                             </Text>
                    <Text style={styles.data}>Edad {new Date().getFullYear() - new Date(data.user.birthdate).getFullYear()}</Text>
                </Text>
                <Text style={styles.small}>Referencia</Text>
                <Text style={styles.smallText}>{data.reference}</Text>
                <Text style={styles.small}>Material remitido</Text>
                <Text style={styles.smallText}>{data.material}</Text>
                <Text style={styles.small}>Diagnóstico clínico</Text>
                <Text style={styles.smallText}>{data.clinic_diagnosis}</Text>
                <Text style={styles.subtitle}>Informe</Text>
                <Text style={styles.text}>{htmlEntities(data.report.replace(regex, ""))}</Text>
                <Text style={styles.subtitle} break>Diagnósticos</Text>
                {/* <Image
                    style={styles.image}
                    src="../../images/acordeon-bg.jpg"
                ></Image> */}
                <Text style={styles.text}>{htmlEntities(data.diagnostics.replace(regex, ""))}</Text>
                <Text style={styles.pageNumber} render={({pageNumber, totalPages}) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed></Text>
            </Page>
        </Document>
    )
}
