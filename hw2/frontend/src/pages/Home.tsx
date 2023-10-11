import { useEffect, useState } from "react";

import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

import CardList from "@/components/CardList";
import NewListDialog from "@/components/NewListDialog";
import useCards from "@/hooks/useCards";
import Typography from "@mui/material/Typography";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



const Home=() => {
    const { lists, fetchLists, fetchCards } = useCards();
    const [newListDialogOpen, setNewListDialogOpen] = useState(false);

    useEffect(() => {
        fetchLists();
        fetchCards();
    }, [fetchCards, fetchLists]);

    const [hide, setHide] = useState(false);
    function handleHide() {
        setHide(!hide);
    }
  
    return (
        <>
            <main className="mx-auto flex max-h-full flex-row gap-6 px-24 py-12">
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    My Playlists
                </Typography>
                <div>
                    <Button
                        variant="contained"
                        className="w-80"
                        onClick={() => setNewListDialogOpen(true)}
                    >
                        <AddIcon className="mr-2" />
                        Add
                    </Button>
                </div>
                <div>
                    <Button
                        variant="contained"
                        className="w-80"
                        onClick={handleHide}
                    >
                        <a style={{display: hide?"block":"none"}}>Done</a>
                        <a style={{display: !hide?"block":"none"}}>Delete</a>
                    </Button>
                </div>
                <NewListDialog
                    open={newListDialogOpen}
                    onClose={() => setNewListDialogOpen(false)}
                />
            </main>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
            <TextField id="standard-basic" label="Search" variant="standard" />
            </Box>
            <div className="mx-auto flex max-h-full flex-row  flex-wrap gap-6 px-24 py-12" >
                {lists.map((list) => (
                <CardList key={list.id} {...list}  hide={hide}/>
                ))}
            </div>
        </>
    );
}

export default Home;