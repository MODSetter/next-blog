import { NextResponse } from "next/server";
import prisma from "@/db/prismaclient";

type Params = {
  postslug: string;
};

//gets github discussion ID
export async function GET(request: Request, context: { params: Params }) {
  const discussion = await prisma.githubDiscussions.findUnique({
    where: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/discussions/${context.params.postslug}`,
    },
  });

  if (discussion?.url) {
    try {
      const query = `{
                        repository(name: "${process.env.NEXT_PUBLIC_GITHUB_REPO_NAME}", owner: "${process.env.NEXT_PUBLIC_GITHUB_REPO_OWNER}") {
                          discussion(number: ${discussion.discussionId}){
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
          Authorization: `bearer ${process.env.GITHUB_AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
        cache: 'no-store'
      });
      const { data } = await res.json();

      return NextResponse.json({
        comments: data.repository.discussion.comments.totalCount,
        reactions: data.repository.discussion.reactions.totalCount
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }else{
    return NextResponse.json({
        comments: 0,
        reactions: 0
      });
  }
}
