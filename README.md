# GYMBot - Fitness Tracking Web Application

A full-stack web application for tracking exercises and receiving AI-powered chatbot suggestions for your fitness routine.

## How It Works

GYMBot is built as a two-tier architecture:

### Frontend (React)
- Single Page Application (SPA) built with React and Vite
- Provides the user interface for tracking exercises and interacting with chatbot
- Communicates with the backend via REST APIs
- Uses Axios HTTP client for API requests
- Manages UI state with React hooks

### Backend (Spring Boot)
- REST API server built with Spring Boot
- Handles business logic for exercise tracking and chatbot functionality
- Provides endpoints for health checks, exercise management, and chat interactions
- Manages data persistence and application configuration
- Enables cross-origin requests (CORS) to allow frontend communication

### Communication Flow
1. Frontend sends HTTP requests to backend REST endpoints
2. Backend processes requests and returns JSON responses
3. Frontend updates the UI based on responses
4. All communication goes through the `/api` base path

## Current Capabilities (Phase 1)

### Health Check System
The application includes health check endpoints that verify:
- Backend server status and availability
- Application name and version information
- General system health

These endpoints are used by the frontend to confirm the backend is running before allowing user interactions.

## Future Phases

### Phase 2: Exercise Tracking Backend
The backend will extend to support exercise data management:
- Database models for storing exercise information
- REST APIs for creating, reading, updating, and deleting exercises
- Data persistence using file-based JSON storage
- Exercise statistics calculations (1RM, max weight, training intensity)

### Phase 3: Exercise Tracking Frontend
The frontend will provide UI for exercise management:
- Exercise tracking table to display recorded exercises
- Form interface to add and edit new exercises
- Statistics dashboard showing performance metrics
- Visual feedback for progress tracking

### Phase 4: Chatbot Backend
Chatbot service will be added to provide intelligent suggestions:
- Chatbot logic engine for processing user messages
- REST API endpoints for chat interactions
- Integration with exercise data for contextual recommendations
- AI-powered exercise suggestions based on user history

### Phase 5: Chatbot Frontend
User-facing chat interface will be implemented:
- Chat window component for user interactions
- Message history display
- Exercise suggestion cards with details
- Integration with exercise tracking for seamless workflow

## Architecture Overview

### Technology Stack
- **Frontend**: React 19, Vite, Axios
- **Backend**: Spring Boot 3.2.0, Maven, Java 17
- **Communication**: REST APIs over HTTP with CORS enabled
- **Data Format**: JSON

### Key Components
- **Frontend Components**: Modular React components for UI sections
- **Backend Controllers**: REST endpoint handlers organized by feature
- **Backend Services**: Business logic layer for processing
- **Backend Models**: Data classes representing domain objects
- **API Client**: Centralized HTTP communication layer

## License

Personal learning project
