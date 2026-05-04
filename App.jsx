import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "movies", element: <Movies /> },
      { path: "movie/:id", element: <MovieDetails /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
