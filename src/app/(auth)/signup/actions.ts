"use server";
import { redirect } from "next/navigation";
import { signUpSchema, SignUpT } from "@/lib/validations";
import { isRedirectError } from "next/dist/client/components/redirect";

export const signUp = async (
  credentials: SignUpT
): Promise<{ error: string }> => {
  try {
    const { email, password, birthday, username } =
      signUpSchema.parse(credentials);

    const payload = {
      user_email: email,
      user_handle: username,
      password: password,
      birthday: birthday
        ? new Date(birthday).toLocaleDateString("en-CA") // Convert to YYYY-MM-DD
        : "2000-01-01", // Default birthday if not provided
    };
    const response = await fetch(
      "https://storycloudapi.com/users/create-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Send as JSON in the request body
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return { error: "Invalid credentials." };
    }

    const { token } = await response.json();

    // Store the token securely (example using cookies)
    // Note: This requires setting up secure cookie handling server-side.
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    };
    // Save token in cookies (you might need to set this in headers for the response)
    document.cookie = `token=${token}; ${Object.entries(cookieOptions)
      .map(([key, value]) => `${key}=${value}`)
      .join("; ")}`;

    // Redirect to the home page
    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "Something went wrong. try again." };
  }
};

// export const login = async (
//   credentials: LoginT
// ): Promise<{ error: string }> => {
//   try {
//     const { email, password } = loginSchema.parse(credentials);

//     const payload = new URLSearchParams({
//       username: email,
//       password: password,
//     }).toString();

//     const response = await fetch("https://storycloudapi.com/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: payload,
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.log(errorData);
//       // setError(errorData.detail || "Invalid credentials.");
//       return { error: "Invalid credentials." };
//     }

//     const = await response.json();

//     if (!access_token) {
//       console.error("Missing access_token in response");
//       return { error: "Invalid server response." };
//     }

//     console.log(access_token);

//     const cookieStore = await cookies();
//     cookieStore.set("access_token", access_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//       sameSite: "lax",
//     });
//     return redirect("/");
//   } catch (error) {
//     if (isRedirectError(error)) throw error;
//     console.error(error);
//     return { error: "Something went wrong. try again." };
//   }
// };
