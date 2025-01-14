import Image from "next/image";
import React from "react";
import { useParams } from "next/navigation";
import { useSessionContext } from "@/app/providers/SessionProvider";
import { useReactToStory } from "@/shared/components/RecordStoryModal/PublishAnswer/AnswerAndStats/mutations";
import HeartIcon from "@/assets/icons/heart.svg";
import { StoryReactionsPropsT } from "./types";

const StoryReactions = ({ story }: StoryReactionsPropsT) => {
  const user = useSessionContext();
  const { userId } = useParams();
  const { mutate: reactToStory } = useReactToStory(
    user,
    story?.story_id || "",
    typeof userId === "string" ? userId : ""
  );

  const handleAddReaction = () => {
    reactToStory("❤️");
  };

  return (
    <div className="flex items-center  gap-1 sm:gap-2">
      <Image
        onClick={handleAddReaction}
        src={HeartIcon}
        alt="likes"
        height={24}
        width={24}
        className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer"
      />
      <span className="text-sm sm:text-xl">
        {story?.is_published ? story.reactions_count : 0}
      </span>
    </div>
  );
};

export default StoryReactions;
