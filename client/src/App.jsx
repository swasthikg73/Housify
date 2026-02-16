import Home from "./pages/Home/Home.jsx";
import ListPage from "./pages/ListPage/ListPage.jsx";
import { Layout, RequireAuth } from "./pages/layout/Layout.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Details from "./pages/DetailsPage/Details.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import AboutPage from "./pages/about/AboutPage.jsx";
import Register from "./pages/register/Register.jsx";
import ProfileUpdate from "./pages/ProfileUpdatePage/ProfileUpdate.jsx";
import AddPost from "./pages/Add Post/AddPost.jsx";
import {
  singlePageLoader,
  listPageLoader,
  profilePageLoader,
} from "./lib/Loader.js";
import ErrorPage from "./pages/Error Handler/Error.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "list",
          loader: listPageLoader,
          element: <ListPage />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },

        {
          path: "about",
          element: <AboutPage />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "details/:id",
          loader: singlePageLoader,
          element: <Details />,
        },
        {
          path: "profile/:id",
          loader: profilePageLoader,
          element: <Profile />,
        },
        {
          path: "profile-update",
          element: <ProfileUpdate />,
        },
        {
          path: "addpost",
          element: <AddPost />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
