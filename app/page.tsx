import { ChatWindow } from "@/components/ChatWindow";
import Image from "next/image";

export default function Home() {
  const InfoCard = (
    <div className="p-4 md:p-8 rounded  w-full max-h-[85%] overflow-scroll">
      <h2 className="text-xl  mb-4">
        <span className="inline-flex items-baseline text-sky-700">
          <p>Go ahead ask me a question...</p>
        </span>
      </h2>
      <h2>
        This instance of Chat GPT is indexed with the following 3GPP Specs:
      </h2>
      <ul className="text-sm">
        <li>
          <span className="ml-2">
            <b className="text-teal-600">29.244 (18.3.0)</b> - Interface between
            the Control Plane and the User Plane nodes
          </span>
        </li>
        <li>
          <span className="ml-2">
            <b className="text-teal-600">23.288 (18.3.0)</b> - Architecture
            enhancements for 5G System (5GS) to support network data analytics
            services
          </span>
        </li>
        <li>
          <span className="ml-2">
            <b className="text-teal-600">23.501 (18.3.0)</b> - System
            architecture for the 5G System (5GS)
          </span>
        </li>
        <li>
          <span className="ml-2">
            <b className="text-teal-600">23.791 (16.2.0)</b> - Study of enablers
            for Network Automation for 5G
          </span>
        </li>
        <li>
          <span className="ml-2">
            <b className="text-teal-600">24.301 (18.4.0)</b> -
            Non-Access-Stratum (NAS) protocol for Evolved Packet System (EPS);
            Stage 3
          </span>
        </li>
        <li>
          <span className="ml-2">
            <b className="text-teal-600">29.501 (18.3.0)</b> - 5G System;
            Principles and Guidelines for Services Definition; Stage 3
          </span>
        </li>
        <li>
          <span className="ml-2">
            <b className="text-teal-600">29.502 (18.4.0)</b> - 5G System;
            Session Management Services; Stage 3
          </span>
        </li>
        <li>
          <span className="ml-2">
            <b className="text-teal-600">29.503 (18.3.0)</b> - 5G System;
            Unified Data Management Services; Stage 3
          </span>
        </li>
        <li>
          <span className="ml-2">
            <b className="text-teal-600">29.504 (18.3.0)</b> - 5G System;
            Unified Data Repository Services; Stage 3
          </span>
        </li>
        <li>
          <span className="ml-2">
            <b className="text-teal-600">29.505 (18.3.0)</b> - 5G System; Usage
            of the Unified Data Repository services for Subscription Data; Stage
            3
          </span>
        </li>
        <li>
          <span className="ml-2">
            <b className="text-teal-600">29.507 (18.3.0)</b> - 5G System; Access
            and Mobility Policy Control Service; Stage 3
          </span>
        </li>
        <li>
          <span className="ml-2">
            <b className="text-teal-600">29508 (18.3.0)</b> - 5G System; Session
            Management Event Exposure Service; Stage 3
          </span>
        </li>
        <li>
          <span className="ml-2">
            <b className="text-teal-600">29509 (18.2.0)</b> - 5G System;
            Authentication Server Services; Stage 3
          </span>
        </li>
        <li>
          <span className="ml-2">
            <b className="text-teal-600">29511 (18.1.0)</b> - 5G System;
            Equipment Identity Register Services; Stage 3
          </span>
        </li>
        <li>
          <span className="ml-2">
            <b className="text-teal-600">29512-i30 (18.3.0)</b> - 5G System;
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
