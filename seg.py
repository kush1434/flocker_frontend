import asyncio
import websockets
from websockets.exceptions import ConnectionClosedOK, ConnectionClosedError

connected = set()

async def broadcast(websocket):
    connected.add(websocket)
    await websocket.send("Welcome! You’re now in the broadcast room.")
    try:
        async for message in websocket:
            print(f"Broadcasting: {message}")
            to_remove = set()
            for client in connected:
                try:
                    await client.send(f"Broadcast: {message}")
                except (ConnectionClosedOK, ConnectionClosedError):
                    # client already closed; mark for removal
                    to_remove.add(client)
            # remove any dead clients
            for dead in to_remove:
                connected.remove(dead)
    finally:
        connected.remove(websocket)

async def main():
    async with websockets.serve(broadcast, "localhost", 8765, ping_interval=10, ping_timeout=5):
        print("Broadcast server is listening on ws://localhost:8765")
        await asyncio.Future()  # run forever

asyncio.run(main())
