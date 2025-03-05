import { Drawer, Stack, Typography } from "@mui/material";
import React from "react";

interface CanvasPanelProps {
  canvasCurrentData: string[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CanvasPanel = ({
  canvasCurrentData,
  isOpen,
  setIsOpen,
}: CanvasPanelProps): React.ReactElement => {
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      transitionDuration={500}
      sx={{
        bgcolor: "#202123",
      }}
    >
      <Stack
        height={"100vh"}
        maxHeight={"100vh"}
        overflow={"auto"}
        bgcolor={"#202123"}
        padding={2}
        gap={4}
        sx={{
          scrollbarWidth: "thin",
          scrollbarColor: "#555 #202123",
        }}
      >
        <Typography variant="h4" sx={{ width: "100%", color: "white" }}>
          {"Canvas"}
        </Typography>
        <Stack
          sx={{
            width: 500,
            bgcolor: "#202123",
            color: "white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography whiteSpace={"pre-wrap"}>
            {canvasCurrentData.join(" ")}
          </Typography>
        </Stack>
      </Stack>
    </Drawer>
  );
};
