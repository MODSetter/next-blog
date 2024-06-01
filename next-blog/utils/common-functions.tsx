import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TiptapImage from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import TextStyle from "@tiptap/extension-text-style";
import TiptapUnderline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Youtube from "@tiptap/extension-youtube";

import { generateHTML, generateJSON } from "@tiptap/html";
import { JSONContent } from "novel";

import prisma from "@/db/prismaclient";

const extensions = [
  StarterKit,
  TiptapLink,
  TiptapImage,
  TaskList,
  TaskItem,
  TextStyle,
  TiptapUnderline,
  Placeholder,
  CharacterCount,
  CodeBlockLowlight,
  Youtube,
  Color,
  Highlight,
  HorizontalRule,
];

// export const htmlFromJson = (jsonContent: JSONContent) => {
//   return generateHTML(jsonContent, extensions);
// };

// export const jsonFromHtml = (htmlContent: string) => {
//   return generateJSON(htmlContent, extensions);
// };


export const randomBorderColor = (max: number) => {

  const borderColors = ["border-red-500", "border-orange-500", "border-amber-500", "border-yellow-500", "border-lime-500", "border-green-500", "border-emerald-500",
    "border-teal-500", "border-cyan-500", "border-blue-500", "border-indigo-400", "border-violet-500"
  ]
  if (max > 12 || max < 1) {
    max = 12
  }
  return borderColors[Math.floor(Math.random() * max)]
};



//creates discussion
//gets its id
export const createDiscusionForPostSlug = async (postslug: string) => {

  const checkifexists = await prisma.githubDiscussions.findUnique({
    where: {
      url: postslug,
    },
  });


  if (checkifexists?.url) {
    console.log("EXISTS")
    return
  } else {
    const query = JSON.stringify({
      query: `mutation {
              createDiscussion(input: {repositoryId: "${process.env.NEXT_PUBLIC_GITHUB_REPO_ID}", categoryId: "${process.env.NEXT_PUBLIC_GITHUB_CATEGORY_ID}", body: "The body", title: "${postslug}" }) {
                discussion {
                  number
                }
              }
            }
            `,
    });

    const response = await fetch("https://api.github.com/graphql", {
      headers: {
        Authorization: `bearer ${process.env.GITHUB_AUTH_TOKEN}`,
        "content-type": "application/json"
      },
      method: "POST",
      body: query,
    });

    const responseJson = await response.json();

    if (responseJson.data.createDiscussion.discussion.number) {
      const newentry = await prisma.githubDiscussions.create({
        data: {
          url: postslug,
          discussionId: responseJson.data.createDiscussion.discussion.number,
        },
      });
      console.log("NEW ENTRY")
      return
    }

    console.log("NO ENTRY")
    return
  }
}


