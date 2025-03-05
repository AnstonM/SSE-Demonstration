import { Button, Stack, Typography } from "@mui/material";
import React from "react";

interface DefaultMessagePanelProps {
  currentData: string[];
  isStreaming: boolean;
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>;
  isAnalyzing: boolean;
  isCanvasOpen: boolean;
  isErrored: boolean;
  handleResetData: () => void;
  handleStopStreaming: () => void;
}

export const DefaultMessagePanel = ({
  currentData,
  isStreaming,
  setIsStreaming,
  isAnalyzing,
  isCanvasOpen,
  isErrored,
  handleResetData,
  handleStopStreaming,
}: DefaultMessagePanelProps): React.ReactElement => {
  return (
    <Stack
      sx={{
        marginRight: isCanvasOpen ? "500px" : 0, // Add margin to move content aside when drawer is open
        transition: "margin-right 0.5s ease",
        gap: "20px",
      }}
    >
      <Stack
        sx={{
          width: "1200px",
          height: "600px",
          p: 2,
          bgcolor: "#2E2F32",
          borderRadius: "40px",
          border: "1px solid gray",
          color: "white",
        }}
      >
        <Stack
          overflow={"auto"}
          sx={{
            scrollbarWidth: "thin",
            scrollbarColor: "#555 #202123",
          }}
          padding={"40px"}
        >
          {isAnalyzing ? (
            <Typography sx={{ animation: "blink 1s linear infinite" }}>
              {"Analyzing..."}
            </Typography>
          ) : (
            <Typography whiteSpace={"pre-wrap"}>
              {currentData.join(" ")}
            </Typography>
          )}
          {isErrored && (
            <Typography sx={{ color: "red" }}>
              {"Error Generating Response..."}
            </Typography>
          )}
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        width={"100%"}
        gap={"20px"}
        paddingX={"20px"}
        justifyContent={"flex-end"}
      >
        {!isStreaming && (
          <Button
            variant="contained"
            onClick={() => {
              handleResetData();
              setIsStreaming(true);
            }}
          >
            {isErrored ? "Retry" : "Start"}
          </Button>
        )}
        {isStreaming && (
          <Button variant="contained" onClick={handleStopStreaming}>
            {"Stop"}
          </Button>
        )}
        <Button
          variant="outlined"
          onClick={() => {
            handleResetData();
          }}
        >
          {"Clear"}
        </Button>
      </Stack>
    </Stack>
  );
};
