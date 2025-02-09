import { type Exercise, type ExerciseId } from "@/types/workout";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Props { 
    exercise: Exercise;
    handleRemove: (id: ExerciseId) => void;
}

const RemoveOptionButton = ({
    exercise,
    handleRemove
}: Props) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
    return (
        <div className="absolute top-2 right-2 z-10">
            <button className="rounded-full p-2 hover:bg-surface transition-colors"
                onClick={() => setIsDeleteOpen(true)}
            >

            <TrashIcon className="m-auto w-4 h-4 text-red-500 hover:animate-bounce" />
            </button>

             {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-2xl bg-surface p-6 space-y-6">
              <DialogTitle className="text-xl font-bold text-text-primary">
                Remove Exercise
              </DialogTitle>
              
              <p className="text-muted">
                                Are you sure you want to remove
                                <strong className="text-secondary ">{` ${exercise.name} `}</strong>
                                from this workout?
              </p>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsDeleteOpen(false)}
                  className="px-4 py-2 text-muted rounded-lg hover:text-primary hover:bg-background-alt"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleRemove(exercise.id);
                    setIsDeleteOpen(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-300"
                >
                  Confirm Remove
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

        </div>
    );
};

export default RemoveOptionButton;