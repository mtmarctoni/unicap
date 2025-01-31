import { ArchiveBoxXMarkIcon, EllipsisVerticalIcon, PencilIcon, Square2StackIcon, TrashIcon } from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import { Workout } from '@/app/types/workout';
import DarkThemeToggle from '../features/DarkThemeToggle';

interface Props{
    workout: Workout;
}

export default function WorkoutCard({ workout }: Props) {
    return (
      <div className="bg-surface shadow-lg rounded-xl p-6 relative text-text">
            <Menu as="div" className="absolute top-2 right-2">
                <MenuButton className="inline-flex items-center">
                    <EllipsisVerticalIcon className="h-5 w-5 text-muted" aria-hidden="true" />
                </MenuButton>
                <MenuItems className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-muted/10 bg-surface shadow-lg focus:outline-none z-10">
            <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-primary-light text-text">
              <PencilIcon className="size-4 fill-current" />
              Edit
              <kbd className="ml-auto hidden font-sans text-xs text-muted group-data-[focus]:inline">⌘E</kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-primary-light">
              <Square2StackIcon className="size-4 fill-current" />
              Duplicate
              <kbd className="ml-auto hidden font-sans text-xs text-muted group-data-[focus]:inline">⌘D</kbd>
            </button>
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-primary-light">
              <ArchiveBoxXMarkIcon className="size-4 fill-current" />
              Archive
              <kbd className="ml-auto hidden font-sans text-xs text-muted group-data-[focus]:inline">⌘A</kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-primary-light">
              <TrashIcon className="size-4 fill-current" />
              Delete
              <kbd className="ml-auto hidden font-sans text-xs text-muted group-data-[focus]:inline">⌘D</kbd>
            </button>
          </MenuItem>
                </MenuItems>
                </Menu>
            
                <h2 className="text-xl font-semibold mb-2 text-text-dark">{workout.name}</h2>
            <p className="text-muted mb-1">Duration: {workout.duration}</p>
            <p className="text-muted">Difficulty: {workout.difficulty}</p>
        </div>
    );
};
