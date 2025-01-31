"use client"
import { useState } from 'react'
import WorkoutCard from './WorkoutCard'

export default function WorkoutList() {
    const [workouts, setWorkouts] = useState([
        { id: 1, name: 'Full Body Workout', duration: '45 minutes', difficulty: 'Intermediate' },
        { id: 2, name: 'Cardio Blast', duration: '30 minutes', difficulty: 'Beginner' },
        // Add more sample workouts as needed
    ]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
            ))}
        </div>
    );
};
