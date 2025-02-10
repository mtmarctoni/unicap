// components/ExerciseForm.tsx
'use client';
import { useState, useEffect } from 'react';
import { type NewExercise, WorkoutDay } from '@/types/workout';
import Image from 'next/image';
import { BoltIcon, CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { DEFAULT_IMAGE_URL } from '@/config/default.config';

interface Props {
  initialData: NewExercise;
  onSubmit: (data: NewExercise) => void;
  onCancel: () => void;
  isEditMode?: boolean;
}

export default function ExerciseEditForm({ 
  initialData, 
  onSubmit, 
  onCancel,
  isEditMode = false 
}: Props) {
  const [formData, setFormData] = useState<NewExercise>(initialData);
  const [isDaysOpen, setIsDaysOpen] = useState<boolean>(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const { imageUrl } = await response.json();
      setFormData(prev => ({ ...prev, imageUrl }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (imageFile) {
      await handleImageUpload(imageFile);
    }

    const submissionData = {
      ...formData,
      sets: Number(formData.sets),
      reps: Number(formData.reps),
      weight: formData.weight ? Number(formData.weight) : undefined,
      days: formData.days ? formData.days : [],
    };

    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Preview and Upload */}
      <div className="group relative aspect-video rounded-2xl overflow-hidden border border-muted/20">
        <Image
          src={formData.imageUrl || DEFAULT_IMAGE_URL}
          alt={formData.name || 'Exercise preview'}
          fill
          className="object-cover"
        />
        <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          <span className="text-white bg-black/50 px-4 py-2 rounded-lg">
            {isUploading ? 'Uploading...' : 'Change Image'}
          </span>
        </label>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted dark:text-muted-dark mb-1">
            Exercise Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 rounded-lg border border-muted/20 bg-surface dark:bg-surface-dark focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted dark:text-muted-dark mb-1">
              Sets
            </label>
            <input
              type="number"
              min="1"
              value={formData.sets}
              onChange={(e) => setFormData({ ...formData, sets: Number(e.target.value) })}
              className="w-full p-3 rounded-lg border border-muted/20 bg-surface dark:bg-surface-dark focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted dark:text-muted-dark mb-1">
              Reps
            </label>
            <input
              type="number"
              min="1"
              value={formData.reps}
              onChange={(e) => setFormData({ ...formData, reps: Number(e.target.value) })}
              className="w-full p-3 rounded-lg border border-muted/20 bg-surface dark:bg-surface-dark focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted dark:text-muted-dark mb-1 flex items-center">
              <BoltIcon className="w-4 h-4 mr-1" />
              Weight (kg)
            </label>
            <input
              type="number"
              min="0"
              value={formData.weight || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                weight: e.target.value ? Number(e.target.value) : undefined 
              })}
              className="w-full p-3 rounded-lg border border-muted/20 bg-surface dark:bg-surface-dark focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              placeholder="Optional"
            />
          </div>
        </div>
      </div>

      {/* Days of the Week Field */}
      <div className="space-y-2 relative">
          <label htmlFor="days" className="block text-sm font-medium text-text">
            Days of the Week
          </label>
          <div className="relative mt-1">
            <div
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
            </div>

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
      <div className="flex justify-end gap-4 pt-6 border-t border-muted/20">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-lg text-muted dark:text-muted-dark hover:bg-muted/10 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark disabled:opacity-50 transition-colors"
          disabled={isUploading}
        >
          {isEditMode ? 'Update Exercise' : 'Create Exercise'}
        </button>
      </div>
    </form>
  );
}
