"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

export default function SearchBar(){
    const router = useRouter();
    const pathname = usePathname();
    const [search, setsearch] = useState("");

    useEffect(()=>{
        router.push(`${pathname}?search=${search}`);
    }, [search,router])

    return(
        <input
            className="px-1 py-1 outline-none rounded-xl"
            type="text"
            onChange={(e)=>setsearch(e.target.value)}
            placeholder="search"
        />
    );
}