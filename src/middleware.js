import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("do we have a token", token);
        return token?.email;
      },
    },
  },
);

// these are the routes you must be signed in to access
export const config = {
  matcher: [
    "/dash",
    "/cart",
    "/profile",
    "/menu-items",
    "/users",
    "/orders",
    "/categories",
    "/reports-admin-view",
    "/applications",
  ],
};
