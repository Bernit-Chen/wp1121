import { eq } from "drizzle-orm";

import { db } from "@/db";
import { documentsTable, usersToDocumentsTable } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { publicEnv } from "@/lib/env/public";

export const createDocument = async (userId: string) => {
  "use server";
  

  const newDocId = await db.transaction(async (tx) => {
    const [newDoc] = await tx
      .insert(documentsTable)
      .values({
        title: userId,
        content: "This is a new document",
        mesData: JSON.stringify({message: [], userID: [], block: [], creatTime: [], announceOfTime: 0})
      })
      .returning();
    await tx.insert(usersToDocumentsTable).values({
      userId: userId,
      documentId: newDoc.displayId,
    });
    return newDoc.displayId;
  });
  return newDocId;
};

export const getDocuments = async (userId: string) => {
  "use server";

  const documents = await db.query.usersToDocumentsTable.findMany({
    where: eq(usersToDocumentsTable.userId, userId),
    with: {
      document: {
        columns: {
          displayId: true,
          title: true,
          mesData: true
        },
      },
    },
  });
  const newD = documents;
  newD.sort(function(a,b){
    if(!b.document.mesData) return -1;
    return (JSON.parse(b.document.mesData).creatTime[JSON.parse(b.document.mesData).creatTime.length-1] - JSON.parse(a.document.mesData).creatTime[JSON.parse(a.document.mesData).creatTime.length-1]); // sort by latestmessage的createdAt
  })
  // revalidatePath(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${docId}`);
  return newD;
};

export const deleteDocument = async (documentId: string) => {
  "use server";
  console.log("[deleteDocument]");
  await db
    .delete(documentsTable)
    .where(eq(documentsTable.displayId, documentId));
  return;
};
