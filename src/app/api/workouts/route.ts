import { NextResponse } from 'next/server';
import { getAllWorkouts } from '@/lib/workoutOperationsDB';

export async function GET() {

    try {
        const workouts = await getAllWorkouts();
        
        if (!workouts) {
            return NextResponse.json({ message: 'Workouts not found' }, { status: 404 });
        }
        return NextResponse.json(workouts, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
            console.error(error);
            
        return NextResponse.json({ message: 'Failed to fetch workouts' }, { status: 500 });
    }
}
