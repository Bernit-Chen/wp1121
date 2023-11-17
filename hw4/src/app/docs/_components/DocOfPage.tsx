"use client";

import { Input } from "@/components/ui/input";
import { useDocument } from "@/hooks/useDocument";
import React, {useRef, useState} from "react";
import { cn } from "@/lib/utils/shadcn";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";


function DocOfPage() {
  const { title, setTitle, content, mesData, setContent, document, setDocument } = useDocument();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open,setOpen] = useState(false);
  const [mesIndex,setMesIndex] = useState(0);
  

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

  const pinAnnounce = ()=>{
    if(!mesData) return;
    if (document === null) return;
    const newMesData ={
      message: [...document.mesData.message],
      userID: [...document.mesData.userID],
      block: [...document.mesData.block],
      creatTime: [...document.mesData.creatTime],
      announceOfTime: document.mesData.creatTime[mesIndex],
    };
    try{
      setDocument({
        ...document,
        mesData: newMesData
      });
      setOpen(false);
    } catch (e) {
      alert("Error Pin message")
    }
  }

  const deleteYourself = ()=>{
    if(!mesData) return;
    if (document === null) return;
    const newBlock = mesData.block;
    newBlock[mesIndex] = false;
    const newMesData ={
      message: [...document.mesData.message],
      userID: [...document.mesData.userID],
      block: newBlock,
      creatTime: [...document.mesData.creatTime],
      announceOfTime: document.mesData.announceOfTime
    };
    try{
      setDocument({
        ...document,
        mesData: newMesData
      });
      setOpen(false);
    } catch (e) {
      alert("Error delete message")
    }
  }

  const deleteEveryone = ()=>{
    if(!mesData) return;
    if (document === null) return;
  
    document.mesData.message.splice(mesIndex,1)
    document.mesData.userID.splice(mesIndex,1)
    document.mesData.block.splice(mesIndex,1)
    document.mesData.creatTime.splice(mesIndex,1)
    console.log(document.mesData)
    const newMesData ={
      message: document.mesData.message,
      userID: document.mesData.userID,
      block: document.mesData.block,
      creatTime: document.mesData.creatTime,
      announceOfTime: (document.mesData.announceOfTime===document.mesData.creatTime[mesIndex]) ? 0:document.mesData.announceOfTime
    };
    console.log(newMesData)
    try{
      setDocument({
        ...document,
        mesData: newMesData
      });
      setOpen(false);
    } catch (e) {
      alert("Error delete message")
    }
  }
  
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return (
        <div className="w-full">
          <nav className="sticky top-0 flex w-full justify-between p-2 shadow-sm">
            {/* <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Document Title"
              className="rounded-lg px-2 py-1 text-slate-700 outline-0 focus:bg-slate-100"
            /> */}
            <div 
              style={{display: (document?.mesData.announceOfTime!==0) ? "block" : "none"}}
              className="rounded-lg px-2 py-1 text-slate-700 outline-0 focus:bg-slate-100"
            >
              {document?.mesData.message[document.mesData.creatTime.indexOf(document.mesData.announceOfTime)]}
            </div>
          </nav>
          
          <section className="w-full px-4 py-4">
            <div className="h-[80vh] w-[20vh] outline-0">
              {Array.from({length: mesData?.message.length ?? 0},(_, index)=>index).map((i)=>(
                <div
                  style={{display: (mesData?.block[i] || userId !== mesData?.userID[i]) ? "block" : "none"}}
                  className={cn(
                    "flex items-center gap-1 rounded-full p-5 transition-colors bg-green-100",
                    (mesData?.userID[i]===userId)&&("bg-blue-500"),
                  )}
                  onContextMenu={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    e.preventDefault(); 
                    setMesIndex(i);
                    setOpen(true);
                  }}
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

          <Dialog open={open} onOpenChange={()=>{if(open) setOpen(false);}}>
            <DialogContent className="sm:max-w-[325px]">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Button onClick={pinAnnounce}>Set Announcement</Button>
                </div>
                <div 
                  style={{display: (mesData?.userID[mesIndex]===userId) ? "block" : "none"}}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Button onClick={deleteYourself}>Delete for Yourself</Button>
                </div>
                <div 
                  style={{display: (mesData?.userID[mesIndex]===userId) ? "block" : "none"}}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Button onClick={deleteEveryone}>Delete for Everyone</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
  );
}

export default DocOfPage;