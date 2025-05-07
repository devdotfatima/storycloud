import { UserT } from "@/shared/types";

export const publishStory = async (
  story_id: string,
  title: string,
   images: Record<string, { file: File; url: string }> | File[]|Record<string,string>,
  audience: "close_friends" | "all_friends",
  user: UserT|null
): Promise<{ success?: boolean; error?: string }> => {
  try {
    const formData = new FormData();
    formData.append("story_id", story_id);
    formData.append("story_title", title);
    formData.append("audience", audience);

    if (Array.isArray(images)) {
      images.forEach((image) => {
        if (image instanceof File) formData.append("images", image);
      });
    } else {
      Object.values(images).forEach(({ file }) => {
        formData.append("images", file);
      });
    }

    // Debugging: Log FormData entries
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}:`, value.name);
      } else {
        console.log(`${key}:`, value);
      }
    }

    const response = await fetch(
      `https://www.storycloudapi.com/stories/publish-story`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user?.jwt_token}`,
          // No `Content-Type` needed; `fetch` will auto-set for FormData
        },
        body: formData,
      }
    );

    if (!response.ok) {
      let errorMessage = "Failed to publish story";
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorMessage;
      } catch {
        console.error("Error parsing response:", await response.text());
      }
      throw new Error(errorMessage);
    }

    return { success: true };
  } catch (error) {
    console.error("Error publishing story:", error);
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};


export const updateStory = async (
  story_id: string,
  title: string | null,
  transcript: string | null,
  synopsis: string | null,
  user: UserT|null,

): Promise<{ success?: boolean; error?: string }> => {
  try {
    const formData = new FormData();
    formData.append("story_id", story_id);
    console.log({title,transcript});
    
    if (title !== null) formData.append("story_title", title);
    if (transcript !== null) formData.append("transcript", transcript);
    if (synopsis !== null) formData.append("synopsis", synopsis);

    // if (Array.isArray(images)) {
    //   images.forEach((image) => {
    //     if (image instanceof File) formData.append("images", image);
    //   });
    // } else {
    //   Object.values(images).forEach(({ file }) => {
    //     formData.append("images", file);
    //   });
    // }

//   (images_to_delete || []).forEach((image) => {
//   formData.append("images_to_delete", image);
// });
    

    const response = await fetch(
      `https://www.storycloudapi.com/stories/update-story`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user?.jwt_token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      let errorMessage = "Failed to update story";
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorMessage;
      } catch {
        console.error("Error parsing response:", await response.text());
      }
      throw new Error(errorMessage);
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating story:", error);
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};