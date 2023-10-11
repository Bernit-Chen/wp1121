import { useEffect, useState, useRef } from "react";

import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

import Viewcard from "@/components/Viewcard";
import A from '@/components/music.jpg';
import CardDialog from "@/components/CardDialog";
import SongDialog from "@/components/SongDialog";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import useCards from "@/hooks/useCards";
import Typography from "@mui/material/Typography";
import { useLocation } from 'react-router-dom';
import { updateList } from "@/utils/client";
import * as React from 'react';

const View=() => {
    const { lists, fetchLists, fetchCards } = useCards();
    const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
    const [deleteCardDialog, setDeleteNewCardDialog] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [editingIntroduction, setEditingIntroduction] = useState(false);
    const inputRef1 = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null);
    const [deletedsong, setDeletedsong] = useState<string[]>([]);
    const [allchecked, setAllchecked] = React.useState(false);
    const [songhide, setSonghide] = useState(false);
    const [message, setMessage] = useState("");


    useEffect(() => {
        fetchLists();
        fetchCards();
      }, [fetchCards, fetchLists]);
    
    const location = useLocation();
    const {key_id} = location.state;

    let i=-1;
    lists.forEach((list,j)=>{
        if(list.id===key_id) i=j;
    });

    const handleUpdateName = async () => {
        if (!inputRef1.current) return;
    
        const newName = inputRef1.current.value;
        if(newName===''){
            alert("Please Enter playlist name");
            return;
        }
        let c:boolean;
        c=false;
        for (let k = 0; k < lists.length; k++) {
            if(lists[k].name===newName && k!==i){
                alert("Please Enter another playlist name");
                c=true;
                return;
            } 
        }
        if(c) return;
        if (newName !== lists[i].name) {
          try {
            await updateList(lists[i].id, { name: newName });
            fetchLists();
          } catch (error) {
            alert("Error: Failed to update list name");
          }
        }
        setEditingName(false);
    };
    
    const handleUpdateIntroduction = async () => {
        if (!inputRef2.current) return;
    
        const newIntroduction = inputRef2.current.value;
        if(newIntroduction===''){
            alert("Please Enter playlist description");
            return;
        }
        console.log("yes2")
        if (newIntroduction !== lists[i].introduction) {
          try {
            await updateList(lists[i].id, { introduction: newIntroduction });
            fetchLists();
          } catch (error) {
            alert("Error: Failed to update list name");
          }
        }
        setEditingIntroduction(false);
      };
    
    return (
        <>
            <div className="mx-auto break-all flex flex-start max-h-full px-24 py-12">
                <img className="break-all" src={A} alt='music' width={'100px'}/>
                <div className="break-all mx-auto max-h-full gap-6 px-24 py-1">
                    <div className="break-all flex gap-4">
                        {editingName ? (
                            <ClickAwayListener onClickAway={handleUpdateName}>
                                <Input
                                    autoFocus
                                    defaultValue={lists[i].name}
                                    className="grow break-all"
                                    placeholder="Enter a new name for this list..."
                                    sx={{ fontSize: "2rem" }}
                                    inputRef={inputRef1}
                                />
                            </ClickAwayListener>
                        ) : (
                            <button
                                onClick={() => setEditingName(true)}
                                className="w-full break-all rounded-md p-2 hover:bg-white/10"
                            >
                                <Typography className="break-all" variant="h4">
                                    Name : {lists[i].name}
                                </Typography>
                            </button>
                        )}
                    </div>
                    <div className="break-all flex gap-4">
                        {editingIntroduction ? (
                            <ClickAwayListener onClickAway={handleUpdateIntroduction}>
                                <Input
                                    autoFocus
                                    defaultValue={lists[i].introduction}
                                    className="grow break-all"
                                    placeholder="Enter a description for this list..."
                                    sx={{ fontSize: "2rem" }}
                                    inputRef={inputRef2}
                                />
                            </ClickAwayListener>
                        ) : (
                            <button
                                onClick={() => setEditingIntroduction(true)}
                                className="w-full rounded-md p-2 hover:bg-white/10"
                            >
                                <Typography className="break-all" variant="h5">
                                    Description : {lists[i].introduction}
                                </Typography>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="mx-auto flex flex-end max-h-full gap-8 px-24 py-12">
                <div>
                    <Button
                        variant="contained"
                        onClick={() => setOpenNewCardDialog(true)}
                        >
                        <div className='break-all'> Add a Song</div>
                    </Button>
                </div>
                <div>
                    <Button
                        variant="contained"
                        onClick={() => {
                            let pre_message = ""
                            lists.forEach((list) => {
                                if(list.id === key_id) {
                                    list.cards.forEach((card) => {
                                        if(deletedsong.includes(card.id)) {
                                            pre_message += "Name : "+(card.title+"   Description : "+card.description+"   Link : "+card.song_link+"\n")
                                        }
                                    });
                                }
                            });
                            setMessage(pre_message);
                            setDeleteNewCardDialog(true)
                        }}
                    >
                        <div className='break-all'> Delete Song</div>
                    </Button>
                </div>
                <CardDialog
                    variant="new"
                    open={openNewCardDialog}
                    onClose={() => setOpenNewCardDialog(false)}
                    listId={key_id}
                    allchecked={allchecked} 
                    setAllchecked={setAllchecked}
                    deletedsong={deletedsong}
                    setDeletedsong={setDeletedsong}
                />
                <SongDialog
                    open={deleteCardDialog}
                    onClose={() => setDeleteNewCardDialog(false)}
                    listId={key_id}
                    allchecked={allchecked} 
                    setAllchecked={setAllchecked}
                    deletedsong={deletedsong}
                    setDeletedsong={setDeletedsong}
                    songhide={songhide}
                    setSonghide={setSonghide}
                    message={message}
                />
            </div>
            
            <Viewcard key={lists[i].id} {...lists[i]} hide={false}  allchecked={allchecked} setAllchecked={setAllchecked} deletedsong={deletedsong} setDeletedsong={setDeletedsong}/>
        </>
    );
}

export default View;