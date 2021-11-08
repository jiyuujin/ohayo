const { Client, LogLevel } = require('@notionhq/client');
const dotenv = require('dotenv');

const {
    getJPStandardDateTime,
    getFormatDate,
    getMaximumIndex
} = require('./utils');

dotenv.config();

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
    logLevel: LogLevel.DEBUG
});

(async () => {
    const fetchOhayoNote = async () => {
        const response = await notion.databases.query({
            database_id: process.env.OHAYO_NOTES_DATABASE_ID,
            filter: {
                property: 'Type',
                text: {
                    does_not_equal: 'extended'
                }
            },
            sorts: [
                {
                    property: "Name",
                    direction: "descending"
                }
            ]
        });
        return response;
    }

    const createOhayoNote = async () => {
        const notes = await fetchOhayoNote();
        const count = getMaximumIndex(notes.results) + 1;
        const datetime = new Date(getJPStandardDateTime());
        const response = await notion.pages.create({
            parent: {
                database_id: process.env.OHAYO_NOTES_DATABASE_ID,
            },
            properties: {
                'Name': {
                    title: [
                        {
                            text: {
                                content: `${getFormatDate(datetime)} で喋ったこと Vol.${count}`
                            }
                        }
                    ]
                }
            }
        });
    }

    switch (process.argv[2]) {
        case '--fetch':
            await fetchOhayoNote();
            break;
        case '--create':
            await createOhayoNote();
            break;
        default:
            break;
    }
})();
