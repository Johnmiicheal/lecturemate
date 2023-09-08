import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Signin from './signin'


export default async function Username() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession()

  return <Signin user={user} />
}

