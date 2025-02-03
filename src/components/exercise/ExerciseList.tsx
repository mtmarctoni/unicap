import { type Exercise } from "@/types/workout";
import ExerciseCard from "./ExerciseCard";

interface Props {
    exercises: Exercise[] | null;
    handleDelete: (id: string) => void;

}

const ExerciseList = ({exercises, handleDelete}: Props) => {
    if (!exercises) return <div>Loading...</div>;
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* {JSON.stringify(exercises)} */}
            {exercises.map(exercise => (
                <ExerciseCard key={exercise.id}
                    exercise={exercise}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default ExerciseList;