// 'use client';
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

const AllPosts = async () => {
  //   const [recposts, setRecposts] = useState<Post[]>();
  //   const [loading, setLoading] = useState(true);
  //   useEffect(() => {
  //     fetch("/api/posts/getallposts")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setRecposts(data);
  //         console.log(typeof data);
  //         console.log("allposts", recposts);
  //         setLoading(false);
  //       });
  //   }, []);

  //   function json2array(json: any){
  //     var result: any[] = [];
  //     var keys = Object.keys(json);
  //     keys.forEach(function(key){
  //         result.push(json[key]);
  //     });
  //     return result;
  // }

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  const recposts = await getPostsMetaWithPostSlug();

  return (
    <>
      <div className="text-3xl mb-4">POSTS</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>OpenGraph Image</TableHead>
            <TableHead>Post Title</TableHead>
            <TableHead>Last Modified</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {recposts.map((post) => (
            <TableRow key={post.slug}>
              <TableCell>
                <Image
                  src={post.opengraphimage}
                  alt="Picture of the author"
                  height={55}
                  width={55}
                />
              </TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.updatedAt.toString()}</TableCell>
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
