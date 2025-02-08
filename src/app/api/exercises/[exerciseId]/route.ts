import { NextResponse } from 'next/server';
import '@/lib/models/Exercise';
import '@/lib/models/Workout';
import dbConnect from '@/lib/mongodb';
import { deleteExercise, getExerciseById, updateExercise } from '@/lib/exerciseOperationsDB';

export async function GET(request: Request, { params }: { params: { exerciseId: string } }) {
    await dbConnect();
    const { exerciseId } = await params;
  const exercise = await getExerciseById(exerciseId);
  return NextResponse.json(exercise);
};

export async function DELETE(request: Request, { params }: { params: { exerciseId: string } }) {
    await dbConnect();
    const { exerciseId } = await params;
    const exercise = await deleteExercise(exerciseId);
    return NextResponse.json(exercise);
};

export async function PUT(request: Request, { params }: { params: { exerciseId: string } }) {
    await dbConnect();
    
    const { exerciseId } = await params;
    const exerciseToUpdate = await request.json();
    const updatedExercise = await updateExercise(exerciseId, exerciseToUpdate);
    return NextResponse.json(updatedExercise);
};