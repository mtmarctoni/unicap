import { type Exercise } from "@/types/workout";
import Link from "next/link";
import ExerciseMenuButton from "./ExerciseMenuButton";

interface Props {
  exercise: Exercise;
  handleDelete: (id: string) => void;
}

export default function ExerciseCard({ exercise, handleDelete }: Props) {
  return (
    <div className="group relative bg-surface rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link
        href={`/exercises/${exercise.id}`}
        className="block p-6 pb-12"
      >
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
            {exercise.name}
          </h2>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <span className="font-medium">{exercise.sets}</span>
            </span>
            <span className="text-muted">Sets</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center">
              <span className="font-medium">{exercise.reps}</span>
            </span>
            <span className="text-muted">Reps</span>
          </div>
        </div>
      </Link>
      <ExerciseMenuButton exercise={exercise} handleDelete={handleDelete} />
    </div>
  );
}
