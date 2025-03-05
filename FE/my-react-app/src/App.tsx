import { Suspense } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { CircularProgress, Stack } from "@mui/material";
import { Router } from "./routes/Router";

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Stack
            width="100vw"
            height="100vh"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <CircularProgress />
          </Stack>
        }
      >
        <Router />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
