export type WorkoutId = string;
export type ExerciseId = string;
export type WorkoutName = string;
export type WorkoutDuration = string;
export type WorkoutDifficulty = string;
export type ExerciseName = string;
export type ExerciseSets = number;
export type ExerciseReps = number;
export type ExerciseWeight = number;
export enum WorkoutDay { 
    MONDAY = "Monday",
    TUESDAY = "Tuesday",
    WEDNESDAY = "Wednesday",
    THURSDAY = "Thursday",
    FRIDAY = "Friday",
    SATURDAY = "Saturday",
    SUNDAY = "Sunday",
};
export interface Exercise {
    id: ExerciseId;
    name: ExerciseName;
    sets: ExerciseSets;
    reps: ExerciseReps;
    weight?: ExerciseWeight;
    imageUrl?: string;
    days?: WorkoutDay[];
}
export interface NewExercise {
    name: ExerciseName;
    sets: ExerciseSets;
    reps: ExerciseReps;
    weight?: ExerciseWeight;
    imageUrl?: string;
    days?: WorkoutDay[];
}

export interface Workout {
    id: WorkoutId;
    name: WorkoutName;
    duration: WorkoutDuration;
    difficulty: WorkoutDifficulty;
    exercises: Exercise[];
}

export type ExerciseByDay = { [day in WorkoutDay]: Exercise[] };