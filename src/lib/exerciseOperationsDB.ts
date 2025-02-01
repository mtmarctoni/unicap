import dbConnect from '@/lib/mongodb';
import ExerciseModel from '@/lib/models/Exercise';
import { type Exercise } from '@/types/workout';

// Database Operations
export async function getAllExercises() {
  await dbConnect();
  return ExerciseModel.find({});
}

export async function getExerciseById(id: string) {
  await dbConnect();
  return ExerciseModel.findById(id);
}

export async function createExercise(exerciseData: Exercise) {
  await dbConnect();
  const exercise = new ExerciseModel(exerciseData);
  return exercise.save();
}

export async function updateExercise(id: string, updateData: Exercise) {
  await dbConnect();
  return ExerciseModel.findByIdAndUpdate(id, updateData, { new: true });
}

export async function deleteExercise(id: string) {
  await dbConnect();
  return ExerciseModel.findByIdAndDelete(id);
}