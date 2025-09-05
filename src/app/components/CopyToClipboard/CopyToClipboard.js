"use client";
import React, { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

const CopyToClipboard = ({ command }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Reset after 1s
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded text-sm font-mono">
      {/* Command Text */}
      <span className="truncate">{command}</span>

      {/* Copy / Check Icon */}
      <button
        onClick={() => handleCopy(command)}
        className="ml-3 text-gray-600 hover:text-purple-600 transition cursor-pointer"
      >
        {copied ? <FiCheck className="text-green-600" /> : <FiCopy />}
      </button>
    </div>
  );
};

export default CopyToClipboard;
