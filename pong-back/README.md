# Pong Backend

FastAPI backend server for the Pong reinforcement learning project.

## Prerequisites

- Python 3.13 or higher
- [UV](https://docs.astral.sh/uv/) - Fast Python package installer and resolver

## Installation

Install dependencies using UV:
```bash
uv sync
```

This will create a virtual environment and install all dependencies from `pyproject.toml`.

## Running the Server

Start the development server using UV:
```bash
uv run python main.py
```

Or activate the virtual environment and run directly:
```bash
.venv\Scripts\activate  # On Windows
# source .venv/bin/activate  # On macOS/Linux
python main.py
```

The server will start on `http://localhost:8000`

### Available Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check endpoint
- `GET /api/game/status` - Game status endpoint

## Development

The backend uses:
- **FastAPI** - Modern web framework for building APIs
- **Uvicorn** - ASGI server for running the application
- **CORS** - Configured to allow frontend communication

## Notes

- The server runs on port 8000 by default
- CORS is configured to accept requests from any origin (set to `*` for development)
