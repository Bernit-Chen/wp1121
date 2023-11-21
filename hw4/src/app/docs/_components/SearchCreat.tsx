import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { auth } from "@/lib/auth";
import { createDocument } from "./actions";

type Props = {
    searchContent: string;
  };

async function SearchCreat({ searchContent }: Props){

    const session = await auth();
    if (!session || !session?.user?.id) {
        redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
    }
    const userId = session.user.id;
    console.log("新"+searchContent)

    return(
        <form
          className="w-full hover:bg-slate-200"
          action={async () => {
            "use server";
            console.log("create document!")
            const newDocId = await createDocument(userId);
            revalidatePath("/docs");
            redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${newDocId}`);
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center gap-2 px-3 py-1 text-left text-sm text-slate-500"
          >
            <p>Create Room</p>
          </button>
        </form>
    );
}

export default SearchCreat;
