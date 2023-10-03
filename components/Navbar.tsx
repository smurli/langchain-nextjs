"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="mb-4">
      <span className="inline-flex items-baseline">
        <Image
          width={256}
          height={256}
          src="/images/a5g-logo-4.png"
          alt=""
          className="self-center w-8 h-8 rounded-full mx-1"
        />
        <span>
          <a
            className={`mr-4 ${pathname === "/" ? "text-white border-b" : ""}`}
            href="/"
          >
            A5G Networks
          </a>
        </span>
      </span>

      {/* <a className={`mr-4 ${pathname === "/structured_output" ? "text-white border-b" : ""}`} href="/structured_output">🧱 Structured Output</a>
      <a className={`mr-4 ${pathname === "/agents" ? "text-white border-b" : ""}`} href="/agents">🦜 Agents</a>
      <a className={`mr-4 ${pathname === "/retrieval" ? "text-white border-b" : ""}`} href="/retrieval">🐶 Retrieval</a>
      <a className={`mr-4 ${pathname === "/retrieval_agents" ? "text-white border-b" : ""}`} href="/retrieval_agents">🤖 Retrieval Agents</a> */}
    </nav>
  );
}
