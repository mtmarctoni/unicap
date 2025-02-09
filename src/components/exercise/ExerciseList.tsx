import { type NewExercise, type Exercise } from "@/types/workout";
import ExerciseCard from "./ExerciseCard";

interface Props {
    exercises: Exercise[] | null;
    handleDelete?: (id: string) => void;
    handleEdit?: (id: string) => void;
    handleDuplicate?: (newExercise: NewExercise) => void;
    handleRemove?: (id: string) => void;
}

const ExerciseList = ({exercises, handleDelete, handleEdit, handleDuplicate, handleRemove}: Props) => {
    if (!exercises) return <div>Loading...</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {exercises.map(exercise => (
                <ExerciseCard key={exercise.id}
                    exercise={exercise}
                    handleEdit={handleEdit}
                    handleDuplicate={handleDuplicate}
                    handleDelete={handleDelete}
                    handleRemove={handleRemove}
                />
            ))}
        </div>
    );
};

export default ExerciseList;