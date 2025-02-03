'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
// import ExerciseForm from '@/components/ExerciseForm';
import { Exercise } from '@/types/workout';

export default function ExercisePageDetail() {
  const {exerciseId} = useParams();
  const [exercise, setExercise] = useState<Exercise>();

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await fetch(`/api/exercises/${exerciseId}`);
        const data = await response.json();
        setExercise(data);
      } catch (error) {
        console.error('Failed to fetch exercise:', error);
      }
    };
    
    if (exerciseId) fetchExercise();
  }, [exerciseId]);

  if (!exercise) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Exercise</h1>
          {JSON.stringify(exercise)}
      {/* <ExerciseForm exercise={exercise} /> */}
    </div>
  );
}
