import asyncio
import websockets

async def echo(websocket):
    # Print the path to confirm it’s being passed

    # Send a welcome message
    await websocket.send("Welcome to the WebSocket server!")

    # Echo back every message we get
    async for message in websocket:
        print(f"Received from client: {message}")
        await websocket.send(f"Server echo: {message}")

async def main():
    async with websockets.serve(
        echo,
        "localhost",
        8765,
        ping_interval=10,
        ping_timeout=5
    ):
        print("WebSocket server is listening on ws://localhost:8765")
        await asyncio.Future()  # run forever

asyncio.run(main())
