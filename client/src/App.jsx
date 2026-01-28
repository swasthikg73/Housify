import Home from "./pages/Home/Home.jsx";
import ListPage from "./pages/ListPage/ListPage.jsx";
import Layout from "./pages/layout/Layout.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Details from "./pages/DetailsPage/Details.jsx";
import Profile from "./pages/Profile/Profile.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "list",
          element: <ListPage />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: ":id",
          element: <Details />,
        },
        {
          path: "profile/:id",
          element: <Profile />,
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
