import { StoryRequestT } from "@/shared/types";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getStoryRequestsFromFriends } from "./components/QuestionsFromFriends/actions";
import { useSessionContext } from "@/app/providers/SessionProvider";

// Define the context type
interface StoryRequestsContextType {
  storyRequests: StoryRequestT[];
  error: string;
  isLoading: boolean;
}

// Define the default values for the context
const StoryRequestsContext = createContext<StoryRequestsContextType>({
  storyRequests: [],
  error: "",
  isLoading: true,
});

// Define props for the provider
interface StoryRequestsProviderProps {
  children: ReactNode;
}

// Create a provider component
export const StoryRequestsProvider: React.FC<StoryRequestsProviderProps> = ({
  children,
}) => {
  const [storyRequests, setStoryRequests] = useState<StoryRequestT[]>([]);
  const user = useSessionContext();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStoryRequests = async () => {
      const result = await getStoryRequestsFromFriends(user);
      if ("error" in result) {
        setError(result.error);
      } else {
        setStoryRequests(result.items);
      }
      setIsLoading(false);
    };

    fetchStoryRequests();
  }, [user]);

  return (
    <StoryRequestsContext.Provider value={{ storyRequests, error, isLoading }}>
      {children}
    </StoryRequestsContext.Provider>
  );
};

// Hook for accessing the context
export const useStoryRequests = (): StoryRequestsContextType => {
  const context = useContext(StoryRequestsContext);
  if (!context) {
    throw new Error(
      "useStoryRequests must be used within a StoryRequestsProvider"
    );
  }
  return context;
};
