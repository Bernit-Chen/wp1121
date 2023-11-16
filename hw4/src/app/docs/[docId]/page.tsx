"use client";

import { Input } from "@/components/ui/input";
import { useDocument } from "@/hooks/useDocument";
import React, {useRef} from "react";
import { cn } from "@/lib/utils/shadcn";
import { useSession } from "next-auth/react";


function DocPage() {
  const { title, setTitle, content, mesData, setContent } = useDocument();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleReply = async (e:React.KeyboardEvent<HTMLInputElement>)=>{
    const message = inputRef.current?.value;
    if (!message || message.length===0) return;
    if (e.keyCode !==13) return;

    try{
      setContent(message);
      inputRef.current.value = "";
      inputRef.current.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      );
    } catch (e) {
      alert("Error sending message")
    }
  }
  
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return (
    <div className="w-full">
      {/* <nav className="sticky top-0 flex w-full justify-between p-2 shadow-sm">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Document Title"
          className="rounded-lg px-2 py-1 text-slate-700 outline-0 focus:bg-slate-100"
        />
      </nav> */}
      
      <section className="w-full px-4 py-4">
        <div className="h-[80vh] w-full outline-0">
          {Array.from({length: mesData?.message.length ?? 0},(_, index)=>index).map((i)=>(
            <div
              className={cn(
                "flex items-center gap-1 rounded-full p-5 transition-colors bg-green-100",
                (mesData?.userID[i]===userId)&&("bg-blue-500"),
              )}
              onContextMenu={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                e.preventDefault(); 
                alert("按右鍵");}}
            >
              {mesData?.message[i]}
            </div>
          ))}
        </div>
      </section>

      {/* <section className="w-full px-4 py-4">
        <textarea
          value={content || ""}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          className="h-[80vh] w-full outline-0 "
        />
      </section> */}

      <Input
        ref={inputRef}
        placeholder="message"
        onKeyDown={e => handleReply(e)}
        className="sticky bottom-0 w-full"
      />
    </div>
  );
}

export default DocPage;
