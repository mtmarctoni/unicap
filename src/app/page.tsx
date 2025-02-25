import Link from "next/link";
import { auth0 } from "@/lib/auth0";
import { useUser } from "@auth0/nextjs-auth0";

export default async function Home() {
  const session = await auth0.getSession();


    const Login = () => {

      return (
        <section className="flex flex-col items-center gap-2 min-w-full">
          <a href="/auth/login?screen_hint=signup"
          >
            <button
              className="bg-primary rounded-lg p-2 w-full cursor-pointer"
            >
              Sign up</button>
        </a>
        <a href="/auth/login">
        <button className="bg-secondary  rounded-lg p-2 cursor-pointer"
            >
              Log in</button>
        </a>
      </section>
    );
  
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {session
          ? (<section>
              <h1>Welcome, {session.user.name}!</h1>
              <p>
              <a href="/auth/logout">
                <button
              className="bg-background-alt rounded-lg p-2 w-full cursor-pointer"
                
                >Log out</button>
                </a>
              </p>
              <p className="text-primary">

        in progess...
          Go to /workouts
          <button>
            <Link href="/workouts">
            WORKOUTS
            </Link>
          </button>
        </p>
          </section>
          )
          : <Login />}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
