import Navbar from "../_components/Navbar";
import DocOfPage from "../_components/DocOfPage";


function DocPage() {

  return (
    <div className="flex-rows fixed top-0 flex h-screen w-full overflow-hidden">
      <nav className="flex w-2/5 flex-col overflow-y-scroll border-r bg-slate-100 pb-10">
        <Navbar />
      </nav>
      <div className="w-full overflow-y-scroll">
        <DocOfPage />
      </div>
    </div>
  );
}

export default DocPage;
