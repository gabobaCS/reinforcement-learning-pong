# Reinforcement Learning Pong

A Pong game where you play against an AI agent trained using Proximal Policy Optimization (PPO).

## Project Vision

This project aims to create a real-time Pong game with the following architecture:

- **Frontend**: HTML5 Canvas-based game interface
- **Backend**: FastAPI server (Python) hosting the trained PPO agent
- **Communication**: WebSocket connection for real-time gameplay between the player and the AI agent

## Current Status

**Early Development** - Currently, only the basic HTML Canvas Pong game is implemented with simple rule-based AI. The reinforcement learning agent and WebSocket integration are planned for future implementation.

### Implemented
- Basic Pong game mechanics in HTML5 Canvas
- Player controls (Arrow keys)
- Simple rule-based AI opponent
- Score tracking
- Pause functionality (P key)

### Planned Features
- [ ] FastAPI backend server
- [ ] PPO (Proximal Policy Optimization) agent training
- [ ] WebSocket communication between frontend and backend
- [ ] Real-time AI gameplay against the trained agent
- [ ] Game state synchronization

## Getting Started

### Current Version
Simply open `pong.html` in a web browser to play against the basic AI.

**Controls:**
- Arrow Up/Down: Move your paddle
- P: Pause/unpause the game

## Technology Stack

- **Frontend**: HTML5 Canvas, JavaScript, WebSocket API
- **Backend**: Python, FastAPI, WebSocket
- **ML Framework**: PyTorch with OpenAI Gymnasium

