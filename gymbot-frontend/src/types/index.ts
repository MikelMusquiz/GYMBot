// ============================================
// API Response Types
// ============================================

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  message: string;
}

export interface HealthInfoResponse {
  application: string;
  version: string;
  environment: string;
  features: string;
}

// ============================================
// Exercise Domain Types
// ============================================

export type ExerciseCategory = 'PUSH' | 'PULL' | 'LEG';

export interface Exercise {
  id: string;
  name: string;
  maxReps: number;
  weekNumber: number;
  category: ExerciseCategory;
}

export interface ExerciseCreateRequest {
  name: string;
  maxReps: number;
  weekNumber: number;
  category: ExerciseCategory;
}

export interface ExerciseUpdateRequest {
  name: string;
  maxReps: number;
  weekNumber: number;
  category: ExerciseCategory;
}

export interface ExerciseGroupedResponse {
  PUSH: Exercise[];
  PULL: Exercise[];
  LEG: Exercise[];
}

// ============================================
// ExerciseTable Component Types
// ============================================

export interface ExerciseItem {
  reps: number | null;
  id: string | null;
}

export interface ExerciseWithCategory {
  name: string;
  category: ExerciseCategory;
}

// AG Grid row data - dynamic keys for exercise names
export interface RowData {
  week: number;
  [exerciseName: string]: number | ExerciseItem;
}

// ============================================
// Chatbot Types (Future Phase)
// ============================================

export interface ChatbotMessageRequest {
  message: string;
}

export interface ChatbotMessageResponse {
  response: string;
  timestamp: string;
}

export interface ChatbotSuggestion {
  exerciseName: string;
  reason: string;
}
