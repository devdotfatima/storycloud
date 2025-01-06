import { useQuery } from "@tanstack/react-query";

export const useFetchTranscript = (transcriptUrl?: string) => {
  return useQuery<string, Error>({
    queryKey: ["transcript", transcriptUrl],
    queryFn: async () => {
      if (!transcriptUrl) throw new Error("Transcript URL is required");
      const response = await fetch(transcriptUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch transcript: ${response.statusText}`);
      }
      return response.text();
    },
    enabled: !!transcriptUrl,
  });
};
