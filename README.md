# WebVox - WebRTC Video Chat Application

## Overview
WebVox is a simple video chat application built using WebRTC, enabling peer-to-peer video and audio communication through a browser. The project consists of a Node.js server (`server.js`) for signaling and an HTML frontend (`room.ejs`) with embedded JavaScript for WebRTC logic and user interface.

## Features
- Real-time video and audio communication using WebRTC
- Peer-to-peer connection with signaling via a Node.js server
- Simple frontend interface for initiating and managing video calls

## Project Structure
- **`server.js`**: Backend server handling WebRTC signaling using WebSocket or similar protocol.
- **`room.ejs`**: Frontend page containing the video elements, UI controls, and WebRTC client-side logic in a `<script>` tag.
- **`README.md`**: This file, providing project documentation.

## Prerequisites
- **Node.js** (v16 or higher)
- **npm** (Node Package Manager)
- A modern web browser supporting WebRTC (e.g., Chrome, Firefox)

## Installation
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd webvox
   ```

2. **Install Dependencies**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```
   This installs required packages (e.g., `ws` for WebSocket signaling, if used in `server.js`).

3. **Start the Server**
   Run the signaling server:
   ```bash
   node server.js
   ```
   The server typically runs on `localhost:3000` (or as configured in `server.js`).
```
