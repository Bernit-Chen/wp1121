import { useEffect, useState } from "react";

import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

import CardList from "@/components/CardList";
import Card from "@/components/Card";
import type { CardListProps } from "@/components/CardList";
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

    return (
        <>
            <main className="mx-auto flex max-h-full flex-row gap-6 px-24 py-12">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {key_id}
                </Typography>
                <div>
                </div>
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
            </main>
            <div className="mx-auto flex max-h-full flex-row gap-6 px-24 py-12">
                {lists.map((list) => (
                <CardList key={list.id} {...list} />
                ))}
            </div>
        </>
    );
}

export default View;