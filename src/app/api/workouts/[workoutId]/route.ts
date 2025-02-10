import { NextResponse } from 'next/server';
import '@/lib/models/Exercise'
import '@/lib/models/Workout'
import { addExercisesToWorkout, getWorkoutById, removeExerciseFromWorkout } from '@/lib/workoutOperationsDB';
import { ExerciseId } from '@/types/workout';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ workoutId: string }> }
) {
  const {workoutId} = await params;

    try {
        const workout = await getWorkoutById(workoutId);
        
        if (!workout) {
            return NextResponse.json({ message: 'Workout not found' }, { status: 404 });
        }
        return NextResponse.json(workout, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
            console.error(error);
            
        return NextResponse.json({ message: 'Failed to fetch workout' }, { status: 500 });
    }
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ workoutId: string }> }
) {
    const {workoutId} = await params;
    
    try {
        const data = await req.json();
        const exerciseIds: ExerciseId[] = data.exerciseIds as ExerciseId[];
        
        const updatedWorkout = await addExercisesToWorkout(workoutId, exerciseIds);
        console.log('ejercicios añadido: ', updatedWorkout);
        

        return NextResponse.json(updatedWorkout);
    } catch (error) {
        return NextResponse.json(
            { error: `Failed to add exercises: ${error}` },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ workoutId: string }> }
) {
    const {workoutId} = await params;
    
    try {
        const data = await req.json();
        const exerciseId: ExerciseId = data.exerciseId as ExerciseId;
        
        const updatedWorkout = await removeExerciseFromWorkout(workoutId, exerciseId);

        return NextResponse.json(updatedWorkout);
    } catch (error) {
        return NextResponse.json(
            { error: `Failed to add exercises: ${error}` },
            { status: 500 }
        );
    }
    
  }
