import { createBrowserRouter } from "react-router";
import App from "./App";
import Login from "./pages/Login";

// Data Mode routing configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // This makes it the default route for "/"
        element: <div>Welcome to DevTinder! Please login to continue.</div>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <div>Dashboard - Coming Soon!</div>,
      },
      {
        path: "profile",
        element: <div>Profile - Coming Soon!</div>,
      },
      // You can add loaders for data fetching
      // {
      //   path: "dashboard",
      //   element: <Dashboard />,
      //   loader: async () => {
      //     // Fetch user data here
      //     return fetch("/api/user/profile");
      //   },
      // },
    ],
  },
  // 404 page
  {
    path: "*",
    element: <div>404 - Page Not Found</div>,
  },
]);

export default router;
