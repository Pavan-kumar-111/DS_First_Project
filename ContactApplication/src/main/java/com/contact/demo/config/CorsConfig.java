package com.contact.demo.config;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource; // Fixed import statement
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        var urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        var corsConfiguration = new CorsConfiguration();
        
        // Enable credentials sharing
        corsConfiguration.setAllowCredentials(true);
        
        // Set allowed origins
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:5173", "http://localhost:5174"));
        
        // Set allowed headers
        corsConfiguration.setAllowedHeaders(List.of(
            "Origin", 
            "Access-Control-Allow-Origin", 
            "Content-Type", 
            "Accept", 
            "Authorization", 
            "X-Requested-With"
        ));
        
        // Set exposed headers
        corsConfiguration.setExposedHeaders(List.of(
            "Origin", 
            "Content-Type", 
            "Accept", 
            "Authorization"
        ));
        
        // Set allowed methods
        corsConfiguration.setAllowedMethods(List.of(
            "GET", 
            "POST", 
            "PUT", 
            "PATCH", 
            "DELETE", 
            "OPTIONS"
        ));
        
        // Apply CORS configuration to all endpoints
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        
        return new CorsFilter(urlBasedCorsConfigurationSource);
    }
}
