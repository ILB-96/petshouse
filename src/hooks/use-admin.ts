import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react"; // Assuming you're using next-auth for authentication
import { IUser, Role } from "@/models/User";

const useAdmin = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();
      if (session?.user.role === Role.ADMIN) {
        setUser(session?.user as IUser);
      } else {
        router.push("/");
      }
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  return { user, loading };
};

export default useAdmin;
