package com.gymbot.controller;

import com.gymbot.model.Exercise;
import com.gymbot.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    @GetMapping
    public ResponseEntity<List<Exercise>> getAllExercises() {
        return ResponseEntity.ok(exerciseService.getAllExercises());
    }

    @GetMapping("/grouped")
    public ResponseEntity<Map<String, List<Exercise>>> getExercisesGroupedByCategory() {
        return ResponseEntity.ok(exerciseService.getExercisesGroupedByCategory());
    }

    @GetMapping("/grouped/week")
    public ResponseEntity<Map<Integer, List<Exercise>>> getExercisesGroupedByWeek() {
        return ResponseEntity.ok(exerciseService.getExercisesGroupedByWeek());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exercise> getExerciseById(@PathVariable String id) {
        Exercise exercise = exerciseService.getExerciseById(id);
        if (exercise != null) {
            return ResponseEntity.ok(exercise);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/week/{weekNumber}")
    public ResponseEntity<List<Exercise>> getExercisesByWeek(@PathVariable Integer weekNumber) {
        return ResponseEntity.ok(exerciseService.getExercisesByWeek(weekNumber));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Exercise>> getExercisesByCategory(@PathVariable String category) {
        return ResponseEntity.ok(exerciseService.getExercisesByCategory(category));
    }

    @PostMapping
    public ResponseEntity<Exercise> createExercise(@RequestBody Exercise exercise) {
        Exercise created = exerciseService.createExercise(exercise);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exercise> updateExercise(@PathVariable String id, @RequestBody Exercise exercise) {
        Exercise updated = exerciseService.updateExercise(id, exercise);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExercise(@PathVariable String id) {
        boolean deleted = exerciseService.deleteExercise(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
