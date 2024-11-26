import { cookies } from "next/headers";

export const POST = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    return Response.json({ error: "Logged out successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
