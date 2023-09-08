import Head from "next/head";
import theme from "../../themes";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import PageLayout from "./pageLayout"
import Signin from "../signin/signin";


async function MyApp() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

      return (
        <>
           {user ? <PageLayout /> : <Signin />}
        </>
      );
    }  
  
  export default MyApp;