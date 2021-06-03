export const getJPStandardDateTime = (date?: Date): string => {
    if (date === undefined) {
        return new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })
    }
    return new Date(date!).toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })
}
