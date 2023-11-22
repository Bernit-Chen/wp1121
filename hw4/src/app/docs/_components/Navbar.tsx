import { AiFillDelete, AiFillFileText } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import SearchBar from "./new";
import SearchCreat from "./SearchCreat";
import {  deleteDocument, getDocuments } from "./actions";

type Props = {
  searchContent: string;
};

async function Navbar({ searchContent }: Props) {

  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;
  const userName = session.user.email;
  const documents = await getDocuments(userId);

  return (
    <nav className="flex w-full flex-col overflow-y-scroll bg-slate-100 pb-10">
      <nav className="sticky top-0 flex flex-col items-center justify-between border-b bg-slate-100 pb-2">
        <div className="flex w-full items-center justify-between px-3 py-1">
          <div className="flex items-center gap-2">
            <RxAvatar />
            <h1 className="text-sm font-semibold">
              {session?.user?.username ?? "User"}
            </h1>
          </div>
          <Link href={`/auth/signout`}>
            <Button
              variant={"ghost"}
              type={"submit"}
              className="hover:bg-slate-200"
            >
              Sign Out
            </Button>
          </Link>
        </div>

        {/* <form
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
            <AiFillFileAdd size={16} />
            <p>Create Document</p>
          </button>
        </form> */}
        <div>
          <SearchBar/>
          <SearchCreat  existed={documents.filter((doc) => ((
          (JSON.parse(doc.document.title[0]==="{" ? doc.document.title : '{"title1":"","title2":""}')).title1 === userName) ? 
            (JSON.parse(doc.document.title[0] === "{" ? doc.document.title : '{"title1":"","title2":""}').title2) : 
            (JSON.parse(doc.document.title[0] === "{" ? doc.document.title : '{"title1":"","title2":""}').title1)) === searchContent).length >= 1} searchContent={searchContent}/>
        </div>
        </nav>
        {documents.filter((doc) => ((
          (JSON.parse(doc.document.title[0]==="{" ? doc.document.title : '{"title1":"","title2":""}')).title1 === userName) ? 
            (JSON.parse(doc.document.title[0] === "{" ? doc.document.title : '{"title1":"","title2":""}').title2) : 
            (JSON.parse(doc.document.title[0] === "{" ? doc.document.title : '{"title1":"","title2":""}').title1)) === searchContent).length >= 1 && 
          <div className="mt-4 w-full rounded-xl text-sm text-slate-500 text-center"> 
            <p>聊天室已存在</p>
          </div>
        }
        {documents.filter((doc) => ((
          (JSON.parse(doc.document.title[0]==="{" ? doc.document.title : '{"title1":"","title2":""}')).title1 === userName) ? 
            (JSON.parse(doc.document.title[0] === "{" ? doc.document.title : '{"title1":"","title2":""}').title2) : 
            (JSON.parse(doc.document.title[0] === "{" ? doc.document.title : '{"title1":"","title2":""}').title1)) === searchContent).length === 0 && 
          <div className="mt-4 w-full rounded-xl text-sm text-slate-500 text-center"> 
            <p>是否新增聊天室？</p>
          </div>
        }
      <section className="flex w-full flex-col pt-3">
        {documents.map((doc, i) => {
          return (
            <div
              style={{display: (JSON.parse(doc.document.title).title1 === userName ? JSON.parse(doc.document.title).title2.includes(searchContent):JSON.parse(doc.document.title).title1.includes(searchContent)) ? "block":"none"}}
              key={i}
              className="group flex w-full cursor-pointer items-center justify-between gap-2 text-slate-400 hover:bg-slate-200 "
            >
              <Link
                className="grow px-3 py-1"
                href={`/docs/${doc.document.displayId}`}
              >
                <div className="items-center gap-2">
                  <AiFillFileText />
                  <div className="text-sm font-light ">
                    {JSON.parse(doc.document.title).title1 === userName ? JSON.parse(doc.document.title).title2:JSON.parse(doc.document.title).title1}
                  </div>
                  <div className="text-sm font-light ">
                    {JSON.parse(doc.document.mesData).message[JSON.parse(doc.document.mesData).message.length-1]}
                  </div>
                </div>
              </Link>
              <form
                className="hidden px-2 text-slate-400 hover:text-red-400 group-hover:flex"
                action={async () => {
                  "use server";
                  const docId = doc.document.displayId;
                  await deleteDocument(docId);
                  revalidatePath("/docs");
                  redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs`);
                }}
              >
                <button type={"submit"}>
                  <AiFillDelete size={16} />
                </button>
              </form>
            </div>
          );
        })}
      </section>

      {/* {documents.filter((doc) => (((JSON.parse(doc.document.title[0] === "{" ? doc.document.title : '{"user":["",""]}').user[0]) === username) ? (JSON.parse(doc.document.title[0] === "{" ? doc.document.title : '{"user":["",""]}').user[1]) : (JSON.parse(doc.document.title[0] === "{" ? doc.document.title : '{"user":["",""]}').user[0])).includes(searchText)).length === 0 && searchText && searchText !== "" && <form
          className="hover:bg-slate-200 w-full rounded-xl"
          action={async () => {
            "use server";
            if (searchContent === userName) {
              console.log("cannot chat with yourself");
              return;
            }
            const email = searchContent;
                if (!email) return;
                if (typeof email !== "string") return;
                const [user] = await db
                  .select({
                    displayId: usersTable.displayId,
                  })
                  .from(usersTable)
                  .where(eq(usersTable.email, email));
            if (!user) {
              console.log("user undefined")
              return;
            }

            const newDocId = await createDocument(userId,userEmail,user.displayId,email);
            if (!newDocId) {
              console.log("newDocId undefined")
              return;
            }
            revalidatePath("/docs");
            redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${newDocId}`);
          }}
        > 
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3 py-1 text-left text-sm text-slate-500"
          >
            <p>是否新增聊天室？</p>
            <p>Chat with {searchContent}</p>
          </button>
        </form>} */}
    </nav>
  );
}

export default Navbar;
