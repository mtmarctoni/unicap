'use client';
import { Button } from '@headlessui/react';
import {  PlusIcon } from '@heroicons/react/20/solid';

import { type NewExercise } from '@/types/workout';

interface Props {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    formData: NewExercise;
    setFormData: (data: NewExercise) => void;
}

export default function ExerciseForm({
    handleSubmit,
    onCancel,
    formData,
    setFormData
}: Props) {
   

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-8">
                {/* Exercise Name Field */}
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-text dark:text-text-dark">
                        Exercise Name
                        <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="block w-full rounded-lg border border-muted/30 bg-surface dark:bg-surface-dark py-2 px-4 text-text dark:text-text-dark placeholder:text-muted/50 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none transition-all"
                            placeholder="e.g., Bench Press"
                            required
                        />
                    </div>
                </div>

                {/* Sets & Reps Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Sets Field */}
                    <div className="space-y-2">
                        <label htmlFor="sets" className="block text-sm font-medium text-text dark:text-text-dark">
                            Sets
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                type="number"
                                id="sets"
                                min="1"
                                value={formData.sets}
                                onChange={(e) => setFormData({ ...formData, sets: Number(e.target.value) })}
                                className="block w-full rounded-lg border border-muted/30 bg-surface dark:bg-surface-dark py-2 px-4 text-text dark:text-text-dark [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none transition-all"
                                required
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <span className="text-muted dark:text-muted-dark text-sm">sets</span>
                            </div>
                        </div>
                    </div>

                    {/* Reps Field */}
                    <div className="space-y-2">
                        <label htmlFor="reps" className="block text-sm font-medium text-text dark:text-text-dark">
                            Reps
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                type="number"
                                id="reps"
                                min="1"
                                value={formData.reps}
                                onChange={(e) => setFormData({ ...formData, reps: Number(e.target.value) })}
                                className="block w-full rounded-lg border border-muted/30 bg-surface dark:bg-surface-dark py-2 px-4 text-text dark:text-text-dark [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none transition-all"
                                required
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <span className="text-muted dark:text-muted-dark text-sm">reps</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4 mt-8 border-t border-muted/20 pt-6">
                    <Button
                        type="button"
                        onClick={onCancel}
                        className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-text dark:text-text-dark hover:bg-muted/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Create Exercise
                    </Button>
                </div>
            </div>
        </form>
    );
};
