"use server";

import Image from "next/image";
import Link from "next/link";

import Pagination from "@/components/dashboard/pagination/Pagination";
import SearchComp from "@/components/dashboard/search/Search";
import styles from "@/components/dashboard/users/users.module.css";
import { getUsers, deleteUser } from "@/lib/user";

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

interface UsersPageProps {
  searchParams: SearchParams;
}
const USERS_PER_PAGE = 10;

const UsersPage: React.FC<UsersPageProps> = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await getUsers(q, page, USERS_PER_PAGE);

  return (
    <MainContainer>
      <SectionContainer>
        <div className="flex justify-between">
          <SearchComp placeholder="Search for a user..." />
          <Link href="/dashboard/users/add">
            <Button>Add New</Button>
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-sm:hidden">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id.toString("base64")}>
                <TableCell className="max-sm:hidden">
                  <div className={styles.user}>
                    {user?.image ? (
                      <Image
                        src={user?.image}
                        alt=""
                        width={40}
                        height={40}
                        priority
                      />
                    ) : (
                      <Icons.User className="size-10" />
                    )}
                    {user?.name}
                  </div>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {user?.email}
                </TableCell>
                <TableCell className={styles.tableCell}>{user?.role}</TableCell>
                <TableCell className={styles.tableCell}>
                  <div className={styles.buttons}>
                    <Link href={`/admin/users/${user?._id}`}>
                      <Button variant="outline">
                        <Icons.View />
                      </Button>
                    </Link>
                    <form action={deleteUser}>
                      <input
                        type="hidden"
                        name="id"
                        value={user?._id.toString("base64")}
                      />
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
        <Pagination count={count} items_per_page={USERS_PER_PAGE} />
      </SectionContainer>
    </MainContainer>
  );
};

export default UsersPage;
