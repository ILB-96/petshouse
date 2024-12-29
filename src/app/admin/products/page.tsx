"use server";
import Pagination from "@/components/dashboard/pagination/Pagination";
import SearchComp from "@/components/search/Search";
import styles from "@/components/dashboard/users/users.module.css";

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

import Link from "next/link";
import { getProducts, deleteProduct } from "@/actions/product";
import { IProduct } from "@/models/Product";

interface CategoriesPageProps {
  searchParams: SearchParams;
}
const products_PER_PAGE = 10;

const CategoriesPage: React.FC<CategoriesPageProps> = async ({
  searchParams,
}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, products } = await getProducts(q, page, products_PER_PAGE);

  return (
    <MainContainer>
      <SectionContainer>
        <div className="flex justify-between">
          <SearchComp placeholder="Search for a products..." />
          <Link href="/admin/products/add">
            <Button>Add New</Button>
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-sm:hidden">Slug</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: IProduct) => (
              <TableRow key={product.slug}>
                <TableCell className="max-sm:hidden">
                  <div className={styles.user}>{product?.slug}</div>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {product?.companyId?.toString()}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {product?.categoryId?.toString()}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <div className={styles.buttons}>
                    <Link href={`/admin/products/${product?.slug}`}>
                      <Button variant="outline">
                        <Icons.view />
                      </Button>
                    </Link>
                    <form action={deleteProduct}>
                      <input type="hidden" name="slug" value={product?.slug} />
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

export default CategoriesPage;
