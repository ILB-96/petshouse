"use client";
import React from "react";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  const user = session?.user?.name || "Guest"; // Use session data to get user name

  return <div>{JSON.stringify(user)}</div>;
};
export default Profile;
