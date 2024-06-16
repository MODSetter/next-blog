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

interface Component {
    id: string;
    htmlContent: string;
    tailwindcss: string;
}

export default function ManageComponents() {
    const [loadingState, setloadingState] = useState(false);
    const [data, setData] = useState<Component[]>([]);
    const { toast } = useToast();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 15;



    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/component/`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setloadingState(true)
            }
            )
    }, []);

    const onDelete = async (compid: string) => {
        console.log(compid)
        const deleteComp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/component/${compid}`,{
            method: "DELETE",
        })
        const compDeleted = await deleteComp.json()
        if (compDeleted.id) {
            toast({
                variant: "default",
                description: `${compDeleted.id} is now removed`,
                className: "bg-green-400/20 backdrop-blur-lg"
            });
        } else {
            toast({
                variant: "destructive",
                description: `SOMETHING WENT WRONG`,
                className: "backdrop-blur-lg"
            });
        }

        router.push("/dashboard/user/sitelayout/components/manage")
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
                                <TableHead>Component Name</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {currentPosts.map((comp: any) => (
                                <TableRow key={comp.id}>
                                    <TableCell>
                                        {comp.id}
                                    </TableCell>
                                    <TableCell>
                                        <a href={`/dashboard/user/sitelayout/components/edit/${comp.id}`}>
                                            <Button variant="secondary">Edit</Button>
                                        </a>
                                    </TableCell>
                                    <TableCell className="text-right">
                                    <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive">Delete</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure you want to delete component?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. Post <span className="font-semibold">{comp?.id}</span> will be permanently deleted and removed from servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => onDelete(comp?.id)}>Confirm</AlertDialogAction>
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