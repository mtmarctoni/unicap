import { Schema, Types, model, models } from 'mongoose';

interface IWorkout {
  name: string;
  duration?: string | null;
  difficulty?: string | null;
  exercises?: Types.ObjectId[];
}

const WorkoutSchema = new Schema<IWorkout>({
  name: {
    type: String,
    required: true
  },
  duration: String,
  difficulty: String,
  exercises: [{
    type: Types.ObjectId,
    ref: 'Exercise',
  }],
});

WorkoutSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

// Check if the model already exists
const Workout = models.Workout || model('Workout', WorkoutSchema);

export default Workout;