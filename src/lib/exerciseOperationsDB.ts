import dbConnect from '@/lib/mongodb';
import ExerciseModel from '@/lib/models/Exercise';
import { type NewExercise } from '@/types/workout';

// Database Operations
export async function getAllExercises() {
  await dbConnect();
  return ExerciseModel.find({});
}

export async function getExerciseById(id: string) {
  await dbConnect();
  return ExerciseModel.findById(id);
}

export async function createExercise(exerciseData: NewExercise) {
  await dbConnect();
  const exercise = new ExerciseModel(exerciseData);
  return exercise.save({new: true});
}

export async function updateExercise(id: string, updateData: NewExercise) {
  await dbConnect();
  return ExerciseModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
}

export async function deleteExercise(id: string) {
  await dbConnect();
  return ExerciseModel.findByIdAndDelete(id);
}