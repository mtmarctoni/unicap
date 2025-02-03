import {Schema, model, models} from 'mongoose';

import { type Exercise } from '@/types/workout';

const ExerciseSchema = new Schema<Exercise>(
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