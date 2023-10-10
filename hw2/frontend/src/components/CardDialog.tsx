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

import useCards from "@/hooks/useCards";
import { createCard, deleteCard, updateCard } from "@/utils/client";

// this pattern is called discriminated type unions
// you can read more about it here: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions
// or see it in action: https://www.typescriptlang.org/play#example/discriminate-types
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
  const { variant, open, onClose, listId,allchecked,setAllchecked,deletedsong , setDeletedsong} = props;
  const title = variant === "edit" ? props.title : "";
  const description = variant === "edit" ? props.description : "";
  const song_link = variant === "edit" ? props.song_link : "";

  const [editingTitle, setEditingTitle] = useState(variant === "new");
  const [editingDescription, setEditingDescription] = useState(variant === "new",);
  const [editingSongLink, setEditingSongLink] = useState(variant === "new",);


  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newListId, setNewListId] = useState(listId);
  const [newSongLink, setNewSongLink] = useState(song_link);
  const [addNewSong, setAddNewSong] = useState(listId);

  const { lists, fetchCards } = useCards();

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    try {
      if (variant === "new") {
        console.log(newTitle,newDescription,listId,newSongLink);
        await createCard({
          title: newTitle,
          description: newDescription,
          list_id: listId,
          song_link: newSongLink,
        });
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
    catch (error) {
      alert("Error: Failed to save card");
    } finally {
      handleClose();
    }
  };

  const handleDelete = async () => {
    if (variant !== "edit") {
      return;
    }
    try {
      await deleteCard(props.cardId);
      fetchCards();
    } catch (error) {
      alert("Error: Failed to delete card");
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="flex gap-4">
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
              defaultValue={title}
              onChange={(e) => setNewTitle(e.target.value)}
              className="grow"
              placeholder="Enter the Name for this song"
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEditingTitle(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">Song : {newTitle}</Typography>
          </button>
        )}
        {variant === "edit" && (
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent className="w-[600px]">
        {editingDescription ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEditingDescription(false);
              }
            }}
          >
            <textarea
              className="bg-white/0 p-2"
              autoFocus
              defaultValue={description}
              placeholder="Enter the singer for this song"
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEditingDescription(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">Singer : {newDescription}</Typography>
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
              className="bg-white/0 p-2"
              autoFocus
              defaultValue={song_link}
              placeholder="Enter a link for this song"
              onChange={(e) => setNewSongLink(e.target.value)}
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEditingSongLink(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">Link : {newSongLink}</Typography>
          </button>
        )}
        <h1><br/>Add to other list :<br/></h1>
        <Select
          value={addNewSong}
          label="Playlist"
          onChange={(e) =>{
            setAddNewSong(e.target.value);
            console.log(addNewSong)
          }}
        >
          {lists.map((list) => (
            <MenuItem value={list.id} key={list.id}>
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
