"use client";
import Cookies from "js-cookie";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { getCartFromLocalStorage } from "@/lib/cartStorage";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session?.user) {
        router.push("/");
      }
    };
    checkSession();
  }, [router]);

  const searchParams = useSearchParams();
  const cart = getCartFromLocalStorage();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  const handleSignIn = async (provider: string) => {
    Cookies.set("cart", cart);
    await signIn(provider, { callbackUrl });
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        email: formValues.email,
        password: formValues.password,
        cart: cart,
        callbackUrl,
      });

      setLoading(false);

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("invalid email or password");
        setLoading(false);
      }
    } catch (error: unknown) {
      setLoading(false);
      setError(error as string);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const input_style =
    "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";
  return (
    <div>
      <form onSubmit={onSubmit}>
        {error && (
          <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
        )}
        <div className="mb-6">
          <input
            required
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Email address"
            className={`${input_style}`}
          />
        </div>
        <div className="mb-6">
          <input
            required
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Password"
            className={`${input_style}`}
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
          className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          disabled={loading}
        >
          {loading ? <Icons.loader /> : "Sign In"}
        </button>

        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0">OR</p>
        </div>
        <a
          className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
          style={{ backgroundColor: "#55acee" }}
          onClick={() => handleSignIn("github")}
          role="button"
        >
          <Icons.github className="size-6 mr-2" />
          Continue with GitHub
        </a>
        <a
          className="px-7 py-2 mt-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
          style={{ backgroundColor: "#b5342a" }}
          onClick={() => handleSignIn("google")}
          role="button"
        >
          <Icons.google className="size-6 mr-2" />
          Continue with Google
        </a>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-500"></p>
        <Button
          type="button"
          variant="link"
          asChild
          className="text-blue-600 hover:underline mt-2 font-medium"
        >
          <Link href="/api/auth/signup">Don&apos;t have an account?</Link>
        </Button>
      </div>
    </div>
  );
};
