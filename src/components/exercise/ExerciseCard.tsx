import Link from "next/link";
import Image from "next/image";

import ExerciseMenuButton from "./ExerciseMenuButton";
import { type Exercise } from "@/types/workout";
import { DEFAULT_IMAGE_URL } from "@/config/default.config";
import { BoltIcon } from "@heroicons/react/20/solid";

interface Props {
  exercise: Exercise;
  handleDelete: (id: string) => void;
}

export default function ExerciseCard({ exercise, handleDelete }: Props) {
  return (
    <div className="group relative bg-surface rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link
        href={`/exercises/${exercise.id}`}
        className="block"
      >
      <div className="aspect-w-16 aspect-h-9 w-full">
      <Image
        src={exercise.imageUrl || DEFAULT_IMAGE_URL}
        alt={exercise.name}
        width={300}
        height={200}
        className="w-full h-auto object-cover rounded-t-2xl"
      />
        </div>
        <div className="p-6">

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
            {exercise.name}
          </h2>
        </div>

        <div className="my-4 flex justify-center">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <span className="font-medium">{exercise.sets}</span>
            </span>
            <span className="text-muted">Sets</span>

          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center">
              <span className="font-medium">{exercise.reps}</span>
            </span>
            <span className="text-muted">Reps</span>
            </div>
          </div>
            
          </div>
          
            <div className="flex flex-col items-center justify-center bg-accent-indigo/10 rounded-lg p-2">
            <span className="text-sm text-muted flex items-center">
              <BoltIcon className="w-4 h-4 mr-1" />
              Weight
            </span>
            <span className="text-lg font-semibold text-accent-indigo">
              {exercise.weight ? `${exercise.weight} kg` : 'N/A'}
            </span>
          </div>
        </div>
      </Link>
      <ExerciseMenuButton exercise={exercise} handleDelete={handleDelete} />
    </div>
  );
}
