from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
import random
from enum import Enum

class ResponseStatus(Enum):
    ANALYZING = "ANALYZING"
    START_RESPONSE = "START_RESPONSE"
    START_DEFAULT_MESSAGE = "START_DEFAULT_MESSAGE"
    START_CANVAS_MESSAGE = "START_CANVAS_MESSAGE"
    DEFAULT_MESSAGE = "DEFAULT_MESSAGE"
    CANVAS_MESSAGE = "CANVAS_MESSAGE"
    STOP_CANVAS_MESSAGE = "STOP_CANVAS_MESSAGE"
    STOP_DEFAULT_MESSAGE = "STOP_DEFAULT_MESSAGE"
    END_RESPONSE = "END_RESPONSE"
    ANALYSIS_TIMEOUT = "ANALYSIS_TIMEOUT"

genertorText = [
    "lorem ipsum",
    "dolor sit\n",
    "amet consectetur",
    "adipiscing elit",
    "sed do",
    "eiusmod tempor",
    "incididunt ut",
    "labore et",
    "dolore magna",
    "aliqua Ut\n",
    "enim ad",
    "minim veniam",
    "quis nostrud",
    "exercitation ullamco",
    "laboris nisi",
    "ut aliquip",
    "ex ea\n",
    "commodo consequat.",
    "Duis aute",
    "irure dolor",
    "in reprehenderit",
    "in voluptate",
    "velit esse",
    "cillum dolore\n",
    "eu fugiat",
    "nulla pariatur.",
    "Excepteur sint",
    "occaecat cupidatat",
    "non proident,",
    "sunt in",
    "culpa qui",
    "officia deserunt",
    "mollit anim",
    "id est",
    "laborum.",
]

def get_random_text():
    return random.choice(genertorText)

app = FastAPI()

# Configure CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_message(status: ResponseStatus, message: str | None):
    return f"data: {json.dumps({"status": status.value, "message": message})}\n\n"


async def generateData():    
    yield get_message(ResponseStatus.ANALYZING, None)
    await asyncio.sleep(3)
    yield get_message(ResponseStatus.START_RESPONSE, None)
    await asyncio.sleep(1)
    yield get_message(ResponseStatus.START_DEFAULT_MESSAGE, None)
    current = 0
    while current < 200:
        await asyncio.sleep(0.05)
        if(current < 20 or current > 80):
            yield get_message(ResponseStatus.DEFAULT_MESSAGE, get_random_text())
        if(current == 20):
            yield get_message(ResponseStatus.START_CANVAS_MESSAGE, None)
        if(current > 20 or current < 90):
            yield get_message(ResponseStatus.CANVAS_MESSAGE, get_random_text()) 
        if(current==90):
            yield get_message(ResponseStatus.STOP_CANVAS_MESSAGE, None)        
        current += 1 
    yield get_message(ResponseStatus.STOP_DEFAULT_MESSAGE, None)
    yield get_message(ResponseStatus.END_RESPONSE, None)
    

@app.get("/data")
async def sse():
    return StreamingResponse(generateData(), media_type="text/event-stream")