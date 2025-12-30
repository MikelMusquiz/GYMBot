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

import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import type {
  HealthCheckResponse,
  HealthInfoResponse,
  Exercise,
  ExerciseCreateRequest,
  ExerciseUpdateRequest,
  ExerciseGroupedResponse,
  ChatbotMessageRequest,
  ChatbotMessageResponse,
  ChatbotSuggestion,
} from '../types';

// Base URL for the backend API
// Change this if your backend runs on a different port or address
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Create an Axios instance with default configuration
 * This ensures all requests use the correct base URL
 */
const apiClient: AxiosInstance = axios.create({
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
  check: (): Promise<AxiosResponse<HealthCheckResponse>> =>
    apiClient.get<HealthCheckResponse>('/health/check'),

  /**
   * Get detailed health information
   * @returns {Promise} Response with application info
   */
  info: (): Promise<AxiosResponse<HealthInfoResponse>> =>
    apiClient.get<HealthInfoResponse>('/health/info'),
};

/**
 * Exercise API
 *
 * These functions handle exercise CRUD operations
 * (Create, Read, Update, Delete)
 */
export const exerciseApi = {
  /**
   * Get all exercises
   * @returns {Promise} Array of exercises
   */
  getAllExercises: (): Promise<AxiosResponse<Exercise[]>> =>
    apiClient.get<Exercise[]>('/exercises'),

  /**
   * Get exercises grouped by category (PUSH/PULL/LEG)
   * @returns {Promise} Object with exercises grouped by category
   */
  getExercisesGrouped: (): Promise<AxiosResponse<ExerciseGroupedResponse>> =>
    apiClient.get<ExerciseGroupedResponse>('/exercises/grouped'),

  /**
   * Get exercise by ID
   * @param {string} id - Exercise ID
   * @returns {Promise} Exercise object
   */
  getExerciseById: (id: string): Promise<AxiosResponse<Exercise>> =>
    apiClient.get<Exercise>(`/exercises/${id}`),

  /**
   * Get exercises for a specific week
   * @param {number} weekNumber - Week number
   * @returns {Promise} Array of exercises for that week
   */
  getExercisesByWeek: (weekNumber: number): Promise<AxiosResponse<Exercise[]>> =>
    apiClient.get<Exercise[]>(`/exercises/week/${weekNumber}`),

  /**
   * Get exercises by category
   * @param {string} category - Category (PUSH, PULL, or LEG)
   * @returns {Promise} Array of exercises in that category
   */
  getExercisesByCategory: (category: string): Promise<AxiosResponse<Exercise[]>> =>
    apiClient.get<Exercise[]>(`/exercises/category/${category}`),

  /**
   * Create a new exercise
   * @param {object} exerciseData - Exercise data {name, maxReps, weekNumber, category}
   * @returns {Promise} Created exercise with ID
   */
  createExercise: (exerciseData: ExerciseCreateRequest): Promise<AxiosResponse<Exercise>> =>
    apiClient.post<Exercise>('/exercises', exerciseData),

  /**
   * Update an existing exercise
   * @param {string} id - Exercise ID
   * @param {object} exerciseData - Updated exercise data
   * @returns {Promise} Updated exercise
   */
  updateExercise: (id: string, exerciseData: ExerciseUpdateRequest): Promise<AxiosResponse<Exercise>> =>
    apiClient.put<Exercise>(`/exercises/${id}`, exerciseData),

  /**
   * Delete an exercise
   * @param {string} id - Exercise ID
   * @returns {Promise} Confirmation of deletion
   */
  deleteExercise: (id: string): Promise<AxiosResponse<void>> =>
    apiClient.delete<void>(`/exercises/${id}`),
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
  sendMessage: (message: string): Promise<AxiosResponse<ChatbotMessageResponse>> =>
    apiClient.post<ChatbotMessageResponse>('/chatbot/message', { message } as ChatbotMessageRequest),

  /**
   * Get exercise suggestions
   * @returns {Promise} Array of suggested exercises
   */
  getSuggestions: (): Promise<AxiosResponse<ChatbotSuggestion[]>> =>
    apiClient.get<ChatbotSuggestion[]>('/chatbot/suggestions'),
};

/**
 * Error Handling Utility
 *
 * Use this to handle errors consistently across the app
 */
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // Server responded with error status
      console.error('Error Response:', axiosError.response.status, axiosError.response.data);
      return `Server Error: ${axiosError.response.status}`;
    } else if (axiosError.request) {
      // Request made but no response
      console.error('No Response:', axiosError.request);
      return 'No response from server - is the backend running?';
    }
  }

  if (error instanceof Error) {
    // Other errors
    console.error('Error:', error.message);
    return `Error: ${error.message}`;
  }

  return 'An unknown error occurred';
};

export default apiClient;
