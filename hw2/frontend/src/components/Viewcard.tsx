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
import Checkbox from '@mui/material/Checkbox';

// import vCard from "./vCard";
import Card from "./Card";
import type { CardProps } from "./Card";
import CardDialog from "./CardDialog";
import A from './music.jpg';
import {Link} from "react-router-dom";
import React from "react";

export default function Viewcard({ id, name, cards, introduction, hide, allchecked, setAllchecked, deletedsong ,setDeletedsong }: {
  id: string;
  name: string;
  cards: CardProps[];
  introduction: string;
  hide: boolean;
  allchecked:boolean;
  setAllchecked:(value: React.SetStateAction<boolean>) => void;
  deletedsong: string[];
  setDeletedsong:(value: React.SetStateAction<string[]>) => void;
}) {
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingIntroduction, setEditingIntroduction] = useState(false);
  const { lists, fetchLists, fetchCards } = useCards();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteList(id);
      fetchLists();
    } catch (error) {
      alert("Error: Failed to delete list");
    }
  };

  const handleAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAllchecked(event.target.checked);
      console.log("checked");
      if (event.target.checked){
        let allCard:string[] = [];
        cards.forEach(j => {
          allCard.push(j.id);
          setDeletedsong(allCard);
        });
      }
      else{
        setDeletedsong([]);
      }
  };


  return (
    <>
      <Divider variant="middle" sx={{ mt: 1, mb: 2 }} />
        <div className="flex flex-wrap gap-4"> 
          <Checkbox
            checked={allchecked}
            onChange={handleAllChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <h5>Click All</h5>
        </div>
        <div className="flex flex-wrap flex-col gap-4">
          {cards.map((card) => (
            <>
              <Card key={card.id} {...card} allchecked={allchecked} setAllchecked={setAllchecked} deletedsong={deletedsong} setDeletedsong={setDeletedsong} />
            </>
          ))}
        </div>
      
    </>
  );
}
