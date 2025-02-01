import mongoose from 'mongoose';

import { Exercise } from '@/types/workout';

const ExerciseSchema = new mongoose.Schema<Exercise>(
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

export default mongoose.model('Exercise', ExerciseSchema)
