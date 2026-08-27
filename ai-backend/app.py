from fastapi import FastAPI
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from mistralai.client import Mistral
from tavily import TavilyClient

load_dotenv()

client = Mistral(api_key=os.getenv("MISTRAL_API_KEY"))
tavily = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    response = client.chat.complete(
        model="mistral-small-latest",
        messages=[
            {"role": "system", "content": "You are a helpful AI assistant."},
            {"role": "user", "content": req.message}
        ]
    )

    return {"reply": response.choices[0].message.content}