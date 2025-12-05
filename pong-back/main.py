from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Pong Backend API")

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to Pong Backend API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Example game endpoint
@app.websocket("/ws/pong")
async def pong_websocket(websocket: WebSocket):
    print("Call for WebSocket")
    await websocket.accept()
    print("Client connected")

    try:
        while True:
            data = await websocket.receive_text()
            print("Received:", data)
            await websocket.send_text(f"Server echo: {data}")
    except Exception as e:
        print("Client disconnected", e)
        
        
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)