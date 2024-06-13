import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import prisma from "@/db/prismaclient"
import Link from "next/link";

interface PostPagesProps {
    params: { pageno: string };
}

interface Post {
    slug: string;
    opengraphimage: string;
    title: string;
    updatedAt: Date;
    metaDescription: string | null;
    views: number;
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
            // where: {
            //     visibility: true
            // },
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

export const DashboardPostsPage = async ({
    params: { pageno },
}: PostPagesProps) => {


    let page = parseInt(pageno, 10);
    page = !page || page < 1 ? 1 : page;
    const perPage = 10;
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

    const onDelete = async (postslug: string) => {
        const deletePost = await prisma.post.delete({
            where: {
                slug: postslug,
            },
        })

        console.log(deletePost)
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>OpenGraph Image</TableHead>
                        <TableHead>Post Title</TableHead>
                        <TableHead>Last Modified</TableHead>
                        <TableHead>Views</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.posts.map((post: Post) => (
                        <TableRow key={post.slug}>
                            <TableCell>
                                <img
                                    src={post.opengraphimage}
                                    alt="Picture of the author"
                                    height={55}
                                    width={55}
                                />
                            </TableCell>
                            <TableCell>{post.title}</TableCell>
                            <TableCell>{(new Date(post.updatedAt)).toDateString()}</TableCell>
                            <TableCell>{post.views}</TableCell>
                            <TableCell className="text-right">
                                <Link href={`/dashboard/posts/edit/${post.slug}`}>
                                    <Button variant="secondary">Edit</Button>
                                </Link>
                            </TableCell>
                            <TableCell className="text-right">
                                {/* <Button variant="destructive">Delete</Button> */}
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive">Delete</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure you want to delete post?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. Post <span className="font-semibold">{post.title}</span> will be permanently deleted and removed from servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction>Confirm</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

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
                            <Link href={`/dashboard/posts/${prevPage}`} aria-label="Previous Page">
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
                                href={`/dashboard/posts/${pageNumber}`}
                            >
                                {pageNumber}
                            </Link>
                        ))}

                        {page === totalPages ? (
                            <div className="opacity-60" aria-disabled="true">
                                {"Next >"}
                            </div>
                        ) : (
                            <Link href={`/dashboard/posts/${nextPage}`} aria-label="Next Page">
                                {"Next >"}
                            </Link>
                        )}
                    </div>
                </div>
            )}

            <Link href={"/dashboard/posts/new"}>
                <Button>Create New Post</Button>
            </Link>
        </div>
    )
}

export default DashboardPostsPage;