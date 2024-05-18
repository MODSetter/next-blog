import { Button } from "@/components/ui/button";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPostsMetaWithPostSlug } from "@/db/getters";
import Image from "next/image";
import prisma from "../../../db/prismaclient";
import { useEffect, useState } from "react";
import Link from "next/link";

export interface PostsProps {
  posts: Post[];
}

export interface Post {
  slug: string;
  opengraphimage: string;
  title: string;
  updatedAt: Date;
  metaDescription: string | null;
  views: number;
}

async function allPostMetaDataRequest() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, { cache: 'no-store' });
  return response.json();
}

const AllPosts = async () => {
  const recposts = await allPostMetaDataRequest();

  return (
    <>
      <div className="text-3xl mb-4">POSTS</div>
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
          {recposts.map((post: Post) => (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="m-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default AllPosts;
