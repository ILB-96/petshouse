import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react"; // Assuming you're using next-auth for authentication
import { User } from "@prisma/client";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();
      if (session) {
        setUser(session.user);
      } else {
        router.push("/login"); // Redirect to login if not authenticated
      }
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  return { user, loading };
};

export default useAuth;
