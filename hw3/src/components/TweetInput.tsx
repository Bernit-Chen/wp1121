"use client";

import { useRef } from "react";

import GrowingTextarea from "@/components/GrowingTextarea";
import { Separator } from "@/components/ui/separator";
import useTweet from "@/hooks/useTweet";
import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";

export default function TweetInput() {
  const { handle } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const starttimeRef = useRef<HTMLInputElement>(null);
  const endtimeRef = useRef<HTMLInputElement>(null);
  const { postTweet, loading } = useTweet();

  const handleTweet = async () => {
    const content = textareaRef.current?.value;
    const startTime = starttimeRef.current?.value;
    const endTime = endtimeRef.current?.value;
    if (!content || !startTime ||!endTime) {
      alert(" Error posting \n Please Enter All Information")
      return
    };
    if (!endTime || !startTime) {
      alert(" Error posting \n Please Enter Valid Time")
      return
    };
    if (!handle) return;

    try {
      await postTweet({
        handle,
        content,
        startTime,
        endTime
      });
      textareaRef.current.value = "";
      console.log(startTime)
      // this triggers the onInput event on the growing textarea
      // thus triggering the resize
      // for more info, see: https://developer.mozilla.org/en-US/docs/Web/API/Event
      textareaRef.current.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      );
    } catch (e) {
      console.error(e);
      alert("Error posting tweet");
    }
  };

  return (
    <div className="flex gap-4" onClick={() => textareaRef.current?.focus()}>
      <div className="flex w-full flex-col px-2">
        <div className="mb-2 mt-6">
          <GrowingTextarea
            ref={textareaRef}
            className="bg-transparent outline-none placeholder:text-gray-500"
            placeholder="Title"
          />
        </div>
        <Separator />
        <div className="flex justify-between gap-8">
          <div className="flex flex-col mb-2 mt-6">
            <p>Start time</p>
            <input type="date" ref={starttimeRef}></input>
          </div>
          <div className="flex flex-col mb-2 mt-6">
            <p>End time</p>
            <input type="date" ref={endtimeRef}></input>
          </div>

        </div>
        <div className="flex justify-end">
          <button
            className={cn(
              "my-2 rounded-full bg-brand px-4 py-2 text-white transition-colors border-[1px] border-black-700 hover:bg-gray-200",
              "disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40",
            )}
            onClick={handleTweet}
            disabled={loading}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
