const timestampFormatterService = (date: string|Date) => {
    if (date instanceof Date) {
        const fullYear = date.getFullYear()
        const month = String(date.getMonth()).padStart(2, '0')
        const day = String(date.getDay()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')

        return `${day}-${month}-${fullYear} ${hours}:${minutes}`
    } else {
        return new Date(date)
    }
}

export default timestampFormatterService