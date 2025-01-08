import { UserT } from "@/shared/types";

export const addComment = async (
  payload: {
    story_id: string;
    comment_text: string;
    author_id: string;
    commenter_id: string;
  },
  user: UserT
): Promise<{ success?: boolean; error?: string }> => {
  try {
    const response = await fetch(
      "https://storycloudapi.com/comments/add-comment",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.jwt_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add comment");
    }

    const data = await response.json();
    return { success: true, ...data };
  } catch (error) {
    console.error("Error adding comment:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

const encodePagingKey = (key: { story_id: string; creation_time: string }) => {
  try {
    return encodeURIComponent(JSON.stringify(key));
  } catch (e: unknown) {
    console.log(e);
    throw new Error("Failed to encode paging key");
  }
};

export const fetchComments = async (
  user: UserT,
  story_id: string,
  pageParam: { story_id: string; creation_time: string } | null,
  page_size = 10
): Promise<{
  comments: Array<{
    comment_id: string;
    commenter_user_handle: string;
    commenter_photo: string;
    comment_text: string;
    creation_time: string;
  }>;
  last_evaluated_key?: { story_id: string; creation_time: string };
}> => {
  const exclusiveStartKey = pageParam
    ? `&exclusive_start_key=${encodePagingKey({
        story_id: pageParam.story_id,
        creation_time: pageParam.creation_time,
      })}`
    : "";

  const response = await fetch(
    `https://storycloudapi.com/comments/fetch-comments?story_id=${story_id}&page_size=${page_size}${exclusiveStartKey}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.jwt_token}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
};

export const deleteComment = async (
  comment_id: string,
  user: UserT
): Promise<{ success?: boolean; error?: string }> => {
  try {
    const response = await fetch(
      `https://storycloudapi.com/comments/delete-comment?comment_id=${comment_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.jwt_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete comment");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
