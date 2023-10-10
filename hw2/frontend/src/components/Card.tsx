import { useState } from "react";
import { Paper } from "@mui/material";
import CardDialog from "./CardDialog";
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

export type CardProps = {
  id: string;
  title: string;
  description: string;
  listId: string;
  song_link: string;
};

export default function Card({ id, title, description, listId , song_link , allchecked, setAllchecked, deletedsong ,setDeletedsong }: {
  id: string;
  title: string;
  description: string;
  listId: string;
  song_link: string;
  allchecked:boolean;
  setAllchecked:(value: React.SetStateAction<boolean>) => void;
  deletedsong: string[];
  setDeletedsong:(value: React.SetStateAction<string[]>) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
      if (deletedsong.includes(id)){
        setDeletedsong(deletedsong.filter(function (letter) {
          return letter !== id;
        }))
        if(allchecked) {
          setAllchecked(false);
        }
      }
      else{
        setDeletedsong(deletedsong.concat([id]));
      }
      console.log(deletedsong);
  };

  return (
    <>
      <Paper className="flex w-full flex-wrap gap-6 p-2" elevation={6}>
        <Checkbox
          checked={deletedsong.includes(id)}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
          <div>somg : {title}</div>
          <div>singer : {description}</div>
          <div>link : {song_link}</div>
          <button onClick={handleClickOpen} className="text-start">
            Edit
          </button>
      </Paper>
      <CardDialog
        variant="edit"
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        description={description}
        listId={listId}
        song_link={song_link}
        cardId={id}
        allchecked={allchecked} 
        setAllchecked={setAllchecked}
        deletedsong={deletedsong}
        setDeletedsong={setDeletedsong}
      />
    </>
  );
}
