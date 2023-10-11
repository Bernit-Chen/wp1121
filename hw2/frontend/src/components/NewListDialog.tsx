import { useRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import useCards from "@/hooks/useCards";
import { createList } from "@/utils/client";

type NewListDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewListDialog({ open, onClose }: NewListDialogProps) {
  // using a ref to get the dom element is one way to get the value of a input
  // another way is to use a state variable and update it on change, which can be found in CardDialog.tsx
  const textfieldRef1 = useRef<HTMLInputElement>(null);
  const textfieldRef2 = useRef<HTMLInputElement>(null);
  const { lists,fetchLists } = useCards();

  const handleAddList = async () => {
    
    for (let k = 0; k < lists.length; k++) {
      if(lists[k].name===textfieldRef1.current?.value){
          alert("Please Enter another playlist name");
          onClose();
          return;
      } 
    }
    try {
      await createList({
        name: textfieldRef1.current?.value ?? "",
        introduction: textfieldRef2.current?.value ?? ""
      });
      fetchLists();
    } catch (error) {
      alert("Please Enter playlist information");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a playlist</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={textfieldRef1}
          label="playlist Name"
          variant="outlined"
          sx={{ mt: 2 }}
          autoFocus
        />
      </DialogContent>
      <DialogContent>
        <TextField
          inputRef={textfieldRef2}
          label="playlist Description"
          variant="outlined"
          sx={{ mt: 2 }}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddList}>add</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
