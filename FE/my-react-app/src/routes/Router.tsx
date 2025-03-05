import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { HomeLayout } from "../layouts/HomeLayout";
import { RootPage } from "../modules/root/pages/RootPage";

const getApplicationMainRoutes = (): RouteObject[] => {
  return [
    {
      element: <HomeLayout />,
      path: "/",
      children: [
        {
          path: "",
          element: <RootPage />,
        },
      ],
    },
  ];
};

export const Router = (): React.ReactElement | null => {
  return useRoutes([...getApplicationMainRoutes()]);
};
