"use client";
import { Button } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/20/solid";

import { WorkoutDay, type NewExercise } from "@/types/workout";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

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
  setFormData,
}: Props) {
  const [isDaysOpen, setIsDaysOpen] = useState<boolean>(false);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-8">
        {/* Exercise Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-text">
            Exercise Name
            <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="block w-full rounded-lg border border-muted/30 bg-surface py-2 px-4 text-text placeholder:text-muted/50 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none transition-all"
              placeholder="e.g., Bench Press"
              required
            />
          </div>
        </div>

        {/* Sets & Reps Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Sets Field */}
          <div className="space-y-2">
            <label
              htmlFor="sets"
              className="block text-sm font-medium text-text"
            >
              Sets
              <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="number"
                id="sets"
                min="1"
                value={formData.sets}
                onChange={(e) =>
                  setFormData({ ...formData, sets: Number(e.target.value) })
                }
                className="block w-full rounded-lg border border-muted/30 bg-surface py-2 px-4 text-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none transition-all"
                required
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-muted text-sm">sets</span>
              </div>
            </div>
          </div>

          {/* Reps Field */}
          <div className="space-y-2">
            <label
              htmlFor="reps"
              className="block text-sm font-medium text-text"
            >
              Reps
              <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="number"
                id="reps"
                min="1"
                value={formData.reps}
                onChange={(e) =>
                  setFormData({ ...formData, reps: Number(e.target.value) })
                }
                className="block w-full rounded-lg border border-muted/30 bg-surface py-2 px-4 text-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none transition-all"
                required
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-muted text-sm">reps</span>
              </div>
            </div>
          </div>
        </div>

        {/* Days of the Week Field */}
        <div className="space-y-2 relative">
          <label htmlFor="days" className="block text-sm font-medium text-text">
            Days of the Week
          </label>
          <div className="relative mt-1">
            <button
              type="button"
              onClick={() => setIsDaysOpen(!isDaysOpen)}
              className="relative w-full cursor-default rounded-lg border border-muted/30 bg-surface py-2 pl-3 pr-10 text-left text-text focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none transition-all"
            >
              <span className="flex items-center flex-wrap gap-2">
                {formData?.days && formData?.days?.length > 0 ? (
                  formData.days.map((day) => (
                    <span
                      key={day}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      {day}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const newDays = formData.days?.filter(
                            (d) => d !== day
                          );
                          setFormData({ ...formData, days: newDays });
                        }}
                        className="ml-1.5 text-primary/50 hover:text-primary"
                      >
                        ×
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-muted/50">Select days...</span>
                )}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-muted"
                  aria-hidden="true"
                />
              </span>
            </button>

            {isDaysOpen && (
              <div className="absolute z-10 mt-1 w-full rounded-lg bg-surface shadow-lg border border-muted/30 focus:outline-none">
                <ul className="max-h-60 overflow-auto py-1 text-base">
                  {Object.values(WorkoutDay).map((day) => (
                    <li
                      key={day}
                      onClick={() => {
                        const newDays = formData.days?.includes(day)
                          ? formData.days?.filter((d) => d !== day)
                          : [...formData.days || [], day];
                        setFormData({ ...formData, days: newDays });
                      }}
                      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-text hover:bg-muted/10 transition-colors"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.days?.includes(day)}
                          readOnly
                          className="h-4 w-4 rounded border-muted/30 text-primary focus:ring-primary/30"
                        />
                        <span className="ml-3 block font-medium truncate">
                          {day}
                        </span>
                      </div>

                      {formData.days?.includes(day) && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 mt-8 border-t border-muted/20 pt-6">
          <Button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-text hover:bg-muted/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors"
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
}
