export type WorkoutId = number;
export type WorkoutName = string;
export type WorkoutDuration = string;
export type WorkoutDifficulty = string;


export interface Workout {
    id: WorkoutId;
    name: WorkoutName;
    duration: WorkoutDuration;
    difficulty: WorkoutDifficulty;
}