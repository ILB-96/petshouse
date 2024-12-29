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
import { ICompany } from "@/models/Company";
import { getCompanies, deleteCompany } from "@/actions/company";

interface CategoriesPageProps {
  searchParams: SearchParams;
}
const COMPANIES_PER_PAGE = 10;

const CategoriesPage: React.FC<CategoriesPageProps> = async ({
  searchParams,
}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, companies } = await getCompanies(q, page, COMPANIES_PER_PAGE);

  return (
    <MainContainer>
      <SectionContainer>
        <div className="flex justify-between">
          <SearchComp placeholder="Search for a companies..." />
          <Link href="/admin/companies/add">
            <Button>Add New</Button>
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-sm:hidden">Slug</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company: ICompany) => (
              <TableRow key={company.slug}>
                <TableCell className="max-sm:hidden">
                  <div className={styles.user}>{company?.slug}</div>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {company?.url}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <div className={styles.buttons}>
                    <Button variant="outline" asChild>
                      <Link href={`/admin/companies/${company?.slug}`}>
                        <Icons.view />
                      </Link>
                    </Button>
                    <form action={deleteCompany}>
                      <input type="hidden" name="slug" value={company?.slug} />
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
        <Pagination count={count} items_per_page={COMPANIES_PER_PAGE} />
      </SectionContainer>
    </MainContainer>
  );
};

export default CategoriesPage;
