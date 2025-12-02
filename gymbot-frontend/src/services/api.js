/**
 * API Client Service for GYMBot Frontend
 *
 * This file contains all functions to communicate with the Spring Boot backend.
 * It uses Axios to make HTTP requests.
 *
 * Why we need this:
 * - Centralizes all API calls in one place
 * - Makes it easy to change the backend URL
 * - Provides consistent error handling
 * - Reusable functions throughout the app
 */

import axios from 'axios';

// Base URL for the backend API
// Change this if your backend runs on a different port or address
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Create an Axios instance with default configuration
 * This ensures all requests use the correct base URL
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Health Check API
 *
 * These functions test if the backend is running
 */
export const healthApi = {
  /**
   * Check if the backend is healthy
   * @returns {Promise} Response with status
   *
   * Usage:
   * const response = await healthApi.check();
   * console.log(response.data.status); // "ok"
   */
  check: () => apiClient.get('/health/check'),

  /**
   * Get detailed health information
   * @returns {Promise} Response with application info
   */
  info: () => apiClient.get('/health/info'),
};

/**
 * Exercise API
 *
 * These functions will handle exercise CRUD operations
 * (Create, Read, Update, Delete)
 *
 * Note: This is prepared for future phases
 */
export const exerciseApi = {
  /**
   * Get all exercises
   * @returns {Promise} Array of exercises
   */
  getAllExercises: () => apiClient.get('/exercises'),

  /**
   * Get exercises for a specific date
   * @param {string} date - Date in format YYYY-MM-DD
   * @returns {Promise} Array of exercises for that date
   */
  getExercisesByDate: (date) =>
    apiClient.get('/exercises', { params: { date } }),

  /**
   * Create a new exercise
   * @param {object} exerciseData - Exercise data to save
   * @returns {Promise} Created exercise with ID
   */
  createExercise: (exerciseData) =>
    apiClient.post('/exercises', exerciseData),

  /**
   * Delete an exercise
   * @param {string} exerciseId - ID of exercise to delete
   * @returns {Promise} Confirmation of deletion
   */
  deleteExercise: (exerciseId) =>
    apiClient.delete(`/exercises/${exerciseId}`),

  /**
   * Get exercise statistics
   * @returns {Promise} Statistics like 1RM, max weight, intensity
   */
  getStatistics: () => apiClient.get('/statistics'),
};

/**
 * Chatbot API
 *
 * These functions will handle chatbot interactions
 *
 * Note: This is prepared for future phases
 */
export const chatbotApi = {
  /**
   * Send a message to the chatbot
   * @param {string} message - User's message
   * @returns {Promise} Bot's response
   */
  sendMessage: (message) =>
    apiClient.post('/chatbot/message', { message }),

  /**
   * Get exercise suggestions
   * @returns {Promise} Array of suggested exercises
   */
  getSuggestions: () =>
    apiClient.get('/chatbot/suggestions'),
};

/**
 * Error Handling Utility
 *
 * Use this to handle errors consistently across the app
 */
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    console.error('Error Response:', error.response.status, error.response.data);
    return `Server Error: ${error.response.status}`;
  } else if (error.request) {
    // Request made but no response
    console.error('No Response:', error.request);
    return 'No response from server - is the backend running?';
  } else {
    // Other errors
    console.error('Error:', error.message);
    return `Error: ${error.message}`;
  }
};

export default apiClient;
