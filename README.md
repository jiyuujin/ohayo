# ohayo

## Websites

Once summarized to [Notion](https://www.notion.so/Quick-Note-c0a6b685fb524ca4823cc1dccbf2f9b8), and has been summarizing to [the repository](https://github.com/jiyuujin/ohayo-developers) since 7th Oct 2021.

We can be found on some websites listed below.

- [みんなで作るブログ](https://ohayo.nekohack.me/)
- [金曜日のエンジニアのつどい](https://ohayo-friday.nekohack.me/)

For more information, please check the Twitter hashtag `#ohayo_engineer`.

![](https://i.imgur.com/7tiOTpE.jpg)

## Skills

- GitHub API
- Notion API

### Use GitHub API

Clone [the repository](https://github.com/jiyuujin/ohayo-website). Run `cp .env.example .env`, input environmental values.

```.env
VITE_APP_GITHUB_API_ACCESS_TOKEN=
```

#### Serve in Web Server

You can fetch articles in descending order.

```bash
npm run dev
```

### Use Notion API

Clone [this repository](https://github.com/jiyuujin/ohayo). Run `cp .env.example .env`, input environmental values.

```.env
NOTION_API_KEY=
OHAYO_NOTES_DATABASE_ID=
```

#### Serve in Console

You can fetch articles in descending order.

```bash
npm run test --fetch
```

Also create an article.

```bash
npm run test --create
```

## Copyright

Created © 2021-2023 jiyuujin LAB. All Rights Reserved.
