import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Login from "./login"

export default async function Username() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession()

  return <Login user={user} />
}
