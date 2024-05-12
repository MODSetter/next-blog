import prisma from "@/db/prismaclient";
import PostListOne from "./PostListOne";
import Link from "next/link";

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

const PaginationTest = async () => {
    let page = 1;
    const perPage = 1;
    const allPosts = await getPostsData(perPage, page);
  
    const totalPages = Math.ceil(allPosts.postsCount / perPage);
    console.log("Total Pages", allPosts)
  
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

    const incPage = () =>{
        page = page + 1
    }


    return (
        <>
        <PostListOne data={allPosts} page={page} perPage={1} />
            {isPageOutOfRange ? (
                <div>No more pages...</div>
            ) : (

                <div className="flex justify-center items-center mt-16">
                    <div className="flex border-[1px] gap-4 rounded-[10px] border-light-green p-4">
                        {page === 1 ? (
                            <div className="opacity-60" aria-disabled="true">
                                Previous
                            </div>
                        ) : (
                            <p aria-label="Previous Page">
                                Previous
                            </p>
                        )}

                        {pageNumbers.map((pageNumber, index) => (
                            <Link
                                key={index}
                                className={
                                    page === pageNumber
                                        ? "bg-green-500 fw-bold px-2 rounded-md text-black"
                                        : "hover:bg-green-500 px-1 rounded-md"
                                }
                                href={`?page=${pageNumber}`}
                            >
                                {pageNumber}
                            </Link>
                        ))}

                        {page === totalPages ? (
                            <div className="opacity-60" aria-disabled="true">
                                Next
                            </div>
                        ) : (
                            <p onClick={() => incPage()} aria-label="Next Page">
                                Next
                            </p>
                        )}
                    </div>
                </div>

            )}
        </>
    )
}

export default PaginationTest