import { Exercise, ExerciseByDay, WorkoutDay } from "@/types/workout";
import { useState } from "react";

interface Props {
    selectedDay: WorkoutDay | null;
    setSelectedDay: (day: WorkoutDay | null) => void;
    exercises: ExerciseByDay; // Mapping of days to exercises
}

const Calendar = ({ exercises, selectedDay, setSelectedDay }: Props) => {
    const daysOfWeek: WorkoutDay[] = Object.values(WorkoutDay);
    const numberTrainingDays: number = daysOfWeek.reduce((acc, day) => {
        return (exercises[day].length > 0) ? acc + 1 : acc;
    }, 0);
    const numCols = numberTrainingDays;

    return (
        <div className="calendar p-4 bg-background">
            <h2 className="text-2xl font-bold mb-4 text-text text-center">
                Weekly Exercise Calendar for <span className="text-secondary underline">
                {numberTrainingDays} Days
            </span>
            </h2>
        
                
            <div className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-${numCols} gap-4`}>
            {daysOfWeek.map(day => {
                // Only render the day cell if there are exercises OR if it's the selected day
                if (exercises[day]?.length > 0 || selectedDay === day) {
                    return (
                        <div
                        key={day}
                        onClick={() => {
                            const newSelectedDay = selectedDay === day ? null : day;
                            setSelectedDay(newSelectedDay);
                        }}
                        className={`relative rounded-xl cursor-pointer transition-all duration-300 overflow-hidden
                                ${selectedDay === day ? 'bg-primary/50 shadow-lg scale-105' : 'bg-surface text-text border border-muted hover:scale-110 hover:bg-background-alt'}
                                ${exercises[day]?.length > 0 ? 'hover:scale-110' : ''}
                                ${selectedDay === day ? 'ring-2 ring-primary' : ''} `}
                                >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 transition-opacity duration-300 opacity-0 hover:opacity-100"></div>

                            <div className="p-4 relative z-10">
                                <h3 className="text-secondary-dark font-semibold mb-2">{day}</h3>
                                {day && (
                                    <ul className="list-disc pl-5">
                                        {exercises[day]?.map((exercise: Exercise, index: number) => (
                                            <li key={index} className="mb-1">
                                                {exercise.name}
                                            </li>
                                        )) || <li className="text-muted italic">No exercises scheduled</li>}
                                    </ul>
                                )}
                            </div>
                        </div>
                    );
                }
                return null; // Don't render anything if no exercises and not selected
            })}
        </div>
    </div>
    );
};

export default Calendar;