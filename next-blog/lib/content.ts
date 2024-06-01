export const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Introducing Novel" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://github.com/steven-tey/novel",
                target: "_blank",
              },
            },
          ],
          text: "Novel",
        },
        {
          type: "text",
          text: " is a Notion-style WYSIWYG editor with AI-powered autocompletion. Built with ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tiptap.dev/",
                target: "_blank",
              },
            },
          ],
          text: "Tiptap",
        },
        { type: "text", text: " + " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://sdk.vercel.ai/docs",
                target: "_blank",
              },
            },
          ],
          text: "Vercel AI SDK",
        },
        { type: "text", text: "." },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Installation" }],
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [{ type: "text", text: "npm i novel" }],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Usage" }],
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [
        {
          type: "text",
          text: 'import { Editor } from "novel";\n\nexport default function App() {\n  return (\n     <Editor />\n  )\n}',
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Features" }],
    },
    {
      type: "orderedList",
      attrs: { tight: true, start: 1 },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Slash menu & bubble menu" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "AI autocomplete (type " },
                { type: "text", marks: [{ type: "code" }], text: "++" },
                {
                  type: "text",
                  text: " to activate, or select from slash menu)",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Image uploads (drag & drop / copy & paste, or select from slash menu) ",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://public.blob.vercel-storage.com/pJrjXbdONOnAeZAZ/banner-2wQk82qTwyVgvlhTW21GIkWgqPGD2C.png",
        alt: "banner.png",
        title: "banner.png",
        width: null,
        height: null,
      },
    },
    { type: "horizontalRule" },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Learn more" }],
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Star us on " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://github.com/steven-tey/novel",
                        target: "_blank",
                      },
                    },
                  ],
                  text: "GitHub",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Install the " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://www.npmjs.com/package/novel",
                        target: "_blank",
                      },
                    },
                  ],
                  text: "NPM package",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://vercel.com/templates/next.js/novel",
                        target: "_blank",
                      },
                    },
                  ],
                  text: "Deploy your own",
                },
                { type: "text", text: " to Vercel" },
              ],
            },
          ],
        },
      ],
    },
  ],
};


export const defaultHtmlEditorContent = `<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body><h2>Introducing Novel</h2><p><a target="_blank" rel="noopener noreferrer nofollow" class="text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer" href="https://github.com/steven-tey/novel">Novel</a> is a Notion-style WYSIWYG editor with AI-powered autocompletion. Built with <a target="_blank" rel="noopener noreferrer nofollow" class="text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer" href="https://tiptap.dev/">Tiptap</a> + <a target="_blank" rel="noopener noreferrer nofollow" class="text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer" href="https://sdk.vercel.ai/docs">Vercel AI SDK</a>.</p><h3>Installation</h3><pre><code data-highlighted="yes" class="hljs language-coffeescript"><span class="hljs-built_in">npm</span> i novel</code></pre><h3>Usage</h3><pre><code data-highlighted="yes" class="hljs language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Editor</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"novel"</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
     <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Editor</span> /&gt;</span></span>
  )
}</code></pre><h3>Features</h3><ol class="list-decimal list-outside leading-3 -mt-2 tight" data-tight="true"><li class="leading-normal -mb-2"><p>Slash menu &amp; bubble menu</p></li><li class="leading-normal -mb-2"><p>AI autocomplete (type <code class="rounded-md bg-muted  px-1.5 py-1 font-mono font-medium" spellcheck="false">++</code> to activate, or select from slash menu)</p></li><li class="leading-normal -mb-2"><p>Image uploads (drag &amp; drop / copy &amp; paste, or select from slash menu) </p></li></ol><img class="rounded-lg border border-muted" src="https://public.blob.vercel-storage.com/pJrjXbdONOnAeZAZ/banner-2wQk82qTwyVgvlhTW21GIkWgqPGD2C.png" alt="banner.png" title="banner.png" /><hr class="mt-4 mb-6 border-t border-muted-foreground" /><h3>Learn more</h3><ul class="not-prose pl-2 " data-type="taskList"><li class="flex gap-2 items-start my-4" data-checked="false" data-type="taskItem"><label><input type="checkbox" /><span></span></label><div><p>Star us on <a target="_blank" rel="noopener noreferrer nofollow" class="text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer" href="https://github.com/steven-tey/novel">GitHub</a></p></div></li><li class="flex gap-2 items-start my-4" data-checked="false" data-type="taskItem"><label><input type="checkbox" /><span></span></label><div><p>Install the <a target="_blank" rel="noopener noreferrer nofollow" class="text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer" href="https://www.npmjs.com/package/novel">NPM package</a></p></div></li><li class="flex gap-2 items-start my-4" data-checked="false" data-type="taskItem"><label><input type="checkbox" /><span></span></label><div><p><a target="_blank" rel="noopener noreferrer nofollow" class="text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer" href="https://vercel.com/templates/next.js/novel">Deploy your own</a> to Vercel</p></div></li></ul></body></html>`;