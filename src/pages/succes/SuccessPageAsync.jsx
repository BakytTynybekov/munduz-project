import { lazy } from "react";
export const SuccessPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import("./SuccessPage")), 1000);
    })
);
