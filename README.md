## Introducing Next-Blog

Next-Blog is a out of box **fast, SEO Friendly** blogging based ***CMS supporting multiple themes, Notion like WYSIWYG editor with AI - Assistant Writer, Modern Layouts , Admin Dashboard and Custom Components***. Whether you want to make a fast Single Page Applications or blogs, next-blog got you covered. Next-Blog is beginner friendly to use and aim's to keep the paid SaaS dependencies to minimum. Currently the only SaaS dependecy we use is Vercel-Blob for file management and we are looking into eliminating this dependency as well.
## First Look MVP
[![NEXT-TOGGLE](https://img.youtube.com/vi/XFdW18MOubU/0.jpg)](https://www.youtube.com/watch?v=XFdW18MOubU)

## Initial Setup

 1. Make sure you have a `.env` file with respective keys. `.env.example` explains all the key sources.

>     DATABASE_URL=
>     NEXT_PUBLIC_BASE_URL=
>     NEXT_PUBLIC_WEBSITE_NAME=
>     
>     HOMEPAGE_CACHE_REVALIDATE=
>     POSTS_CACHE_REVALIDATE=
>     DISCUSSIONS_STATS_REVALIDATE=
>     
>     GITHUB_AUTH_TOKEN=
>     NEXT_PUBLIC_GITHUB_REPO_ID=
>     NEXT_PUBLIC_GITHUB_CATEGORY_ID=
>     NEXT_PUBLIC_GITHUB_REPO_NAME=
>     NEXT_PUBLIC_GITHUB_REPO_OWNER=
>     
>     OPENAI_API_KEY=
>     OPENAI_BASE_URL=
>     
>     BLOB_READ_WRITE_TOKEN=
>     
>     KV_REST_API_URL=
>     KV_REST_API_TOKEN=

2. Configure Prisma db providers and connection string at `next-blog\prisma\schema.prisma`. By default Next-Blog uses postgres.
3. Run prima generate, migrate and push commands according to deployment type.

FOR LOCAL TESTING:
*Run*

    npm run prisma:generate
    npm run migrate:dev
    npm run prisma:push

4. At last run the seed command to initialize the blog

> npm run prisma:seed

#### DEFAULT CREDENTIALS
Default username and password after first seed.

> **Login Page :** /login


> **Management Dashboard:** /dashboard

    USERNAME : admin
    PASSWORD: admin


## Features 

### Fast & SEO Friendly

Homepage & Posts are rendered on server for fast response times with proper SEO meta tags, keywords and open graph images.

### Multiple themes

Next-Blog internally uses [Background Snippets ](https://github.com/ibelick/background-snippets)to give support for 21 Light and Dark Themes.

### Notion like WYSIWYG editor

Next-Blog uses Novel, a beautiful Notion like WYSIWYG editor powered with AI Assistant writer. Use any LLM's from Open-AI to boost your productivity in content creation.
#### AI ASSISTANT
![enter image description here](https://i.ibb.co/CbvQNFM/AI.png)

### Layouts and Components

Next-Blog currently supports 5 layouts and have out of box support for 4 post components(2 Large & 2 Small), 2 Navbars and 2 Footers. Customize components according to your liking or contribute components to our GitHub.

### Admin Dashboard

Next-Blog have its own dashboard to keep the management of your websites streamlined.


## TECH STACK

- ***Framework:*** Next.js
- ***UI:*** Tailwind CSS, Shadcn
- ***File Uploads/Management:*** Vercel-Blob
- ***Content WYSIWYG Editor:*** [Novel](https://github.com/steven-tey/novel), a Notion like WYSIWYG editor with AI assistant writer.
- ***Comment/Discussions:*** [Giscus](https://github.com/giscus/giscus), a comment system powered by GitHub Discussions.
- ***AI/LLM:***  Vercel AI SDK
- ***ORM:***  Prisma ORM
- ***Form Management:*** Shadcn + React Hook Forms with zod validation
