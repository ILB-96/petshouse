import React from "react";
import { useSession } from "next-auth/react";
import { useMounted } from "@/hooks/use-mounted";
import { Icons } from "@/components/icons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import { MainContainer, SectionContainer } from "@/styles/style";
const Profile = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session?.user) {
    if (typeof window !== "undefined") {
      window.location.href = "/register";
    }
  }
  return (
    <MainContainer>
      <SectionContainer>
        <h1>ProfilePage</h1>

        <div>
          {session?.user?.name ? <h2>Hello {session.user.name}!</h2> : null}
          {session?.user?.email ? <p>Email: {session.user.email}</p> : null}
          {session?.user?._id ? <p>Id: {session.user._id.toString()}</p> : null}
          {session?.user?.role ? <p>Role: {session.user.role}</p> : null}
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              width={200}
              height={200}
              alt={`Profile Pic for ${session.user.name}`}
              priority={true}
            />
          ) : null}
        </div>
      </SectionContainer>
    </MainContainer>
  );
};
export default Profile;
