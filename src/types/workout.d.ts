export type WorkoutId = number;
export type WorkoutName = string;
export type WorkoutDuration = string;
export type WorkoutDifficulty = string;
export type ExerciseName = string;
export type ExerciseSets = number;
export type ExerciseReps = number;
export interface Exercise {
    name: ExerciseName;
    sets: ExerciseSets;
    reps: ExerciseReps;
}

export interface Workout {
    id: WorkoutId;
    name: WorkoutName;
    duration: WorkoutDuration;
    difficulty: WorkoutDifficulty;
    exercises: Exercise[];
}