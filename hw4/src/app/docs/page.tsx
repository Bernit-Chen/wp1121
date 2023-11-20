import { BiError } from "react-icons/bi";
import Navbar from "./_components/Navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDocuments } from "./_components/actions";
import { publicEnv } from "@/lib/env/public";


async function DocsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  const _auth = await auth();
  if (!_auth || !_auth.user?.id) redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  const _userID = _auth.user.id;
  const _documents = await getDocuments(_userID);
  const _documentID = _documents[0].document.displayId;
  if (_documents) redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/docs/${_documentID}`);



  return (
    <div className="flex-rows fixed top-0 flex h-screen w-full overflow-hidden">
      <nav className="flex w-2/5 flex-col overflow-y-scroll border-r bg-slate-100 pb-10">
        <Navbar searchContent={searchParams.search ? searchParams.search :""} />
      </nav>
      <div className="w-full overflow-y-scroll">
        <div className="flex h-[90vh] w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <BiError className="text-yellow-500" size={80} />
            <p className="text-sm font-semibold text-slate-700">
              Please select a document to edit
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
export default DocsPage;
