/**
 * GYMBot Main Application Component
 *
 * This is the root component of the React application.
 * It displays the main content and routes between different pages.
 *
 * Currently shows:
 * - HealthCheck component (for testing backend connection)
 *
 * Future: Will include routing for Exercise Tracking and Chatbot
 */

import HealthCheck from './components/HealthCheck';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Health Check - Shows backend connection status */}
      <HealthCheck />

      {/* Future: Main application content will go here */}
      {/* <ExerciseTracker /> */}
      {/* <Chatbot /> */}
    </div>
  );
}

export default App;
