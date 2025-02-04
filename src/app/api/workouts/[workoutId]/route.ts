import { NextResponse } from 'next/server';
import '@/lib/models/Exercise'
import '@/lib/models/Workout'
import { addExercisesToWorkout, getWorkoutById } from '@/lib/workoutOperationsDB';

export async function GET(
  request: Request,
  { params }: { params: { workoutId: string } }
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
    { params }: { params: { workoutId: string } }
) {
    const {workoutId} = await params;
    
    try {
        const { exercises } = await req.json();
        console.log('a cambiar: ', exercises);
        
        const updatedWorkout = await addExercisesToWorkout(workoutId, exercises);
        console.log('ejercicios añadido: ', updatedWorkout);
        

        return NextResponse.json(updatedWorkout);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to add exercises' },
            { status: 500 }
        );
    }
}
