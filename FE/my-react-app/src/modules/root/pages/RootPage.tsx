import { Stack } from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
import { CanvasPanel } from "../components/CanvasPanel";
import { ResponseStatus } from "../types/ResponseStatus";
import { DefaultMessagePanel } from "../components/DefaultMessagePanel";

export const RootPage = (): React.ReactElement => {
  const data = useRef<string[]>([]);
  const canvasData = useRef<string[]>([]);
  const [currentData, setCurrentData] = React.useState<string[]>([]);
  const [canvasCurrentData, setCanvasCurrentData] = React.useState<string[]>(
    []
  );
  const [isStreaming, setIsStreaming] = React.useState<boolean>(false);
  const [eventSource, setEventSource] = React.useState<EventSource>();
  const [isAnalyzing, setIsAnalyzing] = React.useState<boolean>(false);
  const [isCanvasOpen, setIsCanvasOpen] = React.useState<boolean>(false);
  const [isErrored, setIsErrored] = React.useState<boolean>(false);

  useEffect(() => {
    if (isStreaming) {
      const eventSource = new EventSource("http://127.0.0.1:8000/data");
      setEventSource(eventSource);
      eventSource.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        switch (parsedData.status) {
          case ResponseStatus.ANALYZING:
            setIsAnalyzing(true);
            break;
          case ResponseStatus.START_RESPONSE:
          case ResponseStatus.START_DEFAULT_MESSAGE:
            setIsAnalyzing(false);
            break;
          case ResponseStatus.START_CANVAS_MESSAGE:
            setIsAnalyzing(false);
            setIsCanvasOpen(true);
            break;
          case ResponseStatus.DEFAULT_MESSAGE:
            data.current = data.current.concat([`${parsedData.message}`]);
            setCurrentData(data.current);
            break;
          case ResponseStatus.CANVAS_MESSAGE:
            canvasData.current = canvasData.current.concat([
              `${parsedData.message}`,
            ]);
            setCanvasCurrentData(canvasData.current);
            break;
          case "STOP_CANVAS_MESSAGE":
          case "STOP_DEFAULT_MESSAGE":
            break;
          case "END_RESPONSE":
            eventSource.close();
            setIsStreaming(false);
            break;
          case "ANALYSIS_TIMEOUT":
            setIsErrored(true);
        }
      };
      eventSource.onerror = (event) => {
        console.log(event);
        setIsErrored(true);
        eventSource.close();
      };
      return () => {
        eventSource.close();
      };
    }
  }, [isStreaming]);

  const handleStopStreaming = useCallback(() => {
    eventSource?.close();
    setIsStreaming(false);
    setEventSource(undefined);
  }, [eventSource]);

  const handleResetData = useCallback(() => {
    setIsAnalyzing(false);
    setIsErrored(false);
    handleStopStreaming();
    setCurrentData([]);
    setCanvasCurrentData([]);
    canvasData.current = [];
    data.current = [];
    setIsCanvasOpen(false);
  }, []);

  return (
    <Stack
      height={"100%"}
      width={"100vw"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CanvasPanel
        isOpen={isCanvasOpen}
        setIsOpen={setIsCanvasOpen}
        canvasCurrentData={canvasCurrentData}
      />
      <DefaultMessagePanel
        currentData={currentData}
        isStreaming={isStreaming}
        setIsStreaming={setIsStreaming}
        isAnalyzing={isAnalyzing}
        isCanvasOpen={isCanvasOpen}
        isErrored={isErrored}
        handleResetData={handleResetData}
        handleStopStreaming={handleStopStreaming}
      />
    </Stack>
  );
};
