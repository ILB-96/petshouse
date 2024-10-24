import { useEffect, useState } from "react";
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 500);
  }, []);
  return mounted;
};
