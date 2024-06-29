"use server";

import { createClient } from "@/utils/supabase/server";
import {
  checkIfPasswordsMatch,
  validateEmail,
  validatePassword,
} from "@/lib/helpers";
import {
  ForgotPasswordFormType,
  LoginFormType,
  SignupFormType,
  UpdatePasswordFormType,
} from "@/lib/schema";
import { ServerActionReponse } from "@/types";

export async function loginAction(
  formData: LoginFormType
): Promise<ServerActionReponse> {
  console.log("Into login action"); // DEBUG
  // Validate data
  if (!validateEmail(formData.email)) {
    console.log("Invalid email"); // DEBUG
    return {
      statusCode: 401,
      status: "NOT OK",
      message: "Invalid email address.",
    };
  }

  try {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword(formData);
    if (error) {
      console.log("Supabase login error: ", error); // DEBUG
      return {
        statusCode: 402,
        status: "NOT OK",
        message: "Incorrect email or password. TRY AGAIN!",
      };
    }
  } catch (error) {
    console.error("Unexpected error: ", error); // DEBUG
    return {
      statusCode: 500,
      status: "NOT OK",
      message: "Internal server error",
    };
  }
  return {
    statusCode: 200,
    status: "OK",
    message: "user logged in",
  };
}

export async function signUpAction(
  formData: SignupFormType
): Promise<ServerActionReponse> {
  console.log("Into sign up action"); // DEBUG

  // Valdidate fields
  if (!formData.firstName || !formData.lastName) {
    console.log("firstName or lastName empty"); // DEBUG
    return {
      statusCode: 401,
      status: "NOT OK",
      message: "First name and last name can't be empty.",
    };
  }
  if (!validateEmail || !validatePassword) {
    console.log("Invalid email or password"); // DEBUG
    return {
      statusCode: 401,
      status: "NOT OK",
      message: "Invalid email or password",
    };
  }
  if (!checkIfPasswordsMatch(formData.password, formData.confirmPassword)) {
    console.log("Passwords do not match!"); // DEBUG
    return {
      statusCode: 401,
      status: "NOT OK",
      message: "Passwords do not match",
    };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
      },
    });
    if (error) {
      console.log("Supabase Error: ", error); // DEBUG
      return {
        statusCode: 402,
        status: "NOT OK",
        message: "Can't create user. TRY AGAIN!",
      };
    }
  } catch (error) {
    console.log("Catch block caught error: ", error); // DEBUG
    return {
      statusCode: 500,
      status: "NOT OK",
      message: "Internal server error",
    };
  }
  return {
    statusCode: 200,
    status: "OK",
    message: "User registered.",
  };
}

export async function forgotPasswordAction(
  formData: ForgotPasswordFormType
): Promise<ServerActionReponse> {
  console.log("Into reset password action"); // DEBUG
  if (!validateEmail(formData.email)) {
    console.log("Invalid email address"); // DEBUG
    return {
      statusCode: 401,
      status: "NOT OK",
      message: "Invalid email address.",
    };
  }

  try {
    const supabase = createClient();
    // Send link to email through supabase to reset password
    await supabase.auth.resetPasswordForEmail(formData.email, {
      redirectTo: "/auth/update-password",
    });
  } catch (error) {
    console.log("Error: ", error); // DEBUG
    return {
      statusCode: 500,
      status: "NOT OK",
      message: "Internal server error",
    };
  }
  return {
    message: "",
    status: "OK",
    statusCode: 200,
  };
}

export async function updatePassword(
  formData: UpdatePasswordFormType
): Promise<ServerActionReponse> {
  console.log("Into update password action"); // DEBUG
  if (!checkIfPasswordsMatch(formData.password, formData.confirmPassword)) {
    console.log("Password do not match"); // DEBUG
    return {
      statusCode: 401,
      status: "NOT OK",
      message: "Password do not match.",
    };
  }
  if (!validatePassword) {
    console.log("Password pattern not valid"); // DEBUG
    return {
      statusCode: 401,
      status: "NOT OK",
      message: "Invalid password.",
    };
  }

  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (error) {
      console.log("Some error occured while update user password"); // DEBUG
      return {
        statusCode: 402,
        status: "NOT OK",
        message: "Couldn't update password. TRY AGAIN!",
      };
    }
    console.log("Update user req data : ", data); // DEBUG
  } catch (error) {
    console.log("Error: ", error); // DEBUG
    return {
      statusCode: 500,
      status: "NOT OK",
      message: "Internal server error",
    };
  }

  return {
    statusCode: 200,
    status: "OK",
    message: "Password updated",
  };
}
