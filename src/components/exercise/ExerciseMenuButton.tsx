import { ArchiveBoxXMarkIcon, EllipsisVerticalIcon, PencilIcon, Square2StackIcon, TrashIcon } from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import { Exercise, NewExercise } from '@/types/workout';

interface Props {
    exercise: Exercise;
    handleDelete: (id: string) => void;
    handleEdit: (id: string) => void;
    handleDuplicate: (newExercise: NewExercise) => void;
}

const ExerciseMenuButton = ({exercise, handleDelete, handleEdit, handleDuplicate}: Props) => {
    return (
        <Menu as="div" className="absolute top-2 right-2">
            <MenuButton className="p-1 rounded-full text-muted hover:text-text hover:bg-secondary/50 transition-colors hover:animate-pulse">
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-muted/10 bg-surface shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                <div className="relative py-1 gap-6">
                      
                    <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-primary-light text-text"
                            onClick={() => handleEdit(exercise.id)}
                        >
                            <PencilIcon className="size-4 fill-current" />
                            Edit
                            <kbd className="ml-auto hidden font-sans text-xs text-muted group-data-[focus]:inline">⌘E</kbd>
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-primary-light"
                            onClick={() => {
                                const { id, ...newExercise } = exercise;
                                // const newExercise: NewExercise = {
                                //     name: exercise.name,
                                //     sets: exercise.sets,
                                //     reps: exercise.reps,
                                //     weight: exercise.weight
                                // }
                                return handleDuplicate(newExercise);
                            }}
                        >
                            <Square2StackIcon className="size-4 fill-current" />
                            Duplicate
                            <kbd className="ml-auto hidden font-sans text-xs text-muted group-data-[focus]:inline">⌘D</kbd>
                        </button>
                    </MenuItem>
                    <div className="my-1 h-px bg-white/5" />
                    {/* <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-primary-light">
                            <ArchiveBoxXMarkIcon className="size-4 fill-current" />
                            Archive
                            <kbd className="ml-auto hidden font-sans text-xs text-muted group-data-[focus]:inline">⌘A</kbd>
                        </button>
                    </MenuItem> */}
                    <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-primary-light"
                            onClick={() => handleDelete(exercise.id)}
                        >
                            <TrashIcon className="size-4 fill-current" />
                            Delete
                            <kbd className="ml-auto hidden font-sans text-xs text-muted group-data-[focus]:inline">⌘D</kbd>
                        </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    )
};

export default ExerciseMenuButton;