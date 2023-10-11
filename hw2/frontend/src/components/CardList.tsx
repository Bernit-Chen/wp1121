import { useRef, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import useCards from "@/hooks/useCards";
import { deleteList, updateList } from "@/utils/client";

import Card from "./Card";
import type { CardProps } from "./Card";
import CardDialog from "./CardDialog";
import A from './music.jpg';
import {Link} from "react-router-dom";

export type CardListProps = {
  id: string;
  name: string;
  cards: CardProps[];
  introduction: string;
};

export default function CardList({ id, name, cards, introduction, hide }: {
  id: string;
  name: string;
  cards: CardProps[];
  introduction: string;
  hide: boolean;
}) {
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingIntroduction, setEditingIntroduction] = useState(false);
  const { lists,fetchLists } = useCards();
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  const handleUpdateName = async () => {
    if (!inputRef1.current) return;
    const newName = inputRef1.current.value;
    if(newName===''){
      alert("Please Enter playlist name");
      return;
    }
    let c:boolean;
    c=false;
    for (let i = 0; i < lists.length; i++) {
      if(lists[i].name===newName && newName!==name){
        alert("Please Enter another playlist name");
        c=true;
        return;
      } 
    }
    if(c) return;
    console.log("yes")
    if (newName !== name) {
      try {
        await updateList(id, { name: newName });
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
    if (newIntroduction !== introduction) {
      try {
        await updateList(id, { introduction: newIntroduction });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setEditingIntroduction(false);
  };

  const handleDelete = async () => {
    try {
      await deleteList(id);
      fetchLists();
    } catch (error) {
      alert("Error: Failed to delete list");
    }
  };

  return (
    <>
      <Paper className="w-80 p-6">
        <div className="flex gap-24">
          <Link to="/View" state={{key_id:id}}>
            <img src={A} alt='music' width={'150px'}/>
          </Link>
          <a style={{display: hide?"block":"none"}}>
                <IconButton color="error" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
          </a>
        </div>
        <a style={{display: hide?"block":"none"}}></a>
        <div  className="break-all p-2">{cards.length} songs</div>
        
        <div className="flex gap-4">
          {editingName ? (
            <ClickAwayListener onClickAway={handleUpdateName}>
              <Input
                autoFocus
                defaultValue={name}
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
              
              <Typography className="break-all text-start" variant="h4">
                {name}
              </Typography>
            </button>
          )}
        </div>
      
        <div className="flex gap-4">
          {editingIntroduction ? (
            <ClickAwayListener onClickAway={handleUpdateIntroduction}>
              <Input
                autoFocus
                defaultValue={introduction}
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
              <Typography className="break-all text-start" variant="h6">
                {introduction}
              </Typography>
            </button>
          )}
        </div>
      </Paper>
    </>
  );
}
