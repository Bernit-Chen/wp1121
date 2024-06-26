import { useState } from "react";

import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import useCards from "@/hooks/useCards";
import { createCard,  updateCard } from "@/utils/client";



type NewCardDialogProps = {
  variant: "new";
  open: boolean;
  onClose: () => void;
  listId: string;
  allchecked:boolean;
  setAllchecked:(value: React.SetStateAction<boolean>) => void;
  deletedsong: string[];
  setDeletedsong:(value: React.SetStateAction<string[]>) => void;
};

type EditCardDialogProps = {
  variant: "edit";
  open: boolean;
  onClose: () => void;
  listId: string;
  cardId: string;
  title: string;
  description: string;
  song_link: string;
  allchecked:boolean;
  setAllchecked:(value: React.SetStateAction<boolean>) => void;
  deletedsong: string[];
  setDeletedsong:(value: React.SetStateAction<string[]>) => void;
};

type CardDialogProps = NewCardDialogProps | EditCardDialogProps;

export default function CardDialog(props: CardDialogProps) {
  const { variant, open, onClose, listId,setAllchecked, setDeletedsong} = props;
  const title = variant === "edit" ? props.title : "";
  const description = variant === "edit" ? props.description : "";
  const song_link = variant === "edit" ? props.song_link : "";

  const [editingTitle, setEditingTitle] = useState(variant === "new");
  const [editingDescription, setEditingDescription] = useState(variant === "new",);
  const [editingSongLink, setEditingSongLink] = useState(variant === "new",);


  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
 
  const [newSongLink, setNewSongLink] = useState(song_link);
  const [addNewSong, setAddNewSong] = useState(listId);

  const { lists, fetchCards } = useCards();

  const handleClose = () => {
      setNewTitle(title);
      setNewDescription(description);
      setNewSongLink(song_link);
    onClose();
  };

  const newhandleClose = () => {
  onClose();
};

  const handleSave = async () => {
    
    if(newTitle==='' ||newDescription===''||addNewSong===''||newSongLink===''){
        alert("Please Enter song information");
        return;
    }
    let c:boolean;
    c=false;
    for (let k = 0; k < lists.length; k++) {
      for (let z=0; z<lists[k].cards.length;z++){
        if(lists[k].cards[z].title===newTitle && variant === "new"){
          alert("Please Enter another song name");
          c=true;
          return;
        } 
        if(lists[k].cards[z].title===newTitle && variant === "edit" && newTitle!==title){
          alert("Please Enter another song name");
          c=true;
          return;
        } 
      }
    }
    if(c) return;
    try {
      if (variant === "new") {
        
        await createCard({
          title: newTitle,
          description: newDescription,
          list_id: addNewSong,
          song_link: newSongLink,
        });
        if(addNewSong!==listId){
          await createCard({
            title: newTitle,
            description: newDescription,
            list_id: listId,
            song_link: newSongLink,
          });
        }
        setNewTitle("");
        setNewDescription('');
        setNewSongLink('');
      } else {
        if (
          newTitle === title &&
          newDescription === description &&
          addNewSong === listId &&
          newSongLink === song_link
        ) {
          return;
        }
        else if(addNewSong===listId){
          await updateCard(props.cardId, {
            title: newTitle,
            description: newDescription,
            list_id: listId,
            song_link: newSongLink,
          });
          
        }
        else{
          await createCard({
            title: newTitle,
            description: newDescription,
            list_id: addNewSong,
            song_link: newSongLink,
          });
        }
        
      }
      setAllchecked(false);
      setDeletedsong([]);
      fetchCards();
      
    } 
    catch(e) {
      alert("something goes wrong");
    }
    finally {
      newhandleClose();
    }
  };

  

  return (
    <Dialog  className="break-all" open={open} onClose={handleClose}>
      <DialogTitle className="break-all flex flex-wrap text-wrap gap-4">
        {editingTitle ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEditingTitle(false);
              }
            }}
          >
            <Input
              autoFocus
              defaultValue={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="grow break-all "
              placeholder="Enter the Name for this song"
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEditingTitle(true)}
            className="break-all w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="break-all ">Song : {newTitle}</Typography>
          </button>
        )}
      </DialogTitle>
      <DialogContent className="break-all flex flex-wrap text-wrap gap-4">
        {editingDescription ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEditingDescription(false);
              }
            }}
          >
            <textarea
              className="grow break-all bg-white/0 p-2"
              autoFocus
              defaultValue={newDescription}
              placeholder="Enter the singer for this song"
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEditingDescription(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="break-all">Singer : {newDescription}</Typography>
          </button>
        )}
        {editingSongLink ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEditingSongLink(false);
              }
            }}
          >
            <textarea
              className="break-all bg-white/0 p-2"
              autoFocus
              defaultValue={newSongLink}
              placeholder="Enter a link for this song"
              onChange={(e) => setNewSongLink(e.target.value)}
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEditingSongLink(true)}
            className="break-all w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="break-all">Link : {newSongLink}</Typography>
          </button>
        )}
        <h1><br/>Add to other list :<br/></h1>
        <Select
          className="break-all w-full"
          value={addNewSong}
          label="Playlist"
          onChange={(e) =>{
            setAddNewSong(e.target.value);
            
          }}
        >
          {lists.map((list) => (
            <MenuItem className="break-all w-full" value={list.id} key={list.id}>
              {list.name}
            </MenuItem>
          ))}
        </Select>

        <DialogActions>
          <Button onClick={handleSave}>save</Button>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
