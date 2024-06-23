'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { checkIfPasswordsMatch, validateEmail, validatePassword } from '@/lib/helpers'

export async function loginAction(formData: FormData) {
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  
  // Validate data
  if (!validateEmail(data.email)) {
    console.log("Invalid email");
    // return some error data to show on UI
  }
  if (!validatePassword(data.password)) {
    console.log("Invalid password");
    // return some error data to show on UI
  }

  console.log("Form Data: ", data);  // DEBUG

  // try {
  //   const supabase = createClient();

  //   const {error} = await supabase.auth.signInWithPassword(data)
  //   if (error) {
  //     console.log("Supabase login error: ", error); // DEBUG
  //     // show some error message
  //   }

  //   revalidatePath('/', 'layout')
  //   redirect('/account')
  // } catch (error) {
  //   console.error("Unexpected error: ", error); // DEBUG
  // }
}

export async function signUpAction(formData: FormData) {
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }
  console.log("Form data: ", data);   // DEBUG

  // Valdidate fields
  if (!checkIfPasswordsMatch(data.password, data.confirmPassword)){
    console.log("Passwords do not match!"); // DEBUG
  }
  if (!validateEmail || !validatePassword) {
    console.log("Invalid email or password"); // DEBUG
  }

  try {
    // const supabase = createClient();
    // const { error } = await supabase.auth.signUp(data)
  
    // if (error) {
    //   redirect('/error')
    // }
  
    // revalidatePath('/', 'layout')
    // redirect('/account')
  } catch (error) {
    // console.log(error); // DEBUG
  }
}