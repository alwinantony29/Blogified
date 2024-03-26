import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  
} from "react-router-dom";
import React, { lazy } from "react";

import UserContext from "./Context/userContext.jsx";
import RootLayout from "./Layout/RootLayout.jsx";
import SignIn from "./Components/Login/Login.jsx";
import { Blogs } from "./Components/Blogs/Blogs.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import PrivateRoute from "./Components/HOC/PrivateRoute.jsx";
import LazyLoad from "./Components/LazyLoad.jsx";

const UsersList = lazy(() =>
  import("./Components/Admin/usersList/usersList.jsx")
);
const SingleBlog = lazy(() => import("./Components/Blogs/SingleBlog.jsx"));
const MyBlogs = lazy(() => import("./Components/Blogs/MyBlogs.jsx"));
const EditBlog = lazy(() => import("./Components/Blogs/EditBlog.jsx"));
const CreateBlog = lazy(() => import("./Components/Blogs/CreateBlog.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" exact index element={<Blogs />} />
      <Route
        path="/login"
        element={
          <LazyLoad>
            <SignIn />
          </LazyLoad>
        }
      />
      <Route
        path="/newblog"
        element={
          <LazyLoad>
            <CreateBlog />
          </LazyLoad>
        }
      />
      <Route
        path="/myblogs"
        element={
          <LazyLoad>
            <MyBlogs />
          </LazyLoad>
        }
      />
      <Route
        path="/blogs/:blogID"
        element={
          <LazyLoad>
            <SingleBlog />
          </LazyLoad>
        }
      />
      <Route
        path="/edit/:blogID"
        element={
          <LazyLoad>
            <EditBlog />
          </LazyLoad>
        }
      />
      <Route
        path="/admin"
        element={
          <LazyLoad>
            <PrivateRoute path="/admin" roles={["admin"]}>
              <UsersList />
            </PrivateRoute>
          </LazyLoad>
        }
      />
      <Route path="/myprofile" element={<>My profile Page Coming soon</>} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContext>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </UserContext>
  </React.StrictMode>
);
