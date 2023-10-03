"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { VscFeedback } from "react-icons/vsc";

export function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="mb-4 flex items-baseline justify-between">
      <span className="inline-flex items-baseline">
        <Image
          width={256}
          height={256}
          src="/images/a5g-logo-4.png"
          alt=""
          className="self-center w-8 h-8 rounded-full mx-1"
        />
        <a className="mt-1" href="/">
          A5G Networks
        </a>
      </span>
      <span className="flex text-2xl md:text-2xl mb-4">
        <Image
          src="/images/AI-Icon-2.jpeg"
          width={32}
          height={24}
          alt="Picture of the author"
          className="mr-2 "
        />
        <h1 className="text-sky-700">3GPP ChatGPT</h1>
      </span>
      <a className="flex items-center" href="mailto:msivashanmugam@a5gnet.com">
        <VscFeedback /> Feedback
      </a>

      {/* <a className={`mr-4 ${pathname === "/structured_output" ? "text-white border-b" : ""}`} href="/structured_output">🧱 Structured Output</a>
      <a className={`mr-4 ${pathname === "/agents" ? "text-white border-b" : ""}`} href="/agents">🦜 Agents</a>
      <a className={`mr-4 ${pathname === "/retrieval" ? "text-white border-b" : ""}`} href="/retrieval">🐶 Retrieval</a>
      <a className={`mr-4 ${pathname === "/retrieval_agents" ? "text-white border-b" : ""}`} href="/retrieval_agents">🤖 Retrieval Agents</a> */}
    </nav>
  );
}
