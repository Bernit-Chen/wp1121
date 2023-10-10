import { useState } from "react";

import { Delete as DeleteIcon } from "@mui/icons-material";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Card from "./Card";
import useCards from "@/hooks/useCards";
import { createCard, deleteCard, updateCard } from "@/utils/client";
import CardProps from "./Card";

type EditSongDialogProps = {
  open: boolean;
  onClose: () => void;
  listId: string;
  allchecked:boolean;
  setAllchecked:(value: React.SetStateAction<boolean>) => void;
  deletedsong:string[];
  setDeletedsong:(value: React.SetStateAction<string[]>) => void;
  songhide:boolean;
  setSonghide:(value: React.SetStateAction<boolean>) => void;
  message: string;
};

export default function SongDialog(props: EditSongDialogProps) {
  const { open, onClose, listId, allchecked, setAllchecked, deletedsong, setDeletedsong, songhide, setSonghide,message} = props;
  const { lists, fetchCards } = useCards();
  const [ candelete, setCandelete ] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleDelete = async () => {
    console.log(deletedsong);
    if (deletedsong.length===0) {
      setCandelete(true);
      return;
    }
    for(let jj=0; jj<lists.length; jj++) {
      const j = lists[jj];
      for(let ii=0; ii<j.cards.length; ii++) {
        const i = j.cards[ii];
        if(deletedsong.includes(i.id)){
          await deleteOneCard(i.id)
        }
      }
    }
    setAllchecked(false);
    handleClose();
  };

  const deleteOneCard = async(del_id:string): Promise<boolean> => {
    try {
      await deleteCard(del_id);
      fetchCards();
      console.log("delete "+del_id);
      return true;
    } catch (error) {
      alert("Error: Failed to delete card");
      return false;
    }
  }
  
  if(deletedsong.length===0){
    setSonghide(true);
  }
  else{
    setSonghide(false);
  }


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent className="w-[600px]">
        <a style={{display: songhide?"block":"none"}}>Please Click Song</a>
        <a style={{display: !songhide?"block":"none"}}>
          <div className="flex flex-col gap-4" style={{ whiteSpace: 'pre-wrap' }}>
            {message}
          </div>
          <br/>
          Are you sure to delete?
        </a>
        <DialogActions>
          <Button style={{display: !songhide?"block":"none"}} onClick={handleDelete}>Confirm</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
