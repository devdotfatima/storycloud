// "use server";

// import { updatePasswordSchema, UpdatePasswordT } from "@/lib/validations";

// export const updatePassword = async (
//   credentials: UpdatePasswordT
// ): Promise<{ error?: string }> => {
//   try {
//     const { password } = updatePasswordSchema.parse(credentials);
//     const { user } = await validateUser();

//     const payload = {
//       token: user?.jwt_token,
//       new_password: password,
//     };

//     let response;

//     if (user) {
//       response = await fetch("https://storycloudapi.com/auth/update-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.jwt_token}`,
//         },
//         body: JSON.stringify(payload),
//       });
//     } else {
//       const token = "";
//       const payloadWithToken = { ...payload, token };

//       response = await fetch("https://storycloudapi.com/auth/update-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payloadWithToken),
//       });
//     }
//     console.log(response);

//     // Check for response status
//     if (!response.ok) {
//       console.log(response);

//       return { error: "Something went wrong." };
//     }

//     const data = await response.json();
//     console.log(data);

//     return data;
//   } catch (error) {
//     console.error("Unexpected error:", error);
//     return { error: "Something went wrong. Please try again." };
//   }
// };


"use server";
import { validateUser } from "@/lib/dal";


export async function updatePassword(password: string, token: string|null) {
  try {
    let res;

    if (token) {
      console.log("asd,");
      
      res = await fetch(`https://storycloudapi.com/auth/update-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: password }),
      });
    } else {
       const { user } = await validateUser();
      const params = new URLSearchParams({ new_password: password });
      res = await fetch(`https://storycloudapi.com/auth/update-password-logged-in-route?${params}`, {
        method: "POST",
                headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.jwt_token}`,
        },
      });
    }

    if (!res.ok) {
      const data = await res.json();
      return { error: data?.detail || "Something went wrong" };
    }

    return { success: true };
  } catch (err) {
    console.log(err);
    
    return { error: "Something went wrong" };
  }
}