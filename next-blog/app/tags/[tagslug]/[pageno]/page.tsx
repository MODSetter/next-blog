import postCardProvider from "@/components/homepage/postscards/postcard-provider";
import prisma from "@/db/prismaclient"
import Link from "next/link";

interface TagsPagesProps {
  params: { tagslug: string, pageno: string };
}

async function getPostsByTag(tagSlug: string, perPage: number, page: number) {
  try {
    // DB Query
    const tag = await prisma.tag.findUnique({
      select: {
        tagname: true,
        posts: {
          select: {
            slug: true,
            opengraphimage: true,
            title: true,
            metaDescription: true,
            updatedAt: true,
            views: true,
            tags: true,
            author: true
          }
        }
      },
      where: {
        tagname: tagSlug
      },
    })

    const skip = (perPage * (page - 1));
    const take = perPage;

    const posts = tag?.posts.slice(skip, skip + take) ?? []

    const postsCount = tag?.posts?.length ?? 0

    const respnse = { posts, postsCount };

    return respnse;
  } catch (error) {
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export const TagsPage = async ({
  params: { tagslug, pageno },
}: TagsPagesProps) => {

  let page = parseInt(pageno, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 10;
  const data = await getPostsByTag(tagslug, perPage, page);

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
      <div className="my-4">
        Showing Posts for : <span className="font-semibold underline text-xl">{tagslug}</span>
      </div>
      <div className="flex flex-col items-center lg:items-stretch gap-4 p-2 place-items-center">
        {data.posts.map((post) => {
          return (
            <>
              {postCardProvider("LG-1", post)}
            </>
          )
        })}
      </div>
      {isPageOutOfRange ? (
        <div>No more pages...</div>
      ) : (

        <div className="flex justify-center items-center mt-16">
          <div className="flex border-[1px] gap-4 rounded-[10px] border-light-green p-4">
            {page === 1 ? (
              <div className="opacity-60" aria-disabled="true">
                {"< Previous"}
              </div>
            ) : (
              <Link href={`/tags/${tagslug}/${prevPage}`} aria-label="Previous Page">
                {"< Previous"}
              </Link>
            )}

            {pageNumbers.map((pageNumber, index) => (
              <Link
                key={index}
                className={
                  page === pageNumber
                    ? "bg-green-500 font-bold px-3 border rounded-md"
                    : "hover:bg-indigo-500/10 px-1 rounded-md"
                }
                href={`/tags/${tagslug}/${pageNumber}`}
              >
                {pageNumber}
              </Link>
            ))}

            {page === totalPages ? (
              <div className="opacity-60" aria-disabled="true">
                {"Next >"}
              </div>
            ) : (
              <Link href={`/tags/${tagslug}/${nextPage}`} aria-label="Next Page">
                {"Next >"}
              </Link>
            )}
          </div>
        </div>

      )}
    </div>
  )
}

export default TagsPage;