import { NextResponse } from 'next/server';
import '@/lib/models/Exercise'
import '@/lib/models/Workout'
import { getWorkoutById } from '@/lib/workoutOperationsDB';

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
