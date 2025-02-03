import { createExercise, deleteExercise, getAllExercises } from "@/lib/exerciseOperationsDB";
import { NewExercise, type Exercise } from "@/types/workout";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const exercises = await getAllExercises();

    if (!exercises) {
      return NextResponse.json(
        { message: "Exercises not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(exercises, {
      // headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     'Content-Type': 'application/json'
      // }
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch exercises" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, response: NextResponse) {
    const req = await request.json();
    const newExercise: NewExercise = req as NewExercise;
  try {
    const result = await createExercise(newExercise);
    return NextResponse.json(result, {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create exercise" },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: Request, response: NextResponse) {
    const req = await request.json();
    const id: string = req.id as string;
    try {
        const result = await deleteExercise(id);
        return NextResponse.json(result, {
            status: 200
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to delete exercise" },
            {
                status: 500
            }
        );
    }
}