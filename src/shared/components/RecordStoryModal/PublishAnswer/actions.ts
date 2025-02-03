import { UserT } from "@/shared/types";

export const publishStory = async (
  story_id: string,
  title: string,
  images: File[] | Record<string, string>,
  audience: "close_friends" | "all_friends",
  user: UserT
): Promise<{ success?: boolean; error?: string }> => {
  try {
    const formData = new FormData();
    formData.append("story_id", story_id);
    formData.append("story_title", title);
    formData.append("audience", audience);
    if (Array.isArray(images) && images.length > 0) {
      images.forEach((image) => {
        formData.append("new_images", image);
      });
    }

    if (!Array.isArray(images) && typeof images === "object") {
      Object.entries(images).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}:`, value.name); // Logs the file name for File objects
      } else {
        console.log(`${key}:`, value); // Logs other values
      }
    }

    const response = await fetch(
      `https://www.storycloudapi.com/stories/publish-story`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.jwt_token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to publish story");
    }

    return { success: true };
  } catch (error) {
    console.error("Error publishing story:", error);

    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};
