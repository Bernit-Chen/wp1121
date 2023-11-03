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
  const starthrRef = useRef<HTMLSelectElement>(null);
  const endhrRef = useRef<HTMLSelectElement>(null);
  const { postTweet, loading } = useTweet();

  const handleTweet = async () => {
    const content = textareaRef.current?.value;
    const startTime = starttimeRef.current?.value;
    const endTime = endtimeRef.current?.value;
    const startHr = starthrRef.current?.value;
    const endHr = endhrRef.current?.value;
   

    if (!content || !startTime ||!endTime || !startHr || !endHr) {
      alert(" Error posting \n Please Enter All Information")
      return
    };
    
    if( ((((new Date(endTime)).getTime()-(new Date(startTime)).getTime())/86400000)>7) || ((((new Date(endTime)).getTime()-(new Date(startTime)).getTime())/86400000)===7 && (+endHr)>(+startHr)) ) {
      alert(" Error posting \n Please Enter Valid Time")
      return
    };
    if( ((new Date(endTime)).getTime()<(new Date(startTime)).getTime()) || (((new Date(endTime)).getTime()===(new Date(startTime)).getTime()) && (+endHr)<(+startHr)) ) {
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
    <div className="flex gap-4">
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
            <select ref={starthrRef}>
              {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map((i) => (
                <option value={i}>{i}時</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mb-2 mt-6">
            <p>End time</p>
            <input type="date" ref={endtimeRef}></input>
            <select ref={endhrRef}>
              {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map((i) => (
                <option value={i}>{i}時</option>
              ))}
            </select>
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
