import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ],
  { basename: "/Todo-V1.2" } // <-- Add the basename here
);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
