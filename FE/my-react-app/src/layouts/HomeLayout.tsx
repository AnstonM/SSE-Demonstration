import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

export const HomeLayout = (): React.ReactElement => {
  return (
    <Stack height={"100vh"} width={"100vw"} bgcolor={"#202123 "}>
      <Outlet />
    </Stack>
  );
};
