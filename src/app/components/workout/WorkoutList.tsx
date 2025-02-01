"use client"
import { useState } from 'react'
import WorkoutCard from './WorkoutCard'

export default function WorkoutList() {
    const [workouts, setWorkouts] = useState([
        {
            id: 1, name: 'Full Body Workout', duration: '45 minutes', difficulty: 'Intermediate',
            exercises: [
                { name: 'Push-ups', sets: 3, reps: 10 },
                { name: 'Squats', sets: 3, reps: 15 },
                { name: 'Plank', sets: 3, reps: 30 },]
        },
        { id: 2, name: 'Cardio Blast', duration: '30 minutes', difficulty: 'Beginner', exercises: [] },
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
