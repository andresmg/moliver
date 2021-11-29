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