package com.gymbot.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS (Cross-Origin Resource Sharing) Configuration
 *
 * This configuration allows the React frontend (running on a different port)
 * to make HTTP requests to the Spring Boot backend.
 *
 * Why CORS is needed:
 * - Backend runs on http://localhost:8080
 * - Frontend runs on http://localhost:3000 (React default)
 * - Browsers block requests across different ports/domains by default
 * - CORS configuration tells the browser to allow this communication
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                // Allow requests from React frontend on port 3000
                .allowedOrigins("http://localhost:3000", "http://localhost:5173")
                // Allow these HTTP methods
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                // Allow headers like Content-Type, Authorization, etc.
                .allowedHeaders("*")
                // Allow credentials (cookies, auth headers) to be sent
                .allowCredentials(true)
                // How long (in seconds) to cache the CORS response
                .maxAge(3600);
    }
}
