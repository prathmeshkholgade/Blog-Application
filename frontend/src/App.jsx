import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CreatePostPage from "./pages/CreatePostPage";
import Home from "./pages/Home";
import BlogDetails from "./components/BlogDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/create",
        element: <CreatePostPage />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetails />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
