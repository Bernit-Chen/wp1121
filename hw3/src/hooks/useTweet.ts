import { useState } from "react";

import { useRouter } from "next/navigation";
import useLike from "@/hooks/useLike";

export default function useTweet() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { likeTweet } = useLike();

  const postTweet = async ({
    handle,
    content,
    replyToTweetId,
    startTime,
    endTime,
  }: {
    handle: string;
    content: string;
    replyToTweetId?: number;
    startTime?: string;
    endTime?: string;
  }) => {
    setLoading(true);

    const res = await fetch("/api/tweets", {
      method: "POST",
      body: JSON.stringify({
        handle,
        content,
        replyToTweetId,
        startTime,
        endTime,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    const tweetID = (await res.json()).message;

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
    return tweetID;
  };

  return {
    postTweet,
    loading,
  };
}
