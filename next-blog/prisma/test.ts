import { create } from "domain";
import prisma from "../db/prismaclient";
import { createDiscusionForPostSlug } from "../utils/common-functions";
const createUser = async () => {
  let ctags: { where: { tagname: string }; create: { tagname: string } }[] = [];
  const tagstocreate = ["test", "testtwo", "three"];

  tagstocreate.forEach((tag) => {
    const query = {
      where: {
        tagname: tag,
      },
      create: {
        tagname: tag,
      },
    };
    ctags.push(query);
  });

  // console.log("TAGS", ctags.toString)

  const postCreated = await prisma.post.create({
    data: {
      slug: "daas",
      opengraphimage: "xyz",
      title: "bla",
      content: "asdasd",
      authorId: "1",
      metaKeywords: ["seo", "new"],
      metaDescription: "xyz",
      visibility: true,
      tags: {
        connectOrCreate: [...ctags],
      },
    },
  });

  return postCreated;
};

const fetcher = async () => {
  try {
    const query = `{
            repository(name: "giscustest", owner: "MODSetter") {
              discussion(number: 1){
                reactions{
                  totalCount
                }
                comments{
                  totalCount
                }
              }
            }
          }`;
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const { data } = await res.json();
    console.log(JSON.stringify(data.repository.discussion.reactions));
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const muttest = async () => {

    // const dis = await createDiscusionForPostSlug("http://localhost:3000/discussions/test7");
    const reqdata = {
      posturl: "http://localhost:3000/discussions/test23",
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqdata),
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/discussions`,
      requestOptions
    );

    const res = await response.json();
    console.log("inmettest", res);
//   const query = JSON.stringify({
//     query: `mutation {
//             createDiscussion(input: {repositoryId: "${process.env.GITHUB_REPO_ID}", categoryId: "${process.env.GITHUB_CATEGORY_ID}", body: "The body", title: "http://localhost:3000/discussions/test1"}) {
//               discussion {
//                 number
//               }
//             }
//           }
//           `,
//   });

// const query = `mutation {
//     createDiscussion(input: {repositoryId: "${process.env.GITHUB_REPO_ID}", categoryId: "${process.env.GITHUB_CATEGORY_ID}", body: "The body", title: "http://localhost:3000/discussions/test2"}) {
//       discussion {
//         number
//       }
//     }
//   }
//   `;

//   const response = await fetch("https://api.github.com/graphql", {
//     headers: {
//       Authorization: `bearer ${process.env.GITHUB_AUTH_TOKEN}`,
//       "content-type": "application/json",
//     },
//     method: "POST",
//     body: JSON.stringify({ query }),
//   });

//   const responseJson = await response.json();

//   console.log("API res", responseJson);
};

console.log(muttest());
// createUser();
