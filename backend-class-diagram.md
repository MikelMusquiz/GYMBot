# GYMBot Backend Class Diagram

```mermaid
classDiagram
    %% Model Classes
    class Exercise {
        -String id
        -String name
        -Integer maxReps
        -String category
        -Week week
        +Exercise()
        +Exercise(name, maxReps, week, category)
        +Exercise(id, name, maxReps, week, category)
        +getId() String
        +setId(String) void
        +getName() String
        +setName(String) void
        +getMaxReps() Integer
        +setMaxReps(Integer) void
        +getCategory() String
        +setCategory(String) void
        +getWeek() Week
        +setWeek(Week) void
    }

    class Week {
        -Integer weekNumber
        -String startDate
        -String endDate
        -String goal
        +Week()
        +Week(weekNumber, startDate, endDate)
        +getWeekNumber() Integer
        +setWeekNumber(Integer) void
        +getStartDate() String
        +setStartDate(String) void
        +getEndDate() String
        +setEndDate(String) void
        +getGoal() String
        +setGoal(String) void
    }

    %% Service Classes
    class ExerciseService {
        -String storagePath
        -ObjectMapper objectMapper
        -getStorageFile() File
        -loadExercises() List~Exercise~
        -saveExercises(List~Exercise~) void
        +getAllExercises() List~Exercise~
        +getExercisesGroupedByCategory() Map~String, List~Exercise~~
        +getExerciseById(String) Exercise
        +createExercise(Exercise) Exercise
        +updateExercise(String, Exercise) Exercise
        +deleteExercise(String) boolean
        +getExercisesByWeek(Integer) List~Exercise~
        +getExercisesByCategory(String) List~Exercise~
    }

    class WeekService {
        -String storagePath
        -ObjectMapper objectMapper
        -getStorageFile() File
        -loadWeeks() List~Week~
        -saveWeeks(List~Week~) void
        +getAllWeeks() List~Week~
        +getWeekByNumber(Integer) Week
        +createWeek(Week) Week
        +updateWeek(Integer, Week) Week
        +deleteWeek(Integer) boolean
        +getCurrentWeek() Week
    }

    %% Controller Classes
    class ExerciseController {
        -ExerciseService exerciseService
        +getAllExercises() ResponseEntity~List~Exercise~~
        +getExercisesGroupedByCategory() ResponseEntity~Map~String, List~Exercise~~~
        +getExerciseById(String) ResponseEntity~Exercise~
        +getExercisesByWeek(Integer) ResponseEntity~List~Exercise~~
        +getExercisesByCategory(String) ResponseEntity~List~Exercise~~
        +createExercise(Exercise) ResponseEntity~Exercise~
        +updateExercise(String, Exercise) ResponseEntity~Exercise~
        +deleteExercise(String) ResponseEntity~Void~
    }

    class WeekController {
        -WeekService weekService
        +getAllWeeks() ResponseEntity~List~Week~~
        +getWeekByNumber(Integer) ResponseEntity~Week~
        +getCurrentWeek() ResponseEntity~Week~
        +createWeek(Week) ResponseEntity~Week~
        +updateWeek(Integer, Week) ResponseEntity~Week~
        +deleteWeek(Integer) ResponseEntity~Void~
    }

    class HealthController {
        +checkHealth() ResponseEntity~Map~String, Object~~
        +getInfo() ResponseEntity~Map~String, Object~~
    }

    %% Relationships
    Exercise "1" --> "1" Week : has
    ExerciseController --> ExerciseService : uses
    WeekController --> WeekService : uses
    ExerciseService ..> Exercise : manages
    WeekService ..> Week : manages

    %% Annotations
    note for Exercise "Each exercise belongs to exactly one week"
    note for Week "Represents a training week with start/end dates and goals"
    note for ExerciseService "Handles business logic and JSON persistence for exercises"
    note for WeekService "Handles business logic and JSON persistence for weeks"
```

## Class Relationships

### Associations
- **Exercise → Week**: Each Exercise has exactly one Week (composition relationship)
  - Currently implemented as `weekNumber` (Integer)
  - Will be refactored to a Week object reference

### Dependencies
- **ExerciseController → ExerciseService**: Controller depends on service for business logic
- **WeekController → WeekService**: Controller depends on service for business logic
- **ExerciseService → Exercise**: Service manages Exercise entities
- **WeekService → Week**: Service manages Week entities

## Key Design Patterns

### MVC Pattern
- **Model**: Exercise, Week
- **Service**: ExerciseService, WeekService (Business Logic Layer)
- **Controller**: ExerciseController, WeekController, HealthController (Presentation Layer)

### Repository Pattern (JSON-based)
- Both services implement file-based storage using Jackson ObjectMapper
- Storage location configured via `data.storage.path` property

### RESTful API Design
- Controllers expose REST endpoints using Spring annotations
- Standard HTTP methods: GET, POST, PUT, DELETE
- ResponseEntity for flexible HTTP responses

## Future Enhancements

### Planned Classes
- **User**: User authentication and profile management
- **Workout**: Collection of exercises for a specific day
- **ChatbotService**: AI-powered workout suggestions
- **StatisticsService**: Analytics and progress tracking

### Database Migration
- Current: JSON file-based storage
- Future: Consider JPA/Hibernate with relational database (PostgreSQL/MySQL)
- Will require Repository interfaces and Entity annotations
