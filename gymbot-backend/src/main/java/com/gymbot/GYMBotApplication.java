package com.gymbot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the GYMBot Spring Boot application.
 *
 * This class starts the Spring Boot server which provides REST APIs for:
 * - Exercise tracking and management
 * - Chatbot functionality for exercise suggestions
 */
@SpringBootApplication
public class GYMBotApplication {

    public static void main(String[] args) {
        SpringApplication.run(GYMBotApplication.class, args);
        System.out.println("✓ GYMBot Backend is running on http://localhost:8080");
    }
}
