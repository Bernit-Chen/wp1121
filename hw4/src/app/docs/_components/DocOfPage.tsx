"use client";

import { Input } from "@/components/ui/input";
import { useDocument } from "@/hooks/useDocument";
import React, {useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils/shadcn";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";


function DocOfPage() {
  const { title, mesData, setContent, mesDataObj, document, setDocument } = useDocument();
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
      message: [...JSON.parse(document.mesData).message],
      userID: [...JSON.parse(document.mesData).userID],
      block: [...JSON.parse(document.mesData).block],
      creatTime: [...JSON.parse(document.mesData).creatTime],
      announceOfTime: JSON.parse(document.mesData).creatTime[mesIndex],
    };
    try{
      setDocument({
        ...document,
        mesData: JSON.stringify(newMesData)
      });
      setOpen(false);
    } catch (e) {
      alert("Error Pin message")
    }
  }

  const deleteYourself = ()=>{
    if(!mesData) return;
    if (document === null) return;
    const newBlock = JSON.parse(mesData).block;
    newBlock[mesIndex] = false;
    const newMesData ={
      message: [...JSON.parse(document.mesData).message],
      userID: [...JSON.parse(document.mesData).userID],
      block: newBlock,
      creatTime: [...JSON.parse(document.mesData).creatTime],
      announceOfTime: JSON.parse(document.mesData).announceOfTime
    };
    try{
      setDocument({
        ...document,
        mesData:JSON.stringify(newMesData)
      });
      setOpen(false);
    } catch (e) {
      alert("Error delete message")
    }
  }

  const deleteEveryone = ()=>{
    if(!mesData) return;
    if (document === null) return;
  
    mesDataObj.message.splice(mesIndex,1)
    mesDataObj.userID.splice(mesIndex,1)
    mesDataObj.block.splice(mesIndex,1)
    mesDataObj.creatTime.splice(mesIndex,1)
    console.log(mesDataObj)
    const newMesData ={
      message: mesDataObj.message,
      userID: mesDataObj.userID,
      block: mesDataObj.block,
      creatTime: mesDataObj.creatTime,
      announceOfTime: (mesDataObj.announceOfTime===mesDataObj.creatTime[mesIndex]) ? 0:mesDataObj.announceOfTime
    };
    console.log(newMesData)
    try{
      setDocument({
        ...document,
        mesData:JSON.stringify(newMesData)
      });
      setOpen(false);
    } catch (e) {
      alert("Error delete message")
    }
  }
  
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const userName = session?.user?.email;
  const parsed = JSON.parse(document?.mesData ?? '{"message":""}');

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToBottom()
  }, [parsed.message]);
// }, [JSON.parse(document?.mesData ?? '{"message":""}').message]);

  function urlify(text:string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex)
       .map(part => {
          if(part.match(urlRegex)) {
             return <a href={part} key={Date.now()} rel="noreferrer" target="_blank">{part}</a>;
          }
          return part;
       });
  }
  return (
        <div className="w-full">
          <div className="fixed px-10 py-4 text-xl font-semibold text-slate-700 outline-0 bg-blue-100">
            {title && (JSON.parse(title).title1 === userName ? JSON.parse(title).title2:JSON.parse(title).title1)}
          </div>
          <div 
              style={{display: (mesDataObj.announceOfTime!==0) ? "block" : "none"}}
              className="fixed rounded-lg px-2 py-1 text-slate-700 outline-0 bg-yellow-100"
            >
              {document && document.mesData && mesDataObj.message[mesDataObj.creatTime.indexOf(mesDataObj.announceOfTime)]}
          </div>
          <nav className="sticky top-0 flex w-full justify-between p-2 shadow-sm">
            {/* <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Document Title"
              className="rounded-lg px-2 py-1 text-slate-700 outline-0 focus:bg-slate-100"
            /> */}
          </nav>
          
          <section className="w-full px-4 py-4">
            <div className="outline-0 grid justify-items-stretch w-full">
              {Array.from({length: mesDataObj.message ? (mesDataObj?.message.length ?? 0) : 0},(_, index)=>index).map((i)=>(
                <div
                  key={i}
                  style={{display: (mesDataObj?.block[i] || userId !== mesDataObj?.userID[i]) ? "block" : "none"}}
                  className={cn(
                    "flex items-center gap-1 rounded-full p-5 transition-colors justify-self-end bg-blue-400",
                    (mesDataObj?.userID[i]!==userId)&&  ("justify-self-start bg-green-100"),
                  )}
                  onContextMenu={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    e.preventDefault(); 
                    setMesIndex(i);
                    setOpen(true);
                  }}
                >
                  {urlify(mesDataObj?.message[i])}
                </div>
              ))}
              <div ref={messagesEndRef} />
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
            className="sticky bottom-0 w-full fixed bg-gray-100"
          />

          <Dialog open={open} onOpenChange={()=>{if(open) setOpen(false);}}>
            <DialogContent className="sm:max-w-[325px]">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Button onClick={pinAnnounce}>Set Announcement</Button>
                </div>
                <div 
                  style={{display: mesDataObj?.userID && (mesDataObj?.userID[mesIndex]===userId) ? "block" : "none"}}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Button onClick={deleteYourself}>Delete for Yourself</Button>
                </div>
                <div 
                  style={{display: mesDataObj?.userID && (mesDataObj?.userID[mesIndex]===userId) ? "block" : "none"}}
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