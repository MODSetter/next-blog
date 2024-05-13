import PostListOne from "@/components/homepage/postlists/postlist-sm";
import prisma from "@/db/prismaclient"
import Link from "next/link";

interface PostPagesProps {
  params: { pageno: string };
}

async function getPostsData(perPage: number, page: number) {
  try {
      // DB Query
      const posts = await prisma.post.findMany({
          select: {
              slug: true,
              opengraphimage: true,
              title: true,
              metaDescription: true,
              updatedAt: true,
              views: true,
              tags: true,
          },
          where: {
              visibility: true
          },
          skip: (perPage * (page - 1)),
          take: perPage,
      })

      const allposts = await prisma.post.findMany({
          where: {
              visibility: true
          },
      })

      const postsCount = allposts.length

      const respnse = { posts, postsCount };
      return respnse;
  } catch (error) {
      throw new Error("Failed to fetch data. Please try again later.");
  }
}

export const PostsPage = async ({
    params: { pageno },
  }: PostPagesProps) => {


    let page = parseInt(pageno, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 8;
  const data = await getPostsData(perPage, page);

  const totalPages = Math.ceil(data.postsCount / perPage);

  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
	const isPageOutOfRange = page > totalPages;

  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

  return (
    <div>
      {/* <PostListOne data={data} postcardno={"1"}/> */}
      {isPageOutOfRange ? (
					<div>No more pages...</div>
				): (

					<div className="flex justify-center items-center mt-16">
          <div className="flex border-[1px] gap-4 rounded-[10px] border-light-green p-4">
            {page === 1 ? (
              <div className="opacity-60" aria-disabled="true">
                Previous
              </div>
            ) : (
              <Link href={`/${prevPage}`} aria-label="Previous Page">
                Previous
              </Link>
            )}

            {pageNumbers.map((pageNumber, index) => (
              <Link
                key={index}
                className={
                  page === pageNumber
                    ? "bg-green-500 fw-bold px-2 rounded-md text-black"
                    : "hover:bg-green-500 px-1 rounded-md"
                }
                href={`/${pageNumber}`}
              >
                {pageNumber}
              </Link>
            ))}

            {page === totalPages ? (
              <div className="opacity-60" aria-disabled="true">
                Next
              </div>
            ) : (
              <Link href={`/${nextPage}`} aria-label="Next Page">
                Next
              </Link>
            )}
          </div>
        </div>

				)}
    </div>
  )
}

export default PostsPage;