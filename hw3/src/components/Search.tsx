"use client";

import { useRef } from "react";

import GrowingTextarea from "@/components/GrowingTextarea";
import UserAvatar from "@/components/UserAvatar";
import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";


export default function Search() {
  const { handle } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleReply = async () => {
    const content = textareaRef.current?.value;
    if (!content) return;
    if (!handle) return;}

  return (
    // this allows us to focus (put the cursor in) the textarea when the user
    // clicks anywhere on the div
    <div onClick={() => textareaRef.current?.focus()}>
      <div className="grid grid-cols-[fit-content(48px)_1fr] gap-4 px-4 pt-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <UserAvatar className="col-start-1 row-start-2 h-12 w-12" />
        <GrowingTextarea
          ref={textareaRef}
          wrapperClassName="col-start-2 row-start-2"
          className="bg-transparent text-xl outline-none placeholder:text-gray-500 overflow-scroll"
          placeholder="Enter your reply"
        />
      </div>
      <div className="p-4 text-end">
        <button
          className={cn(
            "my-2 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70",
            "disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40",
          )}
          onClick={handleReply}
        >
          Reply
        </button>
      </div>
    </div>
  );
}
