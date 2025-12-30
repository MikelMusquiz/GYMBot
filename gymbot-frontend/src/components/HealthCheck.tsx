import { useState, useEffect } from 'react';
import { healthApi, handleApiError } from '../services/api';
import type { HealthInfoResponse } from '../types';
import '../styles/HealthCheck.css';

type Status = 'loading' | 'connected' | 'error';

/**
 * HealthCheck Component
 *
 * This component tests if the React frontend can communicate with the Spring Boot backend.
 *
 * What it does:
 * 1. When the component loads, it sends a request to the backend
 * 2. Shows a loading message while waiting for response
 * 3. If successful: Shows "Connected ✓" in green
 * 4. If failed: Shows error message in red
 *
 * This is useful for:
 * - Verifying the backend is running
 * - Testing the CORS configuration
 * - Learning how React hooks (useState, useEffect) work
 */
function HealthCheck() {
  // State variables to track component data
  // status: 'loading', 'connected', 'error'
  const [status, setStatus] = useState<Status>('loading');
  // Error message to display if connection fails
  const [errorMessage, setErrorMessage] = useState<string>('');
  // Backend information if connection succeeds
  const [backendInfo, setBackendInfo] = useState<HealthInfoResponse | null>(null);

  /**
   * Check if backend is running and respond
   */
  const checkBackendConnection = async (): Promise<void> => {
    try {
      // Send request to backend health check endpoint
      console.log('Checking backend connection...');
      await healthApi.check();

      // If successful, get more info
      const infoResponse = await healthApi.info();

      // Update state with success data
      setStatus('connected');
      setBackendInfo(infoResponse.data);
      console.log('✓ Backend connection successful!');
    } catch (error: unknown) {
      // If failed, show error message
      const errorMsg = handleApiError(error);
      setStatus('error');
      setErrorMessage(errorMsg);
      console.error('✗ Backend connection failed:', errorMsg);
    }
  };

  /**
   * useEffect Hook - Runs when component mounts (appears on page)
   *
   * Why we use useEffect:
   * - We want to check backend connection when the component loads
   * - useEffect() runs code after the component renders
   * - Empty dependency array [] means it runs once on mount
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkBackendConnection();
  }, []);

  /**
   * Render different UI based on connection status
   */
  return (
    <div className="health-check-container">
      <div className="health-check-card">
        <h2>Backend Connection Status</h2>

        {status === 'loading' && (
          <div className="status-loading">
            <p>⏳ Checking backend connection...</p>
          </div>
        )}

        {status === 'connected' && (
          <div className="status-success">
            <p className="status-indicator">✓ Connected</p>
            {backendInfo && (
              <div className="backend-info">
                <p><strong>Application:</strong> {backendInfo.application}</p>
                <p><strong>Version:</strong> {backendInfo.version}</p>
                <p><strong>Environment:</strong> {backendInfo.environment}</p>
                <p><strong>Features:</strong> {backendInfo.features}</p>
              </div>
            )}
          </div>
        )}

        {status === 'error' && (
          <div className="status-error">
            <p className="status-indicator">✗ Connection Failed</p>
            <p className="error-message">{errorMessage}</p>
            <button onClick={checkBackendConnection} className="retry-btn">
              Retry Connection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HealthCheck;
