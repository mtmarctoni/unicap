"use client"
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ExerciseByDay, ExerciseId, WorkoutDay, type Exercise, type Workout } from '@/types/workout';
import { SkeletonWorkoutDetail } from '@/components/workout/SkeletonWorkoutDetail';
import ExerciseList from '@/components/exercise/ExerciseList';
import { PlusIcon, ClockIcon, ChartBarIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import Calendar from '@/components/workout/ExerciseCalendar';
import ExerciseListItem from '@/components/exercise/ExerciseListItem';

export default function WorkoutDetailPage() {
    const { workoutId } = useParams();
    const [workout, setWorkout] = useState<Workout | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allExercises, setAllExercises] = useState<Exercise[]>([]);
    const [selectedExercises, setSelectedExercises] = useState<ExerciseId[]>([]);
    const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);


    useEffect(() => {
        if (workoutId) {
            fetch(`/api/workouts/${workoutId}`)
                .then(response => response.json())
                .then(data => setWorkout(data));
        }
    }, [workoutId, setWorkout]);

    const fetchExercises = () => {
        fetch('/api/exercises')
            .then(res => res.json())
            .then(data => setAllExercises(data));
    };

    const handleAddExercises = async () => {
        try {
            const response = await fetch(`/api/workouts/${workoutId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ exerciseIds: selectedExercises })
            });

            if (response.ok) {
                const updatedWorkout = await response.json();
                setWorkout(updatedWorkout);
                setIsModalOpen(false);
                setSelectedExercises([]);
            }
        } catch (error) {
            console.error('Error adding exercises:', error);
        }
    };

    const handleRemoveExercise = async (exerciseId: ExerciseId) => {
        console.log('remove exercise');
        try {
            const response = await fetch(`/api/workouts/${workoutId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ exerciseId })
            });
        
            if (response.ok) {
                const updatedWorkout = await response.json();
                setWorkout(updatedWorkout);
            }
          } catch (error) {
            console.error('Error removing exercise from workout:', error);
          }
        
    }

// Prepare exercise data for the calendar.  Use a type-safe approach.
        const exercisesByDay: ExerciseByDay = {
            [WorkoutDay.MONDAY]: [],
            [WorkoutDay.TUESDAY]: [],
            [WorkoutDay.WEDNESDAY]: [],
            [WorkoutDay.THURSDAY]: [],
            [WorkoutDay.FRIDAY]: [],
            [WorkoutDay.SATURDAY]: [],
            [WorkoutDay.SUNDAY]: [],
        };
        
            workout?.exercises.forEach(exercise => {
                exercise.days?.forEach(day => {
                        exercisesByDay[day].push(exercise);
                });
            });
    

    const filteredExercises: Exercise[] = (
        selectedDay
            ? workout?.exercises.filter((ex: Exercise) => {
                const days = ex.days || [];
                return selectedDay && days.includes(selectedDay)
            })
            : workout?.exercises
        ) || [];
        
        if (!workout) {
            return <SkeletonWorkoutDetail />;
        }

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Workout Header */}
                <div className="flex items-start justify-between mb-6">
                    <h1 className="text-3xl font-bold text-primary">
                        {workout.name}
                    </h1>
                    <Button
                    onClick={() => {
                        setIsModalOpen(true);
                        fetchExercises();
                        }}
                        className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Add Exercises
                    </Button>
                </div>

                {/* Workout Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 p-4 bg-background-alt rounded-lg">
                        <ClockIcon className="w-6 h-6 text-secondary" />
                        <div>
                            <p className="text-sm text-muted">Duration</p>
                            <p className="text-lg font-medium text-text-primary">
                                {workout.duration}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-background-alt rounded-lg">
                        <ChartBarIcon className="w-6 h-6 text-secondary" />
                        <div>
                            <p className="text-sm text-muted">Difficulty</p>
                            <p className="text-lg font-medium text-text-primary">
                                {workout.difficulty}
                            </p>
                        </div>
                    </div>
            </div>
            
            
        {/* Calendar Section */}
            <Calendar
                exercises={exercisesByDay}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
            />

            {/* Exercises Section */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-secondary">
                        Exercises
                    </h2>
                    <span className="text-muted">
                        {workout.exercises.length} exercises
                    </span>
                </div>

                {/* {workout.exercises.length > 0 ? ( */}
                {filteredExercises.length > 0 ? (
                    // <ExerciseList exercises={workout.exercises} />
                <ExerciseList exercises={filteredExercises}
                    handleRemove={handleRemoveExercise}
                />
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted mb-4">
                            No exercises added {selectedDay ? `for ${selectedDay}` : ''} yet
                        </p>
                        <Button
                            onClick={() => {
                                setIsModalOpen(true);
                                fetchExercises();
                                }}
                            className="text-primary hover:text-primary-dark flex items-center gap-2 mx-auto"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Add your first exercise
                        </Button>
                    </div>
            )}
                        {/* Exercise Selection Modal */}
                        <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel className="w-full max-w-3xl rounded-2xl bg-surface p-6">
                            <DialogTitle className="text-2xl font-bold mb-6">
                                Select Exercises
                            </DialogTitle>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
                                {allExercises.map(exercise => (
                                    <label
                                        key={exercise.id}
                                        className={`flex items-center w-full gap-4 px-4 py-2 rounded-lg cursor-pointer ${
                                            selectedExercises.includes(exercise.id)
                                                ? 'bg-primary/10 border-2 border-primary'
                                                : 'bg-background hover:bg-background-alt'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedExercises.includes(exercise.id)}
                                            onChange={(e) => {
                                                const newSelection = e.target.checked
                                                    ? [...selectedExercises, exercise.id]
                                                    : selectedExercises.filter(id => id !== exercise.id);
                                                setSelectedExercises(newSelection);
                                            }}
                                            className="w-5 h-5 text-primary focus:ring-primary"
                                        />
                                        {/* <ExerciseCard exercise={exercise} /> */}
                                        <ExerciseListItem exercise={exercise} />
                                    </label>
                                ))}
                            </div>

                            <div className="mt-6 flex justify-end gap-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2 text-muted hover:text-text"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddExercises}
                                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center gap-2"
                                >
                                    <CheckIcon className="w-5 h-5" />
                                    Add Selected ({selectedExercises.length})
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

