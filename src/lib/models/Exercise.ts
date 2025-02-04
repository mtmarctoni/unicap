import {Schema, model, models} from 'mongoose';

interface IExercise {
    name: string;
    sets: number;
    reps: number;
    weight?: number;
    imageUrl?: string;
}

const ExerciseSchema = new Schema<IExercise>(
    {
        name: {
            type: String,
            required: true
        },
        sets: {
            type: Number,
            required: true
        },
        reps: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: false
        },
        imageUrl: {
            type: String,
            required: false
        }
    }
);

ExerciseSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

// Check if the model already exists
const Exercise = models?.Exercise || model('Exercise', ExerciseSchema);

export default Exercise;