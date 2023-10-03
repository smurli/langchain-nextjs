import { ChatWindow } from "@/components/ChatWindow";
import Image from "next/image";

export default function Home() {
  const InfoCard = (
    <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-scroll">
      <h1 className="text-3xl md:text-4xl mb-4">
        <span
          className="inline-flex items-baseline"
          style={{ color: "#68D4FA" }}
        >
          <Image
            src="/images/AI-Icon.jpeg"
            width={32}
            height={32}
            alt="Picture of the author"
            className="mr-2"
          />
          3GPP ChatGPT
        </span>
      </h1>
      <h2>
        This instance of Chat GPT is indexed with the following 3GPP Specs:
      </h2>
      <ul>
        <li className="text-l">
          <span className="ml-2">
            <b style={{ color: "#b5e7a0" }}>23.288 (V18.3.0)</b> - Architecture
            enhancements for 5G System (5GS) to support network data analytics
            services
          </span>
        </li>
        <li className="text-l">
          <span className="ml-2">
            <b style={{ color: "#b5e7a0" }}>23.501 (18.3.0)</b> - System
            architecture for the 5G System (5GS)
          </span>
        </li>
        <li className="text-l">
          <span className="ml-2">
            <b style={{ color: "#b5e7a0" }}>23.791 (16.2.0)</b> - Study of
            enablers for Network Automation for 5G
          </span>
        </li>
        <li className="text-l">
          <span className="ml-2">
            <b style={{ color: "#b5e7a0" }}>24.301 (18.4.0)</b> -
            Non-Access-Stratum (NAS) protocol for Evolved Packet System (EPS);
            Stage 3
          </span>
        </li>
        <li className="text-l">
          <span className="ml-2">
            <b style={{ color: "#b5e7a0" }}>29.501 (18.3.0)</b> - 5G System;
            Principles and Guidelines for Services Definition; Stage 3
          </span>
        </li>
        <li className="text-l">
          <span className="ml-2">
            <b style={{ color: "#b5e7a0" }}>29.502 (18.4.0)</b> - 5G System;
            Session Management Services; Stage 3
          </span>
        </li>
        <li className="text-l">
          <span className="ml-2">
            <b style={{ color: "#b5e7a0" }}>29.503 (18.3.0)</b> - 5G System;
            Unified Data Management Services; Stage 3
          </span>
        </li>
        <li className="text-l">
          <span className="ml-2">
            <b style={{ color: "#b5e7a0" }}>29.504 (18.3.0)</b> - 5G System;
            Unified Data Repository Services; Stage 3
          </span>
        </li>
        <li className="text-l">
          <span className="ml-2">
            <b style={{ color: "#b5e7a0" }}>29.505 (18.3.0)</b> - 5G System;
            Usage of the Unified Data Repository services for Subscription Data;
            Stage 3
          </span>
        </li>
        <li className="text-l">
          <span className="ml-2">
            <b style={{ color: "#b5e7a0" }}>29.507 (18.3.0)</b> - 5G System;
            Access and Mobility Policy Control Service; Stage 3
          </span>
        </li>
        <li className="text-l">
          <span className="ml-2">
            <b style={{ color: "#b5e7a0" }}>29508 (18.3.0)</b> - 5G System;
            Session Management Event Exposure Service; Stage 3
          </span>
        </li>
        <li className="text-l">
          <span className="ml-2">
            <b style={{ color: "#b5e7a0" }}>29509 (18.2.0)</b> - 5G System;
            Authentication Server Services; Stage 3
          </span>
        </li>
        <li className="text-l">
          <span className="ml-2">
            <b style={{ color: "#b5e7a0" }}>29511 (18.1.0)</b> - 5G System;
            Equipment Identity Register Services; Stage 3
          </span>
        </li>
        <li className="text-l">
          <span className="ml-2">
            <b style={{ color: "#b5e7a0" }}>29512-i30 (18.3.0)</b> - 5G System;
            Session Management Policy Control Service; Stage 3
          </span>
        </li>
      </ul>
    </div>
  );
  return (
    <ChatWindow
      endpoint="api/chat"
      emoji="🤖"
      titleText="3GPP ChatGPT"
      placeholder="I'm an LLM indexed on 3GPP Specs. Ask me anything related to 3GPP specs!"
      emptyStateComponent={InfoCard}
    ></ChatWindow>
  );
}
