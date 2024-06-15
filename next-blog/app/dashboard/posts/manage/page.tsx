"use client";

import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";

interface Posts {
    title: string;
    slug: string;
    opengraphimage: string;
    updatedAt: Date;
    metaDescription: string | null;
    views: number;
    tags: {
        tagname: string;
    }[];
}

export default function ClientPagination() {
    const [loadingState, setloadingState] = useState(false);
    const [data, setData] = useState<Posts[]>([]);
    const { toast } = useToast();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 15;



    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setloadingState(true)
            }
            )
    }, []);

    const onDelete = async (postslug: string) => {
        const deletePost = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/delete/${postslug}`)
        const postDeleted = await deletePost.json()
        if (postDeleted.slug) {
            toast({
                variant: "default",
                description: `${postDeleted.title} is now removed`,
                className: "bg-green-400/20 backdrop-blur-lg"
            });
        } else {
            toast({
                variant: "destructive",
                description: `SOMETHING WENT WRONG`,
                className: "backdrop-blur-lg"
            });
        }

        router.push("/dashboard/posts/manage")
    }

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = data.slice(firstPostIndex, lastPostIndex);

    return (
        <>
            {loadingState ? (
                <>
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
                            {currentPosts.map((post) => (
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
                                        <a href={`/dashboard/posts/edit/${post.slug}`}>
                                            <Button variant="secondary">Edit</Button>
                                        </a>
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
                                                    <AlertDialogAction onClick={() => onDelete(post.slug)}>Confirm</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <PaginationSection
                        totalPosts={data.length}
                        postsPerPage={postsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    <a href={"/dashboard/posts/new"}>
                        <Button>Create New Post</Button>
                    </a>
                </>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 w-full p-10">
                    LOADING
                </div>
            )}
        </>
    );
}
function PaginationSection({
    totalPosts,
    postsPerPage,
    currentPage,
    setCurrentPage,
}: {
    totalPosts: any;
    postsPerPage: any;
    currentPage: any;
    setCurrentPage: any;
}) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const maxPageNum = 5; // Maximum page numbers to display at once
    const pageNumLimit = Math.floor(maxPageNum / 2); // Current page should be in the middle if possible

    let activePages = pageNumbers.slice(
        Math.max(0, currentPage - 1 - pageNumLimit),
        Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
    );

    const handleNextPage = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to render page numbers with ellipsis
    const renderPages = () => {
        const renderedPages = activePages.map((page, idx) => (
            <PaginationItem
                key={idx}
                className={currentPage === page ? "bg-muted/10 border rounded-md" : ""}
            >
                <PaginationLink onClick={() => setCurrentPage(page)}>
                    {page}
                </PaginationLink>
            </PaginationItem>
        ));

        // Add ellipsis at the start if necessary
        if (activePages[0] > 1) {
            renderedPages.unshift(
                <PaginationEllipsis
                    key="ellipsis-start"
                    onClick={() => setCurrentPage(activePages[0] - 1)}
                />
            );
        }

        // Add ellipsis at the end if necessary
        if (activePages[activePages.length - 1] < pageNumbers.length) {
            renderedPages.push(
                <PaginationEllipsis
                    key="ellipsis-end"
                    onClick={() =>
                        setCurrentPage(activePages[activePages.length - 1] + 1)
                    }
                />
            );
        }

        return renderedPages;
    };

    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={handlePrevPage} />
                    </PaginationItem>

                    {renderPages()}

                    <PaginationItem>
                        <PaginationNext onClick={handleNextPage} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}