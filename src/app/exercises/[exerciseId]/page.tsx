'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { PencilIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { NewExercise, type Exercise } from '@/types/workout';
import { DEFAULT_IMAGE_URL } from '@/config/default.config';
import ExerciseEditForm from '@/components/exercise/ExerciseEditForm';

export default function ExercisePageDetail() {
    const { exerciseId } = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [exercise, setExercise] = useState<Exercise>();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        setIsEditing(searchParams.get('edit')===`true`)
    }, [searchParams])

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
    
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this exercise?')) {
      try {
        const response = await fetch(`/api/exercises/${exerciseId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          router.push('/exercises');
        }
      } catch (error) {
        console.error('Failed to delete exercise:', error);
      }
    }
    };
    
    const handleUpdate = async (updatedData: NewExercise) => {
        try {
          const response = await fetch(`/api/exercises/${exerciseId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
          });
    
          if (response.ok) {
            const data = await response.json();
            setExercise(data);
            setIsEditing(false);
          }
        } catch (error) {
          console.error('Failed to update exercise:', error);
        }
      };

    if (!exercise) return <div>Loading...</div>;
    
    const { id, ...newExercise } = exercise;
 
    return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.push('/exercises')}
        className="mb-6 flex items-center text-muted dark:text-muted-dark hover:text-text-primary dark:hover:text-text-primary-dark transition-colors"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Exercises
      </button>

      {!isEditing ? (
        <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-lg">
          <div className="aspect-video relative">
            <Image
              src={exercise.imageUrl || DEFAULT_IMAGE_URL}
              alt={exercise.name}
              fill
              className="rounded-t-2xl object-cover"
            />
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark">
                {exercise.name}
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 hover:bg-primary/10 rounded-full text-primary"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 hover:bg-red-500/10 rounded-full text-red-500"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-primary/10 p-4 rounded-lg text-center">
                <p className="text-sm text-muted dark:text-muted-dark">Sets</p>
                <p className="text-2xl font-bold text-primary">{exercise.sets}</p>
              </div>
              <div className="bg-secondary/10 p-4 rounded-lg text-center">
                <p className="text-sm text-muted dark:text-muted-dark">Reps</p>
                <p className="text-2xl font-bold text-secondary">{exercise.reps}</p>
              </div>
              <div className="bg-tertiary/10 p-4 rounded-lg text-center">
                <p className="text-sm text-muted dark:text-muted-dark">Weight</p>
                <p className="text-2xl font-bold text-tertiary">
                  {exercise.weight ? `${exercise.weight} kg` : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-lg p-6">
                          <ExerciseEditForm
                              initialData={newExercise}
                                onSubmit={handleUpdate}
                                onCancel={()=>setIsEditing(false)}
                                isEditMode
                          />
        </div>
      )}
    </div>
  </div>
  );
}
