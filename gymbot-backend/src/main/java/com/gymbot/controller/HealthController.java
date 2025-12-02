package com.gymbot.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Health Check Controller
 *
 * This controller provides endpoints to verify that the backend is running correctly.
 * The React frontend will use these endpoints to test communication with the backend.
 *
 * @RestController: Marks this class as a REST controller
 *   - It will handle HTTP requests
 *   - It will automatically convert responses to JSON
 *
 * @RequestMapping("/api/health"): Base path for all endpoints in this controller
 *   - All endpoints will be accessible at /api/health/*
 */
@RestController
@RequestMapping("/api/health")
public class HealthController {

    /**
     * Simple health check endpoint
     *
     * @return A JSON response with status "ok"
     *
     * How it works:
     * 1. Frontend sends GET request to /api/health/check
     * 2. This method receives the request
     * 3. It creates a map with status information
     * 4. Spring converts it to JSON and returns it
     * 5. Frontend receives: {"status":"ok","timestamp":"2024-12-02T..."}
     *
     * Testing: Open browser and visit http://localhost:8080/api/health/check
     */
    @GetMapping("/check")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "ok");
        response.put("timestamp", System.currentTimeMillis());
        response.put("message", "GYMBot Backend is healthy");
        return ResponseEntity.ok(response);
    }

    /**
     * Detailed health information endpoint
     *
     * @return Information about the application
     *
     * Testing: Open browser and visit http://localhost:8080/api/health/info
     */
    @GetMapping("/info")
    public ResponseEntity<Map<String, String>> healthInfo() {
        Map<String, String> response = new HashMap<>();
        response.put("application", "GYMBot");
        response.put("version", "1.0.0");
        response.put("environment", "development");
        response.put("features", "Exercise tracking, Chatbot suggestions");
        return ResponseEntity.ok(response);
    }
}
