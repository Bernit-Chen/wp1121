import Divider from "@mui/material/Divider";

import Checkbox from '@mui/material/Checkbox';

// import vCard from "./vCard";
import Card from "./Card";
import type { CardProps } from "./Card";

import React from "react";

export default function Viewcard({ cards, allchecked, setAllchecked, deletedsong ,setDeletedsong }: {
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
  
  const handleAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAllchecked(event.target.checked);
      if (event.target.checked){
        const allCard:string[] = [];
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
        <div className="flex break-all flex-wrap flex-col gap-4">
          {cards.map((card) => (
            <>
              <Card key={card.id} {...card} allchecked={allchecked} setAllchecked={setAllchecked} deletedsong={deletedsong} setDeletedsong={setDeletedsong} />
            </>
          ))}
        </div>
      
    </>
  );
}
