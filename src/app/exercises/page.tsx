'use client';
import { useEffect, useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid';

import ExerciseList from '@/components/exercise/ExerciseList';
import ExerciseForm from '@/components/exercise/ExerciseForm';
import { type Exercise, type NewExercise } from '@/types/workout';

export default function ExercisesPage() {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [exercises, setExercises] = useState<Exercise[] | null>(null);
    const [formData, setFormData] = useState<NewExercise>({
        name: '',
        sets: 4,
        reps: 10
    });
      
        useEffect(() => {
            fetch(`/api/exercises/`)
                .then(response => response.json())
                .then(data => setExercises(data));
    }, [])
      
        const handleDelete = async (id: string) => {
            if (!exercises) return;
            fetch('/api/exercises/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            })
            setExercises(exercises.filter(exercise => exercise.id !== id));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/exercises', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const exercise = await response.json();
                if (exercises !== null) {
                    setExercises([...exercises, exercise])
                } else {
                    setExercises([exercise])
                }

            }
        } catch (error) {
            console.error('Failed to save exercise:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background/50 to-background/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Exercise Library
            </h1>
            <button
                      onClick={()=>setIsFormOpen(!isFormOpen)}
                    className={`${isFormOpen ? 'bg-red-500 hover:bg-red-200' : 'bg-primary hover:bg-primary-dark'} inline-flex items-center px-6 py-3 text-white font-medium rounded-lg transition-colors duration-200 ease-in-out cursor-pointer`}
                  >
                      {isFormOpen
                          ? <div>
                              <XMarkIcon className="w-6 h-6 mr-2" stroke="currentColor" />
                              Close Form                              
                            </div>
                          : <>
                              <PlusIcon className="w-6 h-6 mr-2" stroke="currentColor" />
                              Add Exercise                              
                          </>
                      }
          </button>
          </div>
      
          {/* Exercise Form */}
          <div className={`m-8 overflow-hidden transition-all duration-500 ease-in-out ${isFormOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <ExerciseForm
              handleSubmit={handleSubmit}
              onCancel={() => setIsFormOpen(false)}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
      
          {/* Exercise Grid */}
          <div className="my-8 mx-4">
            <ExerciseList
              handleDelete={handleDelete}
              exercises={exercises}
            />
          </div>
        </div>
      </div>
  );
}
