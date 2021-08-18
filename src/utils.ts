export const getJPStandardDateTime = (date?: Date): string => {
    if (date === undefined) {
        return new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })
    }
    return new Date(date!).toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })
}

/**
 * `YYYY/MM/DD` 形式で日付を取得する
 * @param date
 */
export const getFormatDate = (date) => {
    const year = date.getFullYear();
    const month = getDoubleDigestNumber(date.getMonth() + 1);
    const day = getDoubleDigestNumber(date.getDate());
    return `${year}/${month}/${day}`;
}

/**
 * 必ず 2 桁で数値を取得する
 * @param number
 */
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
    return Number(matches[0]);
}

/**
 * 記事数を取得する
 * @param items
 */
export const getArticleSize = (items) => {
    return Number(items.length);
}
