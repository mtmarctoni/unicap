import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Workout } from '@/types/workout';

export default function WorkoutDetailPage() {
    const router = useRouter();
    const { wrokoutId } = router.query;
    const [workout, setWorkout] = useState<Workout | null>(null);

    useEffect(() => {
        if (wrokoutId) {
            // Fetch workout data based on id
            // This is a placeholder. Replace with your actual data fetching logic
            fetch(`/api/workouts/${wrokoutId}`)
                .then(response => response.json())
                .then(data => setWorkout(data));
        }
    }, [wrokoutId]);

    if (!workout) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-primary">{workout.name}</h1>
            <p className="text-muted mb-2">Duration: {workout.duration}</p>
            <p className="text-muted mb-4">Difficulty: {workout.difficulty}</p>
            
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Exercises</h2>
            <ul className="space-y-4">
                {workout.exercises.map((exercise, index) => (
                    <li key={index} className="bg-surface p-4 rounded-lg shadow">
                        <h3 className="text-lg font-medium mb-2">{exercise.name}</h3>
                        <p className="text-muted">Sets: {exercise.sets}, Reps: {exercise.reps}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
