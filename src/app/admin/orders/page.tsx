"use server";
import Link from "next/link";

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
import { deleteOrder, getOrders } from "@/actions/orders";

interface OrdersPageProps {
  searchParams: SearchParams;
}
const ORDERS_PER_PAGE = 10;

const OrdersPage: React.FC<OrdersPageProps> = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, orders } = await getOrders(q, page, ORDERS_PER_PAGE);

  return (
    <MainContainer>
      <SectionContainer>
        <div className="flex justify-between">
          <SearchComp placeholder="Search for a user..." />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-sm:hidden">ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id.toString("base64")}>
                <TableCell className={styles.tableCell}>
                  {order._id.toString("base64")}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {order?.status}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {order?.paymentStatus}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {order?.subtotal + order?.tax + order?.shipping}$
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <div className={styles.buttons}>
                    <Link href={`/admin/users/${order?._id}`}>
                      <Button variant="outline">
                        <Icons.view />
                      </Button>
                    </Link>
                    <form action={deleteOrder}>
                      <input
                        type="hidden"
                        name="id"
                        value={order?._id.toString("base64")}
                      />
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
        <Pagination count={count} items_per_page={ORDERS_PER_PAGE} />
      </SectionContainer>
    </MainContainer>
  );
};

export default OrdersPage;
