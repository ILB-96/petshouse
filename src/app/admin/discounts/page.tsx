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
import { getDiscounts, deleteDiscount } from "@/actions/discount";
import { IDiscount } from "@/models/Discount";
import AddButton from "./AddButton";

interface CategoriesPageProps {
  searchParams: SearchParams;
}
const ITEMS_PER_PAGE = 10;

const CategoriesPage: React.FC<CategoriesPageProps> = async ({
  searchParams,
}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, discounts } = await getDiscounts(q, page, ITEMS_PER_PAGE);

  return (
    <MainContainer>
      <SectionContainer>
        <div className="flex justify-between">
          <SearchComp placeholder="Search for a discount..." />
          <AddButton />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Slug</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Start</TableHead>
              <TableHead>End</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {discounts.map((discount: IDiscount) => (
              <TableRow key={discount.slug}>
                <TableCell>
                  <div className={styles.user}>{discount?.slug}</div>
                </TableCell>
                <TableCell>
                  <div className={styles.user}>{discount?.type}</div>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {discount?.code}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {discount?.startDate.toISOString().split("T")[0]}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {discount?.endDate?.toISOString().split("T")[0]}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <div className={styles.buttons}>
                    <Link href={`/admin/discounts/${discount?._id.toString()}`}>
                      <Button variant="outline">
                        <Icons.view />
                      </Button>
                    </Link>
                    <form action={deleteDiscount}>
                      <input
                        type="hidden"
                        name="id"
                        value={discount?._id.toString()}
                      />
                      <Button type="submit" variant="destructive">
                        <Icons.trash />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination count={count} items_per_page={ITEMS_PER_PAGE} />
      </SectionContainer>
    </MainContainer>
  );
};

export default CategoriesPage;
