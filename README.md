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

## Development Roadmap

### Phase 2: Exercise Tracking Table (Priority 1)
Full-stack implementation of exercise tracking with weekly progression:

**Backend:**
- Create Exercise model with fields for exercise name, max reps, week number, category (Push/Pull/Leg)
- REST APIs for CRUD operations on exercises
- Data persistence using file-based JSON storage
- Endpoint to retrieve exercises grouped by category and sorted by week

**Frontend:**
- Excel-like table component displaying exercises
- Columns: Each exercise with its max repetitions
- Rows: Each row represents one week of training
- Column grouping by Push/Pull/Leg categories
- Editable cells for updating max repetitions
- Add/remove exercises and weeks functionality

### Phase 3: AI Chatbot Integration (Priority 2)
Contextual chatbot with access to user exercise data:

**Backend:**
- Chatbot service with AI/LLM integration
- REST API endpoints for chat interactions
- Context management: provide chatbot with user's exercise history
- Generate personalized suggestions based on current training data

**Frontend:**
- Chat interface component with message history
- Send/receive messages in real-time
- Display exercise-related suggestions from chatbot
- Integration with exercise table for seamless context

### Phase 4: User Authentication (Priority 3)
Secure user login and session management:

**Backend:**
- User model with credentials (username, hashed password)
- Authentication endpoints (register, login, logout)
- Session/token-based authentication (JWT or Spring Security sessions)
- Secure endpoints requiring authentication

**Frontend:**
- Login/Register forms
- Session state management
- Protected routes requiring authentication
- User profile display

### Phase 5: Database Migration (Priority 4)
Transition from file-based to database storage with security:

**Backend:**
- Database setup (PostgreSQL, MySQL, or H2 for development)
- JPA/Hibernate entity models
- Repository layer for database operations
- Migration scripts to move existing JSON data to database
- Secure data access: users only access their own exercise data

**Frontend:**
- No major changes (same API contracts)
- Enhanced error handling for database operations

### Phase 6: Advanced Features
Additional capabilities to enhance the fitness tracking experience:

**Exercise Statistics & Analysis:**
- Calculate 1RM (one-rep max) from recorded data
- Track training intensity and volume over time
- Visualize progress with charts and graphs
- Weekly/monthly performance summaries

**Posture Analysis (Computer Vision):**
- Upload exercise photos
- AI-powered posture correction suggestions
- Visual feedback on form improvements

**Calorie Tracking (Image Recognition):**
- Upload food photos
- AI-powered calorie estimation
- Nutritional information display

**Recipe Suggestions:**
- Chatbot generates recipes based on available ingredients
- Filter by dietary preferences and calorie goals
- Integration with calorie tracking

**Voice Interaction:**
- Voice input for chatbot conversations
- Hands-free exercise logging
- Text-to-speech for chatbot responses

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
