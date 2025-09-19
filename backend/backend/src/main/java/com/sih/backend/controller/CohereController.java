package com.sih.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CohereController {

    @Value("${cohere.api.key}")
    private String cohereApiKey;

    @PostMapping("/roadmap")
    public ResponseEntity<Map<String, Object>> generateRoadmap(@RequestBody Map<String, String> body) {
        String prompt = body.get("prompt");
        if (prompt == null || prompt.trim().isEmpty()) {
            prompt = "Generate a career roadmap in valid JSON format for a Full Stack Java developer. " +
                    "The response should be a JSON object with 'stages' array, where each stage has " +
                    "'id', 'title', 'steps' (array), 'next' (array), 'importance', and 'difficulty' fields.";
        }

        try {
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + cohereApiKey);

            Map<String, Object> requestBody = Map.of(
                    "model", "command-nightly",
                    "message", prompt,
                    "max_tokens", 1500,
                    "temperature", 0.7
            );

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            Map<String, Object> response = restTemplate.postForObject(
                    "https://api.cohere.ai/v1/chat",
                    entity,
                    Map.class
            );

            // Extract text from the new Chat API response format
            String generatedText = null;
            if (response != null && response.get("text") != null) {
                generatedText = response.get("text").toString().trim();

                // Clean up markdown code blocks if present
                generatedText = cleanJsonResponse(generatedText);
            }

            // Return the response in a structured format
            if (generatedText != null && !generatedText.isEmpty()) {
                System.out.println(generatedText);
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "generated_text", generatedText,
                        "message", "Roadmap generated successfully"
                ));
            } else {
                System.out.println("No text found in response, using fallback");
                return fallbackRoadmap();
            }

        } catch (Exception e) {
            System.err.println("Error calling Cohere API: " + e.getMessage());
            e.printStackTrace();
            return fallbackRoadmap();
        }
    }

    private String cleanJsonResponse(String text) {
        if (text == null) return null;

        text = text.trim();

        // Remove markdown code blocks
        if (text.startsWith("```json")) {
            text = text.substring("```json".length()).trim();
        } else if (text.startsWith("```")) {
            text = text.substring(3).trim();
        }

        if (text.endsWith("```")) {
            text = text.substring(0, text.length() - 3).trim();
        }

        return text;
    }

    private ResponseEntity<Map<String, Object>> fallbackRoadmap() {
        String fallbackJson = """
            {
                "stages": [
                    {
                        "id": "beginner",
                        "title": "Beginner Level",
                        "steps": [
                            "Master Java fundamentals",
                            "Learn Object-Oriented Programming",
                            "Understand data structures and algorithms",
                            "Get familiar with IDEs (IntelliJ IDEA, Eclipse)"
                        ],
                        "next": ["intermediate"],
                        "importance": "high",
                        "difficulty": "easy"
                    },
                    {
                        "id": "intermediate",
                        "title": "Intermediate Level",
                        "steps": [
                            "Learn Spring Boot framework",
                            "Master REST API development",
                            "Understand database concepts (SQL)",
                            "Learn frontend basics (HTML, CSS, JavaScript)",
                            "Get familiar with React or Angular",
                            "Learn version control with Git"
                        ],
                        "next": ["advanced"],
                        "importance": "high",
                        "difficulty": "medium"
                    },
                    {
                        "id": "advanced",
                        "title": "Advanced Level",
                        "steps": [
                            "Master microservices architecture",
                            "Learn cloud platforms (AWS, GCP, Azure)",
                            "Implement CI/CD pipelines",
                            "Master Docker and Kubernetes",
                            "Build and deploy full-stack applications",
                            "Learn system design principles",
                            "Contribute to open source projects"
                        ],
                        "next": [],
                        "importance": "high",
                        "difficulty": "hard"
                    }
                ]
            }
            """;

        return ResponseEntity.ok(Map.of(
                "success", true,
                "generated_text", fallbackJson,
                "message", "Using fallback roadmap due to API error"
        ));
    }
}