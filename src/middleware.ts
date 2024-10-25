// src/middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile"], // Specify which routes the middleware should apply to
};
