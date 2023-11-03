"use client";

import { useRef } from "react";

import GrowingTextarea from "@/components/GrowingTextarea";
import { Separator } from "@/components/ui/separator";
import useTweet from "@/hooks/useTweet";
import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AddButton() {

  const { handle } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const starttimeRef = useRef<HTMLInputElement>(null);
  const endtimeRef = useRef<HTMLInputElement>(null);
  const starthrRef = useRef<HTMLSelectElement>(null);
  const endhrRef = useRef<HTMLSelectElement>(null);
  const { postTweet, loading } = useTweet();

  const handleTweet = async () => {
    const content = textareaRef.current?.value;
    const startDay = starttimeRef.current?.value;
    const endDay = endtimeRef.current?.value;
    const startHr = starthrRef.current?.value;
    const endHr = endhrRef.current?.value;
   

    if (!content || !startDay ||!endDay || !startHr || !endHr) {
      alert(" Error posting \n Please Enter All Information")
      return
    };
    
    if( ((((new Date(endDay)).getTime()-(new Date(startDay)).getTime())/86400000)>7) || ((((new Date(endDay)).getTime()-(new Date(startDay)).getTime())/86400000)===7 && (+endHr)>(+startHr)) ) {
      alert(" Error posting \n Please Enter Valid Time")
      return
    };
    if( ((new Date(endDay)).getTime()<(new Date(startDay)).getTime()) || (((new Date(endDay)).getTime()===(new Date(startDay)).getTime()) && (+endHr)<(+startHr)) ) {
      alert(" Error posting \n Please Enter Valid Time")
      return
    };

    if (!handle) return;

    const startTime = startDay+' '+startHr;
    const endTime = endDay+' '+endHr;

    try {
      await postTweet({
        handle,
        content,
        startTime,
        endTime
      });
      textareaRef.current.value = "";
      // this triggers the onInput event on the growing textarea
      // thus triggering the resize
      // for more info, see: https://developer.mozilla.org/en-US/docs/Web/API/Event
      textareaRef.current.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      );
      setHandleAddOpen(false);
    } catch (e) {
      console.error(e);
      alert("Error posting tweet");
    }
  };

  const [handleAddOpen, setHandleAddOpen] = useState(false);

  const handleChange = () => {
    setHandleAddOpen(true);
  };
  const handleAddOpenChange = (open: boolean) => {
    if (open)  setHandleAddOpen(true)
    else setHandleAddOpen(false);
  };

  return (
    <>
    <button
      className="flex items-center gap-2 rounded-full p-3 text-start transition-colors duration-300 bg-blue-200 hover:bg-gray-200"
      onClick={handleChange}
    >
      <div className="w-20 max-lg:hidden">
        <p className="text-sm font-bold">ADD TWEET</p>
      </div>
    </button>

  

    <Dialog open={handleAddOpen} onOpenChange={handleAddOpenChange}>



      <DialogContent className="flex gap-4">
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
      </DialogContent>

    </Dialog>


  </>            
  );
}