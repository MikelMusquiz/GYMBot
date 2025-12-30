package com.gymbot.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gymbot.model.Exercise;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExerciseService {

    @Value("${data.storage.path}")
    private String storagePath;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private File getStorageFile() {
        File dir = new File(storagePath);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        return new File(dir, "exercises.json");
    }

    private List<Exercise> loadExercises() {
        File file = getStorageFile();
        if (!file.exists()) {
            return new ArrayList<>();
        }
        try {
            return objectMapper.readValue(file, new TypeReference<List<Exercise>>() {});
        } catch (IOException e) {
            throw new RuntimeException("Failed to load exercises", e);
        }
    }

    private void saveExercises(List<Exercise> exercises) {
        File file = getStorageFile();
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, exercises);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save exercises", e);
        }
    }

    public List<Exercise> getAllExercises() {
        return loadExercises();
    }

    public Map<String, List<Exercise>> getExercisesGroupedByCategory() {
        List<Exercise> exercises = loadExercises();
        return exercises.stream()
                .collect(Collectors.groupingBy(Exercise::getCategory));
    }

    public Exercise getExerciseById(String id) {
        return loadExercises().stream()
                .filter(ex -> ex.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public Exercise createExercise(Exercise exercise) {
        List<Exercise> exercises = loadExercises();
        exercise.setId(UUID.randomUUID().toString());
        exercises.add(exercise);
        saveExercises(exercises);
        return exercise;
    }

    public Exercise updateExercise(String id, Exercise updatedExercise) {
        List<Exercise> exercises = loadExercises();
        for (int i = 0; i < exercises.size(); i++) {
            if (exercises.get(i).getId().equals(id)) {
                updatedExercise.setId(id);
                exercises.set(i, updatedExercise);
                saveExercises(exercises);
                return updatedExercise;
            }
        }
        return null;
    }

    public boolean deleteExercise(String id) {
        List<Exercise> exercises = loadExercises();
        boolean removed = exercises.removeIf(ex -> ex.getId().equals(id));
        if (removed) {
            saveExercises(exercises);
        }
        return removed;
    }

    public List<Exercise> getExercisesByWeek(Integer weekNumber) {
        return loadExercises().stream()
                .filter(ex -> ex.getWeek() != null && ex.getWeek().getWeekNumber().equals(weekNumber))
                .collect(Collectors.toList());
    }

    public List<Exercise> getExercisesByCategory(String category) {
        return loadExercises().stream()
                .filter(ex -> ex.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }

    public Map<Integer, List<Exercise>> getExercisesGroupedByWeek() {
        List<Exercise> exercises = loadExercises();
        return exercises.stream()
                .filter(ex -> ex.getWeek() != null)
                .collect(Collectors.groupingBy(ex -> ex.getWeek().getWeekNumber()));
    }
}
