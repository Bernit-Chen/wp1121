import React from "react";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { auth } from "@/lib/auth";
import { createDocument } from "./actions";
import { Button } from "@/components/ui/button";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Props = {
    searchContent: string;
    existed: boolean;
  };

async function SearchCreat({ searchContent, existed }: Props){

    const session = await auth();
    if (!session || !session?.user?.id) {
        redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
    }
    const userId = session.user.id;
    const userEmail = session.user.email;
    // const authors = await getDocumentAuthors(docId);

    return(
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Create Room</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>DO you want to add the Chat Room with {searchContent} ?</DialogTitle>
            <DialogDescription>ADD the room with {searchContent} .</DialogDescription>
          </DialogHeader>
            <form
              className="w-full hover:bg-slate-200"
              action={async () => {
                "use server";
                if(existed) return;
                const email = searchContent;
                if (!email) return;
                if (typeof email !== "string") return;
                const [user] = await db
                  .select({
                    displayId: usersTable.displayId,
                  })
                  .from(usersTable)
                  .where(eq(usersTable.email, email));
                if (!user) return;
                
                const newDocId = await createDocument(userId,userEmail,user.displayId,email);
                
                redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${newDocId}`);
              }}
            >
              <Button type="submit">Add</Button>
            </form>
        </DialogContent>
      </Dialog>
    );
}

export default SearchCreat;
