/**
 * GYMBot Main Application Component
 *
 * Phase 2: Exercise Tracking Table
 */

import ExerciseTable from './components/ExerciseTable';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>GYMBot - Fitness Tracking</h1>
        <p>Track your exercises and progress week by week</p>
      </header>

      <ExerciseTable />
    </div>
  );
}

export default App;
