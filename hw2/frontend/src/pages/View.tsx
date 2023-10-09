import { useEffect, useState, useRef } from "react";

import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

import CardList from "@/components/CardList";
import A from '@/components/music.jpg';
import NewListDialog from "@/components/NewListDialog";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import useCards from "@/hooks/useCards";
import Typography from "@mui/material/Typography";
import { useLocation } from 'react-router-dom';
import { updateList } from "@/utils/client";

const View=() => {
    const { lists, fetchLists, fetchCards } = useCards();
    const [newListDialogOpen, setNewListDialogOpen] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [editingIntroduction, setEditingIntroduction] = useState(false);
    const inputRef1 = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null);

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
            <div className="mx-auto flex flex-start max-h-full px-24 py-12">
                <img src={A} alt='music' width={'200px'}/>
                <div className="mx-auto max-h-full gap-6 px-24 py-1">
                    <div className="flex gap-4">
                        {editingName ? (
                            <ClickAwayListener onClickAway={handleUpdateName}>
                                <Input
                                    autoFocus
                                    defaultValue={lists[i].name}
                                    className="grow"
                                    placeholder="Enter a new name for this list..."
                                    sx={{ fontSize: "2rem" }}
                                    inputRef={inputRef1}
                                />
                            </ClickAwayListener>
                        ) : (
                            <button
                                onClick={() => setEditingName(true)}
                                className="w-full rounded-md p-2 hover:bg-white/10"
                            >
                                <Typography className="text-start" variant="h4">
                                    {lists[i].name}
                                </Typography>
                            </button>
                        )}
                    </div>
                    <div className="flex gap-4">
                        {editingIntroduction ? (
                            <ClickAwayListener onClickAway={handleUpdateIntroduction}>
                                <Input
                                    autoFocus
                                    defaultValue={lists[i].introduction}
                                    className="grow"
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
                                <Typography className="text-start" variant="h5">
                                    {lists[i].introduction}
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
                        className="w-80"
                        onClick={() => setNewListDialogOpen(true)}
                    >
                        <AddIcon className="mr-2" />
                        Add Song
                    </Button>
                </div>
                <div>
                    <Button
                        variant="contained"
                        className="w-80"
                        onClick={() => setNewListDialogOpen(true)}
                    >
                        Delete Song
                    </Button>
                </div>
                <NewListDialog
                    open={newListDialogOpen}
                    onClose={() => setNewListDialogOpen(false)}
                />
            </div>







            
            <CardList key={lists[i].id} {...lists[i]} hide={false}/>
        </>
    );
}

export default View;