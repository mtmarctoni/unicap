import { type NewExercise, type Exercise } from "@/types/workout";
import ExerciseCard from "./ExerciseCard";

interface Props {
    exercises: Exercise[] | null;
    handleDelete?: (id: string) => void;
    handleEdit?: (id: string) => void;
    handleDuplicate?: (newExercise: NewExercise) => void;
}

const ExerciseList = ({exercises, handleDelete, handleEdit, handleDuplicate}: Props) => {
    if (!exercises) return <div>Loading...</div>;
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {exercises.map(exercise => (
                <ExerciseCard key={exercise.id}
                    exercise={exercise}
                    handleEdit={handleEdit}
                    handleDuplicate={handleDuplicate}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default ExerciseList;