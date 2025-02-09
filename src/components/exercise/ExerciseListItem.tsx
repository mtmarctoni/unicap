import Image from "next/image";
import { DEFAULT_IMAGE_URL } from "@/config/default.config";
import { Exercise } from "@/types/workout";
import Link from "next/link";

interface Props {
    exercise: Exercise;
}

const ExerciseListItem = ({ exercise }: Props) => (
      <div className="flex items-center gap-4 w-full"> {/* Horizontal layout */}
    <div className=" w-16 h-12 relative rounded-lg overflow-hidden"> {/* Fixed size image container */}
          <Image
            src={exercise.imageUrl || DEFAULT_IMAGE_URL}
            alt={exercise.name || 'Default exercise image'}
            width={64} // Fixed width and height for the image
            height={48}
            className="object-cover w-full h-full"
            />
        </div>
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-medium text-text-primary group-hover:text-primary transition-colors">
            {exercise.name}
          </h3>
          {/* You can include other relevant information here if needed */}
    </div>
    <div
      className="ml-auto text-xs text-primary hover:text-secondary transition-all hover:underline"
    >

      <Link
        href={`/exercises/${exercise.id}`}
        >
        View Details
      </Link>
        </div>
    </div>
);
  
export default ExerciseListItem;