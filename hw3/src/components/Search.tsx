"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";



export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const username = searchParams.get("username");
    const handle = searchParams.get("handle");
    params.set("username", username!);
    params.set("handle", handle!);
    params.set("search", (e.target.value) ? e.target.value:"");
    router.push(`${pathname}?${params.toString()}`);
    console.log("handle")
  }


  return (
    <input type="text" onChange={handleSearch} placeholder="search"/>
  );
}
