"use client";

import { useRef } from "react";

import useTweet from "@/hooks/useTweet";
import useUserInfo from "@/hooks/useUserInfo";

type ReplyInputProps = {
  replyToTweetId: number;
  replyToHandle: string;
};

export default function ReplyInput({
  replyToTweetId,
  replyToHandle,
}: ReplyInputProps) {
  const { handle } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { postTweet } = useTweet();

  const handleReply = async (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.keyCode !==13) return;
    const content = textareaRef.current?.value;
    if (!content) return;
    if (!handle) return;

    try {
      await postTweet({
        handle,
        content,
        replyToTweetId,
      });
      textareaRef.current.value = "";
      // this triggers the onInput event on the growing textarea
      // thus triggering the resize
      // for more info, see: https://developer.mozilla.org/en-US/docs/Web/API/Event
      textareaRef.current.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      );
    } catch (e) {
      console.error(e);
      alert("Error posting reply");
    }
  };

  return (
    // this allows us to focus (put the cursor in) the textarea when the user
    // clicks anywhere on the div
    <div onClick={() => textareaRef.current?.focus()}>
    <div>
        {/* <UserAvatar className="col-start-1 row-start-2 h-12 w-12" /> */}
      <div className="grid grid-cols-[fit-content(48px)_1fr] gap-4 px-4 pt-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <p className="col-start-2 row-start-1 text-gray-500">
          Replying to <span className="text-brand">@{replyToHandle}</span>
        </p>
        <br/>
        <br/>
      </div>
        <textarea
          ref={textareaRef}
          className="p-8 col-start-2 row-start-2 w-full bg-transparent text-xl outline-none placeholder:text-gray-500 overflow-scroll"
          placeholder="Enter your reply"
          onKeyDown={(e)=> handleReply(e)}
        />
      <div className="p-4 text-end">
        {/* <button
          className={cn(
            "my-2 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70",
            "disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40",
          )}
          onClick={handleReply}
          disabled={loading}
        >
          Reply
        </button> */}
      </div>
    </div>
    </div>
  );
}
