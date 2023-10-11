import { useState } from "react";


import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";


import useCards from "@/hooks/useCards";
import {  deleteCard } from "@/utils/client";


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
  const { open, onClose, setAllchecked, deletedsong, songhide, setSonghide,message} = props;
  const { lists, fetchCards } = useCards();
  const [ candelete, setCandelete ] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleDelete = async () => {
    if (deletedsong.length===0) {
      setCandelete(candelete);
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
    <Dialog className="break-all"open={open} onClose={handleClose}>
      <DialogContent className="break-all">
        <a className="break-all" style={{display: songhide?"block":"none"}}>Please Click Song</a>
        <a className="break-all" style={{display: !songhide?"block":"none"}}>
          <div className="flex break-all flex-col gap-4" style={{ whiteSpace: 'pre-wrap' }}>
            {message}
          </div>
          <br/>
          <div className="break-all">Are you sure to delete?</div>
        </a>
        <DialogActions className="break-all">
          <Button className="flex wrabreak-all" style={{display: !songhide?"block":"none"}} onClick={handleDelete}>Confirm</Button>
          <Button className="break-all" onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
