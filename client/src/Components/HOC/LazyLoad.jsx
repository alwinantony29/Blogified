import React, { Suspense } from "react";
import { Loader } from "../Loader";

const LazyLoad = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default LazyLoad;
