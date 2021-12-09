export const seoURL = (str) => {
    return str.toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
        .replace(/&/g, '-and-')
        // eslint-disable-next-line
        .replace(/[^a-z0-9\-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-*/, '')
        .replace(/-*$/, '')
}

export const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string
}

export const drawTime = (time) => {
    var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    var days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    var d = new Date(time)
    var day = days[d.getDay()]
    var hr = d.getHours()
    var min = d.getMinutes()
    if (min < 10) {
        min = "0" + min
    }
    var ampm = "am"
    if (hr > 12) {
        hr -= 12
        ampm = "pm"
    }
    var date = d.getDate()
    var month = months[d.getMonth()]
    var year = d.getFullYear()
    return day + " " + date + " " + month + " " + year + ' - ' + hr + ":" + min + ampm + " "
}