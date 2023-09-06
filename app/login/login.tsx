'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

export default function Login({user}: any) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [view, setView] = useState('sign-in')
  const router = useRouter()
  const supabase = createClientComponentClient()

  console.log(user);

  useEffect(() => {
    if(user) {
      router.push("/app/chat");
    }
  }, []);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
     const { data, error } = await supabase.auth.signInWithPassword({
       email,
       password,
     });

     if (data.user) {
       // Sign-in was successful, navigate to the home page or any other desired route.
       router.push("/app/chat");
       // Alternatively, you can use router.push('/') again to refresh the page.
     }

     if(error) {
       if(error.message === "Failed to fetch") {
         alert("Check your Internet Connection");
         return;
       }

       if (error.message === "Invalid login credentials") {
         alert("Incorrect username or password");
       }
     }

   } catch (error) {
      console.log("An error occured with error statement: " + error)
    }
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/app"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>

        <h3>Login to continue</h3>
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          onSubmit={handleSignIn}
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
          />

              <button className="bg-green-700 rounded px-4 py-2 text-white mb-6">
                Login In
              </button>

              <p className="text-sm text-center">
                Don't have an account?
                {" "}
                <Link
                href="/signup"
                >
                  Sign Up Now
                </Link>
              </p>
        </form>
    </div>
  )
}
