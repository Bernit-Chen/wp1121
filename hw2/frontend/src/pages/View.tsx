import { useEffect, useState } from "react";

import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

import CardList from "@/components/CardList";
import A from '@/components/music.jpg';
import NewListDialog from "@/components/NewListDialog";
import useCards from "@/hooks/useCards";
import Typography from "@mui/material/Typography";
import { useLocation } from 'react-router-dom'

const View=() => {
    const { lists, fetchLists, fetchCards } = useCards();
    const [newListDialogOpen, setNewListDialogOpen] = useState(false);

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

    return (
        <>
            <div className="mx-auto flex flex-start max-h-full px-24 py-12">
                <img src={A} alt='music' width={'200px'}/>
                <div className="mx-auto max-h-full gap-6 px-24 py-1">
                    <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                        {lists[i].name}
                    </Typography>
                    <br/>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        {lists[i].introduction}
                    </Typography>
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
                        <AddIcon className="mr-2" />
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