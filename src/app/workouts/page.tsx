import Head from 'next/head'

import WorkoutList from '../../components/workout/WorkoutList';
// import DarkThemeToggle from '../../components/features/DarkThemeToggle';

export default function WorkoutPage() {
    return (
        <div className="container mx-auto px-4">
            <Head>
                <title>Workout Routines</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="py-10">
                <h1 className="text-4xl font-bold mb-8 text-text">Workout Routines</h1>
                <WorkoutList />
            </main>
        </div>
    );
};
