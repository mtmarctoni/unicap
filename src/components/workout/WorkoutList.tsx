"use client"
import { useEffect, useState } from 'react'
import WorkoutCard from './WorkoutCard'
import { type Workout } from '@/types/workout';

export default function WorkoutList() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
                // Fetch workout data based on id
                // This is a placeholder. Replace with your actual data fetching logic
                fetch(`/api/workouts/`)
                    .then(response => response.json())
                    .then(data => setWorkouts(data));
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
            ))}
        </div>
    );
};
