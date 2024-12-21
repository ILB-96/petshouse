"use server";

import Pagination from "@/components/dashboard/pagination/Pagination";
import SearchComp from "@/components/dashboard/search/Search";
import styles from "@/components/dashboard/users/users.module.css";
import { deleteCategory } from "@/actions/category";

import { SearchParams } from "@/models/types";
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

import { getCategories } from "@/actions/category";
import { ICategory } from "@/models/Category";
import Link from "next/link";

interface CategoriesPageProps {
  searchParams: SearchParams;
}
const CATEGORIES_PER_PAGE = 10;

const CategoriesPage: React.FC<CategoriesPageProps> = async ({
  searchParams,
}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, categories } = await getCategories(
    q,
    page,
    CATEGORIES_PER_PAGE
  );

  return (
    <MainContainer>
      <SectionContainer>
        <div className="flex justify-between">
          <SearchComp placeholder="Search for a category..." />
          <Link href="/admin/categories/add">
            <Button>Add New</Button>
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-sm:hidden">Slug</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead>Draft</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category: ICategory) => (
              <TableRow key={category.slug}>
                <TableCell className="max-sm:hidden">
                  <div className={styles.user}>{category?.slug}</div>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {category?.parent}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {category?.isDraft.toString().toLocaleUpperCase()}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <div className={styles.buttons}>
                    <Link href={`/admin/categories/${category?.slug}`}>
                      <Button variant="outline">
                        <Icons.View />
                      </Button>
                    </Link>
                    <form action={deleteCategory}>
                      <input type="hidden" name="slug" value={category?.slug} />
                      <Button variant="destructive">
                        <Icons.Trash />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination count={count} items_per_page={CATEGORIES_PER_PAGE} />
      </SectionContainer>
    </MainContainer>
  );
};

export default CategoriesPage;
