import { BiError } from "react-icons/bi";
import Navbar from "./_components/Navbar";

function DocsPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  console.log(searchParams);
  return (
    <div className="flex-rows fixed top-0 flex h-screen w-full overflow-hidden">
      <nav className="flex w-2/5 flex-col overflow-y-scroll border-r bg-slate-100 pb-10">
        <Navbar />
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
