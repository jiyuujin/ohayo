export const getJPStandardDateTime = (date?: Date): string => {
    if (date === undefined) {
        return new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })
    }
    return new Date(date!).toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })
}

export const getDoubleDigestNumber = (number: number) => {
    if (number < 10) {
        return `0${number}`
    } else {
        return number
    }
}

/**
 * 記事の最大インデックスを取得する
 * @param items
 */
export const getMaximumIndex = (items) => {
    const regexp = /(20\d{2}\/\d{2}\/\d{2}) で喋ったこと #(^[0-9]|[0-9][0-9]|[0-9][0-9][0-9]$)/g;
    let match;
    let matches = [];
    while ((match = regexp.exec(items[0].properties['Name'].title[0].plain_text)) !== null) {
        matches.push(match[2]);
    }
    return matches[0];
}

/**
 * 記事数を取得する
 * @param items
 */
export const getArticleSize = (items) => {
    return items.length;
}
