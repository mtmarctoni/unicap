import dbConnect from '@/lib/mongodb';
import WorkoutModel from '@/lib/models/Workout';
import { type Exercise, type Workout } from '@/types/workout';

// Database Operations
export async function getAllWorkouts() {
  await dbConnect();
  return WorkoutModel.find({});
}

export async function getWorkoutById(id: string) {
  await dbConnect();
  return WorkoutModel.findById(id);
}

export async function createWorkout(workoutData: Workout) {
  await dbConnect();
  const workout = new WorkoutModel(workoutData);
  return workout.save();
}

export async function updateWorkout(id: string, updateData: Workout) {
  await dbConnect();
  return WorkoutModel.findByIdAndUpdate(id, updateData, { new: true });
}

export async function deleteWorkout(id: string) {
  await dbConnect();
  return WorkoutModel.findByIdAndDelete(id);
}

export async function addExerciseToWorkout(workoutId: string, exerciseData: Exercise) {
  await dbConnect();
  return WorkoutModel.findByIdAndUpdate(
    workoutId,
    { $push: { exercises: exerciseData } },
    { new: true }
  );
};

export async function removeExerciseFromWorkout(workoutId: string, exerciseId: string) {
  await dbConnect();
  return WorkoutModel.findByIdAndUpdate(
    workoutId,
    { $pull: { exercises: { _id: exerciseId } } },
    { new: true }
  );
};

