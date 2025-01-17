"use server";
import Pagination from "@/components/dashboard/pagination/Pagination";
import SearchComp from "@/components/search/Search";
import styles from "@/components/dashboard/users/users.module.css";

import { SearchParams } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MainContainer, SectionContainer } from "@/styles/style";
import { Icons } from "@/components/icons";

import Link from "next/link";
import Image from "next/image";
import { deleteProduct } from "@/actions/product";
import { getMedia } from "@/actions/media";
import { IMedia } from "@/models/Media";

interface PageProps {
  searchParams: SearchParams;
}
const products_PER_PAGE = 10;

const MediaPage: React.FC<PageProps> = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, items } = await getMedia(q, page, products_PER_PAGE);

  return (
    <MainContainer>
      <SectionContainer>
        <div className="flex justify-between">
          <SearchComp placeholder="Search for a media..." />
          <Link href="/admin/media/add">
            <Button>Add New</Button>
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-sm:hidden">Name</TableHead>
              <TableHead>Media</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item: IMedia) => (
              <TableRow key={item.name}>
                <TableCell className="max-sm:hidden">
                  <div className={styles.user}>{item.name}</div>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <Link
                    href={item.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={item.source}
                      alt={item.caption || ""}
                      width={100}
                      height={100}
                      priority
                    />
                  </Link>
                </TableCell>
                <TableCell className={styles.tableCell}>{item.type}</TableCell>
                <TableCell className={styles.tableCell}>
                  <div className={styles.buttons}>
                    <Link href={`/admin/media/${item.name}`}>
                      <Button variant="outline">
                        <Icons.view />
                      </Button>
                    </Link>
                    <form action={deleteProduct}>
                      <input type="hidden" name="name" value={item.name} />
                      <Button variant="destructive">
                        <Icons.trash />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination count={count} items_per_page={products_PER_PAGE} />
      </SectionContainer>
    </MainContainer>
  );
};

export default MediaPage;
