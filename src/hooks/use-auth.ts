import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { IUser } from "@/models/User";
const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();
      if (session) {
        setUser(session?.user as IUser);
      } else {
        router.push("/api/auth/signin");
      }
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  return { user, loading };
};

export default useAuth;
