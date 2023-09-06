'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

export default function Signup({ user }: any) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [view, setView] = useState('sign-up')
  const router = useRouter()
  const supabase = createClientComponentClient()


  useEffect(() => {
    if (user) {
      router.push("/app/chat");
    }
  }, []);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      console.log(data);
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        alert("User already exists");
        return;
      } else if (error) {
        alert(error.message);
        return;
      }

      // If there is no error during sign-up, proceed with setView('check-email')
      setView("check-email");
    } catch (error) {
      // Handle the error here, you can show an error message or perform any other actions.
      if(error instanceof Error){
        console.log("Error during sign-up:", error.message);
      }
      // You may want to set an error state here if you want to display an error message to the user.
    }
  };
  // router.push('/')
  // router.refresh()

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
      {view === 'check-email' ? (
        <p className="text-center text-foreground">
          Check <span className="font-bold">{email}</span> to continue signing
          up
        </p>
      ) : (
          <form
            className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
            onSubmit={handleSignUp}
          >
            <label className="text-md" htmlFor="email">
              Usename
          </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Enter your username"
            />
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
              Sign Up
              </button>
            <p className="text-sm text-center">
              Already have an account?
                {" "}
              <Link
                href="/login"
              >
                Sign In Now
                </Link>
            </p>
          </form>
        )}
    </div>
  )
}
