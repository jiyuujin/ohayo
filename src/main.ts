const { Client, LogLevel } = require('@notionhq/client');
const { Octokit } = require('@octokit/rest');

const {
    getJPStandardDateTime,
    getFormatDate,
    getMaximumIndex
} = require('./utils');

const dotenv = require('dotenv').config();

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
    logLevel: LogLevel.DEBUG
});

const octokit = new Octokit({
    auth: dotenv.parsed.GITHUB_TOKEN
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

    const migrateOhayoNote = async () => {
        const notes = await fetchOhayoNote();
        for (const note of notes.results) {
            let index = 1;
            let content = ''
            content += `---\n`
            content += `title: ${note.properties['Name']?.title[0]?.plain_text}\n`
            content += `event: \n`
            note.properties['Event']?.multi_select?.forEach((event) => {
                content += `  - ${event.name}\n`
            })
            let tagText = ''
            let tagList = []
            content += `tags:\n`
            note.properties['Tags']?.multi_select?.forEach((tag, key) => {
                content += `  - ${tag.name}\n`
                tagText += tag.name
                if (key !== note.properties['Tags']?.multi_select?.length - 1) {
                    tagText += ','
                }
                tagList.push(tag.name)
            })
            content += `---\n\n`
            const page = await notion.blocks.children.list({ block_id: note.id });
            page.results.forEach((result) => {
                result.bulleted_list_item?.text.forEach((item) => {
                    content += `${item.plain_text}\n`;
                });
            });

            octokit.issues.create({
                owner: 'jiyuujin',
                repo: 'ohayo-data', // repository name, ex: ohayo-data
                title: note.properties['Name']?.title[0]?.plain_text,
                body: content,
                labels: tagList
            }).then(({data}) => {
                // console.log(data);
            }).catch(error => {
                console.log(error);
            });

            index++;
        }
    }

    switch (process.argv[2]) {
        case '--fetch':
            await fetchOhayoNote();
            break;
        case '--create':
            await createOhayoNote();
            break;
        case '--migrate':
            await migrateOhayoNote();
            break;
        default:
            break;
    }
})();
