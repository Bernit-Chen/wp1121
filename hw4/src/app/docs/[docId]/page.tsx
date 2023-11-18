import Navbar from "../_components/Navbar";
import DocOfPage from "../_components/DocOfPage";


function DocPage({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {

  return (
    <div className="flex-rows fixed top-0 flex h-screen w-full overflow-hidden">
      <nav className="flex w-2/5 flex-col overflow-y-scroll border-r bg-slate-100 pb-10">
        <Navbar searchContent={searchParams.search ? searchParams.search :""}/>
      </nav>
      <div className="w-full overflow-y-scroll">
        <DocOfPage />
      </div>
    </div>
  );
}

export default DocPage;
