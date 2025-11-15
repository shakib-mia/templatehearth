"use client";

import React, { useState } from "react";
import { MdCheck, MdCopyAll } from "react-icons/md";

const Command = ({ stepObj }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(stepObj.commands.join("\n"));
    setCopied(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="bg-gray-100 p-2 rounded mt-1">
      <div className="flex justify-between items-center">
        <pre className="whitespace-pre-wrap">{stepObj.commands.join("\n")}</pre>
        <button
          onClick={handleCopy}
          className="ml-4 px-3 py-1 text-black transition flex items-center gap-1 hover:bg-gray-200 cursor-pointer rounded-full"
        >
          {copied ? (
            <span className="flex items-center gap-1 text-sm">
              <MdCheck /> Copied
            </span>
          ) : (
            <MdCopyAll size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Command;
