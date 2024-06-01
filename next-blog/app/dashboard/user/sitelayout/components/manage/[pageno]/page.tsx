import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/db/prismaclient"
import Link from "next/link";

interface PostPagesProps {
  params: { pageno: string };
}

async function getCustomComponentData(perPage: number, page: number) {
  try {
    // DB Query
    const components = await prisma.customComponent.findMany({
      select: {
        id: true,
        htmlContent: true,
        tailwindcss: true,
      },
      skip: (perPage * (page - 1)),
      take: perPage,
    })

    const allposts = await prisma.customComponent.findMany()

    const componentsCount = allposts.length

    const respnse = { components, componentsCount };
    return respnse;
  } catch (error) {
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export const ManageCustomComponents = async ({
  params: { pageno },
}: PostPagesProps) => {


  let page = parseInt(pageno, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 10;
  const data = await getCustomComponentData(perPage, page);

  const totalPages = Math.ceil(data.componentsCount / perPage);

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
      <div className="flex flex-col items-center lg:items-stretch gap-4 p-2 place-items-center">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Component Name</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.components.map((comp: any) => (
              <TableRow key={comp.id}>
                <TableCell>
                  {comp.id}
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/user/components/manage/edit/${comp.id}`}>
                    <Button variant="secondary">Edit</Button>
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
              <Link href={`/posts/${prevPage}`} aria-label="Previous Page">
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
                href={`/posts/${pageNumber}`}
              >
                {pageNumber}
              </Link>
            ))}

            {page === totalPages ? (
              <div className="opacity-60" aria-disabled="true">
                {"Next >"}
              </div>
            ) : (
              <Link href={`/posts/${nextPage}`} aria-label="Next Page">
                {"Next >"}
              </Link>
            )}
          </div>
        </div>

      )}
    </div>
  )
}

export default ManageCustomComponents;