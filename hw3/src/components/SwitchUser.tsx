"use client";

import { useRouter } from "next/navigation";


export default function SwitchUser() {
  const router = useRouter();

  return (
    <button
      className="flex items-center gap-2 rounded-full font-bold p-3 text-start transition-colors duration-200 border-[1px] border-black-700 hover:bg-gray-200"
      // go to home page without any query params to allow the user to change their username and handle
      // see src/components/NameDialog.tsx for more details
      onClick={() => router.push("/")}
    >
      <p>Switch User</p>
    </button>
  );
}
