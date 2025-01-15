"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MainContainer, SectionContainer } from "@/styles/style";
import { findUserOrders } from "@/actions/orders";
import Loading from "@/components/Loading";

const Profile: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orderHistory, setOrderHistory] = React.useState([]);
  useEffect(() => {
    // Fetch order history
    const fetchOrderHistory = async () => {
      const data = await findUserOrders(session?.user._id);
      console.log("Order History:", data);
      if (data) {
        setOrderHistory(
          data.map((order) => {
            const formattedDate = new Date(order.updatedAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            );
            return {
              id: order._id,
              date: formattedDate,
              total: order.subtotal + order.tax + order.shipping,
              status: order.status,
            };
          }) || []
        );
      }
    };
    fetchOrderHistory();
  }, [session]);

  // Redirect if not logged in
  if (status === "loading") return <Loading />;
  if (!session?.user) {
    if (typeof window !== "undefined") {
      router.push("/register");
    }
    return null;
  }

  return (
    <MainContainer className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <SectionContainer>
        {/* User Information */}
        <div className="flex flex-col items-center space-y-8">
          <Card>
            <CardHeader className="flex items-center space-x-4">
              <Avatar>
                {session.user.image ? (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name || "User"}
                  />
                ) : (
                  <AvatarFallback>
                    {session.user.name?.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold">
                  {session.user.name || "User"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              Role: <Badge>{session.user.role || "Customer"}</Badge>
            </CardContent>
          </Card>
        </div>
      </SectionContainer>
      <SectionContainer>
        <Separator />
      </SectionContainer>
      <SectionContainer>
        {/* Tabs for Additional Info */}
        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Order History */}
          <TabsContent value="orders">
            <h2 className="text-lg font-semibold">Order History</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderHistory.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "Delivered" ? "success" : "warning"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <h2 className="text-lg font-semibold">Preferences</h2>
            <p>
              Manage your preferences like notifications and saved addresses.
            </p>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <h2 className="text-lg font-semibold">Settings</h2>
            <Button
              variant="destructive"
              onClick={() => router.push("/logout")}
            >
              Log Out
            </Button>
          </TabsContent>
        </Tabs>
      </SectionContainer>
    </MainContainer>
  );
};

export default Profile;
