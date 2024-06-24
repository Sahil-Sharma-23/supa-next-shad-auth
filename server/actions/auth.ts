"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  checkIfPasswordsMatch,
  validateEmail,
  validatePassword,
} from "@/lib/helpers";

export async function loginAction(formData: FormData) {
  console.log("Into login action"); // DEBUG
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Validate data
  if (!validateEmail(data.email)) {
    console.log("Invalid email");
    // return some error data to show on UI
  }
  if (!validatePassword(data.password)) {
    console.log("Invalid password");
    // return some error data to show on UI
  }

  console.log("Form Data: ", data); // DEBUG

  try {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) {
      console.log("Supabase login error: ", error); // DEBUG
      // show some error message
    }

    revalidatePath("/", "layout");
    redirect("/auth/protected");
  } catch (error) {
    console.error("Unexpected error: ", error); // DEBUG
  }
}

export async function signUpAction(formData: FormData) {
  console.log("Into sign up action"); // DEBUG
  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };
  console.log("Form data: ", data); // DEBUG

  // Valdidate fields
  if (!checkIfPasswordsMatch(data.password, data.confirmPassword)) {
    console.log("Passwords do not match!"); // DEBUG
  }
  if (!validateEmail || !validatePassword) {
    console.log("Invalid email or password"); // DEBUG
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      },
    });
    if (error) {
      console.log("Supabase Error: ", error); // DEBUG
    }

    redirect("/auth/protected");
  } catch (error) {
    console.log("Catch block caught error: ", error); // DEBUG
  }
}

export async function resetPasswordAction(formData: FormData) {
  console.log("Into reset password action"); // DEBUG
  const email = formData.get("email") as string;

  if (!validateEmail(email)) {
    console.log("Invalid email address"); // DEBUG
  }
  console.log("User email for password reset: ", email); // DEBUG

  try {
    const supabase = createClient();
    // Send link through supabase to reset password
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "/auth/update-password",
    });
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function updatePassword(formData: FormData) {
  console.log("Into update password action"); // DEBUG
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!checkIfPasswordsMatch(password, confirmPassword)) {
    console.log("Password do not match"); // DEBUG
  }
  if (!validatePassword) {
    console.log("Password pattern not valid"); // DEBUG
  }

  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      console.log("Some error occured while update user password"); // DEBUG
    }
    console.log("Update user req data : ", data); // DEBUG
  } catch (error) {
    console.log("Error: ", error);
  }
}
