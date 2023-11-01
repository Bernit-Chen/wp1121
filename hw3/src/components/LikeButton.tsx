"use client";

import { useState } from "react";
import type { EventHandler, MouseEvent } from "react";

import { CheckSquare } from 'lucide-react';

import useLike from "@/hooks/useLike";
import { cn } from "@/lib/utils";

type LikeButtonProps = {
  initialLikes: number;
  initialLiked?: boolean;
  tweetId: number;
  handle?: string;
};

export default function LikeButton({
  initialLikes,
  initialLiked,
  tweetId,
  handle,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const { likeTweet, unlikeTweet, loading } = useLike();

  const handleClick: EventHandler<MouseEvent> = async (e) => {
    // since the parent node of the button is a Link, when we click on the
    // button, the Link will also be clicked, which will cause the page to
    // navigate to the tweet page, which is not what we want. So we stop the
    // event propagation and prevent the default behavior of the event.
    e.stopPropagation();
    e.preventDefault();
    if (!handle) return;
    if (liked) {
      await unlikeTweet({
        tweetId,
        userHandle: handle,
      });
      setLikesCount((prev) => prev - 1);
      setLiked(false);
    } else {
      await likeTweet({
        tweetId,
        userHandle: handle,
      });
      setLikesCount((prev) => prev + 1);
      setLiked(true);
    }
  };

  return (
    <>
    <button
      className={cn(
        "flex w-16 items-center gap-2 hover:text-black",
        liked && "text-black",
      )}
      onClick={handleClick}
      disabled={loading}
    >
      <div
        className={cn(
          "flex items-center gap-1 rounded-full p-5 transition-colors duration-300 hover:bg-brand/10",
          liked && "bg-green-500",
        )}
      >
        <CheckSquare size={30} />
      </div>
    </button>
    <div
        className={cn(
          "flex items-center gap-1 rounded-full text-black p-5 duration-300",
          liked && "bg-white",
        )}
      >
        {likesCount}人參加
        {likesCount == 0 && "Join it ?"}
      </div>
    </>
  );
}
