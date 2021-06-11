const { Client, LogLevel } = require('@notionhq/client');
const dotenv = require('dotenv');

const { getJPStandardDateTime } = require('./utils');

dotenv.config();

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
    logLevel: LogLevel.DEBUG
});

(async () => {
    const fetchOhayoNote = async () => {
        const response = await notion.databases.query({
            database_id: process.env.OHAYO_NOTES_DATABASE_ID
        });
        return response;
    }

    const createOhayoNote = async () => {
        const notes = await fetchOhayoNote();
        const count = notes.results.length;
        const current = new Date(getJPStandardDateTime());
        const response = await notion.pages.create({
            parent: {
                database_id: process.env.OHAYO_NOTES_DATABASE_ID,
            },
            properties: {
                'Name': {
                    title: [
                        {
                            text: {
                                content: `${current.getMonth() + 1}/${current.getDate()} で喋ったこと #${count + 1}`
                            }
                        }
                    ]
                }
            }
        });
    }

    switch (process.argv[2]) {
        case '1':
            await fetchOhayoNote();
            break;
        case '2':
            await createOhayoNote();
            break;
        default:
            break;
    }
})();
